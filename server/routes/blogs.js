// ─────────────────────────────────────────────────────────────
//  blogs.js  —  Public Blog API Routes
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import { Blogs, Categories } from '../services/db.js';

const router = Router();

// ── GET /api/blogs — Fetch Published Blogs (Listing) ──────────
router.get('/', async (req, res) => {
  const { search, category } = req.query;

  try {
    // Public queries only list 'published' posts
    let posts = await Blogs.find({ status: 'published' });

    // Apply category filter
    if (category && category !== 'All') {
      const targetCategory = category.toLowerCase().trim();
      posts = posts.filter(post => 
        post.category && post.category.toLowerCase().trim() === targetCategory
      );
    }

    // Apply search filter (case-insensitive keyword matching)
    if (search) {
      const keyword = search.toLowerCase().trim();
      posts = posts.filter(post => 
        (post.title && post.title.toLowerCase().includes(keyword)) ||
        (post.content && post.content.toLowerCase().includes(keyword)) ||
        (post.metaDescription && post.metaDescription.toLowerCase().includes(keyword))
      );
    }

    // Sort by publishDate descending (newest first)
    posts.sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt));

    res.json(posts);
  } catch (err) {
    console.error('Error fetching public blogs:', err);
    res.status(500).json({ error: 'Failed to retrieve blog posts.' });
  }
});

// ── GET /api/blogs/slug/:slug — Fetch Blog Details by Slug ────
router.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await Blogs.findOne({ slug: slug.toLowerCase().trim(), status: 'published' });

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    // Increment view counter asynchronously
    const currentViews = post.views || 0;
    await Blogs.updateOne({ id: post.id }, { views: currentViews + 1 });

    // Fetch related blogs in the same category (max 3 posts, excluding current)
    let related = [];
    if (post.category) {
      const allCategoryPosts = await Blogs.find({ 
        category: post.category, 
        status: 'published' 
      });
      related = allCategoryPosts
        .filter(p => p.id !== post.id)
        .slice(0, 3)
        .map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          featuredImage: p.featuredImage,
          publishDate: p.publishDate,
          authorName: p.authorName,
          category: p.category,
        }));
    }

    res.json({
      post: { ...post, views: currentViews + 1 },
      related
    });
  } catch (err) {
    console.error('Error fetching blog details:', err);
    res.status(500).json({ error: 'Failed to retrieve blog details.' });
  }
});

// ── GET /api/blogs/categories — Fetch Categories with Count ──
router.get('/categories', async (req, res) => {
  try {
    const allPosts = await Blogs.find({ status: 'published' });
    
    // Calculate counts dynamically from published posts
    const counts = {};
    allPosts.forEach(post => {
      if (post.category) {
        counts[post.category] = (counts[post.category] || 0) + 1;
      }
    });

    const categoryList = await Categories.find({});
    
    // Map list with dynamically updated counts
    const result = categoryList.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: counts[cat.name] || 0
    }));

    // Add dynamic categories if they are present in posts but not in category list
    Object.keys(counts).forEach(catName => {
      const exists = result.some(r => r.name.toLowerCase() === catName.toLowerCase());
      if (!exists) {
        result.push({
          id: catName.toLowerCase(),
          name: catName,
          slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          count: counts[catName]
        });
      }
    });

    res.json(result);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
});

export default router;
