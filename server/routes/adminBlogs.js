// ─────────────────────────────────────────────────────────────
//  adminBlogs.js  —  Admin Blog CRUD & Media Upload APIs
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { Blogs, Categories, Tags } from '../services/db.js';
import authMiddleware from '../middleware/auth.js';
import { generateSitemap } from '../utils/sitemap.js';

const router = Router();
const SUPABASE_BUCKET = process.env.SUPABASE_BLOG_BUCKET || 'blog-images';

// Environment variables load after ES module imports, so construct the client per request.
const getSupabaseClient = () => {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};

// ── Multer Storage Config ─────────────────────────────────────

const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error('Invalid file format. Only images (JPG, PNG, WEBP, GIF) are allowed.'));
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Protect all admin routes in this file
router.use(authMiddleware);

// ── Helper: Slugify ───────────────────────────────────────────
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
};

// Ensure slug is unique in DB
const getUniqueSlug = async (title, currentId = null) => {
  let slug = slugify(title) || 'untitled-post';
  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const query = { slug: uniqueSlug };
    const match = await Blogs.findOne(query);

    if (!match || (currentId && match.id === currentId)) {
      break;
    }
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

// Sync Categories and Tags with db lists
const syncTaxonomy = async (categoryName, tagsList = []) => {
  if (categoryName) {
    const catName = categoryName.trim();
    const slug = slugify(catName);
    const existing = await Categories.findOne({ name: catName });
    if (!existing) {
      await Categories.insertOne({ name: catName, slug });
    }
  }

  for (const tagName of tagsList) {
    const tName = tagName.trim();
    if (tName) {
      const existing = await Tags.findOne({ name: tName });
      if (!existing) {
        await Tags.insertOne({ name: tName });
      }
    }
  }
};

// ── GET /api/admin/blogs — List all posts (including drafts) ──
router.get('/', async (req, res) => {
  try {
    const posts = await Blogs.find({});
    // Sort newest first
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(posts);
  } catch (err) {
    console.error('Error fetching admin blogs:', err);
    res.status(500).json({ error: 'Failed to retrieve blog posts.' });
  }
});

// ── GET /api/admin/blogs/:id — Fetch single post by ID ─────────
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Blogs.findOne({ id });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json(post);
  } catch (err) {
    console.error('Error fetching admin blog detail:', err);
    res.status(500).json({ error: 'Failed to retrieve blog details.' });
  }
});

// ── POST /api/admin/blogs — Create new blog post ──────────────
router.post('/', async (req, res) => {
  const {
    title,
    content,
    featuredImage,
    category,
    tags,
    metaTitle,
    metaDescription,
    status,
    authorName,
    publishDate
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and Content are required.' });
  }

  try {
    const slug = await getUniqueSlug(title);
    const postTags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []);

    const newPost = {
      title: title.trim(),
      slug,
      content,
      featuredImage: featuredImage || '',
      category: category ? category.trim() : 'Uncategorized',
      tags: postTags,
      metaTitle: (metaTitle || title).trim(),
      metaDescription: (metaDescription || '').trim(),
      status: status === 'published' ? 'published' : 'draft',
      authorName: (authorName || req.user.fullName || 'Admin').trim(),
      publishDate: status === 'published' ? (publishDate || new Date().toISOString()) : null,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const savedPost = await Blogs.insertOne(newPost);
    await syncTaxonomy(newPost.category, newPost.tags);

    // Update sitemap in background
    generateSitemap();

    res.status(201).json({ success: true, post: savedPost });
  } catch (err) {
    console.error('Error creating blog post:', err);
    res.status(500).json({ error: 'Failed to create blog post.' });
  }
});

// ── PUT /api/admin/blogs/:id — Update existing blog post ───────
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    featuredImage,
    category,
    tags,
    metaTitle,
    metaDescription,
    status,
    authorName,
    publishDate
  } = req.body;

  try {
    const existingPost = await Blogs.findOne({ id });
    if (!existingPost) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    const postTags = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []);
    
    // Regenerate slug if title changed
    let slug = existingPost.slug;
    if (title && title.trim() !== existingPost.title) {
      slug = await getUniqueSlug(title, id);
    }

    const updates = {
      title: title ? title.trim() : existingPost.title,
      slug,
      content: content !== undefined ? content : existingPost.content,
      featuredImage: featuredImage !== undefined ? featuredImage : existingPost.featuredImage,
      category: category ? category.trim() : existingPost.category,
      tags: postTags,
      metaTitle: metaTitle !== undefined ? metaTitle.trim() : existingPost.metaTitle,
      metaDescription: metaDescription !== undefined ? metaDescription.trim() : existingPost.metaDescription,
      status: status === 'published' ? 'published' : 'draft',
      authorName: authorName !== undefined ? authorName.trim() : existingPost.authorName,
      publishDate: status === 'published' 
        ? (publishDate || existingPost.publishDate || new Date().toISOString())
        : null,
      updatedAt: new Date().toISOString()
    };

    const success = await Blogs.updateOne({ id }, updates);
    if (!success) {
      return res.status(500).json({ error: 'Failed to save updates to the database.' });
    }

    await syncTaxonomy(updates.category, updates.tags);

    // Update sitemap in background
    generateSitemap();

    res.json({ success: true, post: { id, ...existingPost, ...updates } });
  } catch (err) {
    console.error('Error updating blog post:', err);
    res.status(500).json({ error: 'Failed to update blog post.' });
  }
});

// ── DELETE /api/admin/blogs/:id — Delete blog post ────────────
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await Blogs.deleteOne({ id });
    if (!success) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    // Update sitemap in background
    generateSitemap();

    res.json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Failed to delete blog post.' });
  }
});

// ── POST /api/admin/upload — Featured Image Upload API ─────────
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(503).json({ error: 'Image storage is not configured. Set the Supabase server environment variables.' });
    }

    const extByMimeType = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    };
    const extension = extByMimeType[req.file.mimetype] || path.extname(req.file.originalname).toLowerCase();
    const objectPath = `featured/${Date.now()}-${randomUUID()}${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(objectPath, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase image upload failed:', uploadError.message);
      return res.status(502).json({ error: 'Image upload to permanent storage failed.' });
    }

    const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
    res.status(201).json({ success: true, url: data.publicUrl });
  } catch (err) {
    console.error('Featured image upload failed:', err);
    res.status(500).json({ error: err.message || 'File upload failed.' });
  }
});

export default router;
