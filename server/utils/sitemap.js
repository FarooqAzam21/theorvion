import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Blogs } from '../services/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.resolve(__dirname, '../../public/sitemap.xml');

const BASE_URL = 'https://www.theorvion.io';

const STATIC_URLS = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/services', changefreq: 'monthly', priority: '0.8' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/why-us', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
];

export const generateSitemap = async () => {
  try {
    // 1. Fetch published blogs
    const allBlogs = await Blogs.find({});
    const publishedBlogs = allBlogs.filter(blog => blog.status === 'published');
    
    // 2. Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

    // Add static URLs
    STATIC_URLS.forEach(route => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${route.loc}</loc>\n`;
      // We can use a fixed date or today's date for static pages. Using a recent fixed date to prevent unnecessary crawl requests.
      xml += `    <lastmod>2026-05-30</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n\n`;
    });

    // Add dynamic blog URLs
    publishedBlogs.forEach(blog => {
      // Ensure we have a valid date format YYYY-MM-DD
      const dateStr = blog.updatedAt || blog.publishDate || blog.createdAt || new Date().toISOString();
      const formattedDate = new Date(dateStr).toISOString().split('T')[0];

      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${formattedDate}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n\n`;
    });

    xml += `</urlset>\n`;

    // 3. Write to public/sitemap.xml
    fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
    console.log('✅ Sitemap successfully updated.');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
};
