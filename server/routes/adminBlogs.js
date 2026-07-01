// ─────────────────────────────────────────────────────────────
//  adminBlogs.js  —  Admin Blog CRUD & Media Upload APIs
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Blogs, Categories, Tags } from '../services/db.js';
import authMiddleware from '../middleware/auth.js';
import { generateSitemap } from '../utils/sitemap.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '../data/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ── Multer Storage Config ─────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `upload-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error('Invalid file format. Only images (JPG, PNG, WEBP, GIF) are allowed.'));
};

const upload = multer({
  storage,
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
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }

    // Return the relative URL served by static middleware
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message || 'File upload failed.' });
  }
});

export default router;
