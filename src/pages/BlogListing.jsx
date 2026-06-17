import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs and categories on load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const blogsUrl = `${API_BASE}/api/blogs?category=${selectedCategory === 'All' ? '' : encodeURIComponent(selectedCategory)}&search=${encodeURIComponent(searchQuery)}`;
        const blogsRes = await fetch(blogsUrl);
        if (!blogsRes.ok) throw new Error('Failed to fetch blogs');
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);

        const catsRes = await fetch(`${API_BASE}/api/blogs/categories`);
        if (!catsRes.ok) throw new Error('Failed to fetch categories');
        const catsData = await catsRes.json();
        setCategories(catsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Unable to load blog posts at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const cleanContent = content ? content.replace(/<[^>]*>/g, '') : '';
    const textLength = cleanContent.split(/\s+/).length;
    const minutes = Math.ceil(textLength / wordsPerMinute);
    return minutes || 1;
  };

  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet-500/30">
      <Helmet>
        <title>Insights & Articles | The Orvion Blog</title>
        <meta name="description" content="Explore articles on high-end web development, artificial intelligence integration, SaaS architecture, and digital marketing strategies from the experts at The Orvion." />
        <meta name="keywords" content="orvion blog, tech insights, ai blog, software agency blog, web development articles" />
        <link rel="canonical" href="https://www.theorvion.io/blog" />
        <meta property="og:title" content="Insights & Articles | The Orvion Blog" />
        <meta property="og:description" content="Explore articles on high-end web development, artificial intelligence integration, and digital marketing." />
        <meta property="og:url" content="https://www.theorvion.io/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />

      {/* Hero Header */}
      <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-10 bg-radial-gradient from-violet-600 to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4">THE ORVION JOURNAL</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Intelligence in <span className="gradient-text">Every Word</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#c4b5fd]/70 max-w-3xl mx-auto font-light leading-relaxed">
              In-depth research, tutorials, and strategic outlooks on Web Engineering, Artificial Intelligence, and Modern Digital Growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Search and Listing Section */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 p-6 rounded-2xl glass border border-violet-500/10">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/60" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-primary/45 border border-violet-500/15 focus:border-violet-500/50 rounded-xl outline-none text-white transition-all cursor-none"
              />
            </div>

            {/* Categories Selector */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-none ${
                  selectedCategory === 'All'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                    : 'bg-[#0f0c29]/40 text-[#c4b5fd]/80 hover:bg-violet-500/10 hover:text-white border border-violet-500/10'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-none ${
                    selectedCategory === cat.name
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                      : 'bg-[#0f0c29]/40 text-[#c4b5fd]/80 hover:bg-violet-500/10 hover:text-white border border-violet-500/10'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Listing Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[420px] rounded-2xl glass animate-pulse border border-violet-500/10" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 glass rounded-3xl border border-violet-500/10">
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn-primary mt-4 py-2 px-6 text-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 glass rounded-3xl border border-violet-500/10">
              <BookOpen className="w-12 h-12 text-violet-400/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
              <p className="text-[#c4b5fd]/60 max-w-md mx-auto">
                No published articles matched your search filters. Try broadening your keywords.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {blogs.map((post) => (
                <motion.article
                  key={post.id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl overflow-hidden glass border border-violet-500/15 hover:border-violet-500/35 transition-all duration-300 flex flex-col justify-between group"
                >
                  <Link to={`/blog/${post.slug}`} className="cursor-none block">
                    {/* Featured Image */}
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-violet-900/10 to-[#030008] relative">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage.startsWith('http') ? post.featuredImage : `${API_BASE}${post.featuredImage}`}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-violet-950/20 text-[#a78bfa]/60 font-sora font-semibold">
                          No Featured Image
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-violet-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-violet-300/60 mb-3 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.publishDate || post.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {calculateReadTime(post.content)} min read
                          </span>
                        </div>

                        <h2 className="text-xl font-bold font-sora mb-3 text-white group-hover:text-violet-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-sm text-[#c4b5fd]/70 line-clamp-3 mb-6 font-light leading-relaxed">
                          {post.metaDescription || post.content?.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-violet-500/10">
                        <span className="flex items-center gap-2 text-xs text-[#c4b5fd]/80">
                          <User className="w-3.5 h-3.5 text-violet-400" />
                          {post.authorName || 'The Orvion'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-violet-400 font-semibold group-hover:text-violet-300 transition-colors">
                          Read Post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogListing;
