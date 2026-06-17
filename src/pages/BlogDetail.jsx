import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Eye, Share2, Tag, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/blogs/slug/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Article not found');
          }
          throw new Error('Failed to load article');
        }
        const postData = await res.json();
        setData(postData);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setError(err.message || 'Unable to retrieve article details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.post?.title,
        text: data?.post?.metaDescription,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-void text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 font-medium tracking-wider uppercase font-sora">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-void text-white flex flex-col justify-between">
        <Navigation />
        <div className="max-w-md mx-auto text-center py-40 px-5">
          <BookOpen className="w-16 h-16 text-red-400/60 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 font-sora">{error || 'Article Not Found'}</h2>
          <p className="text-[#c4b5fd]/60 mb-8 leading-relaxed">
            The article you are looking for does not exist, has been drafted, or has moved to a new address.
          </p>
          <Link to="/blog" className="btn-primary py-3 px-8 text-sm">
            Back to Blog Index
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { post, related } = data;
  const canonicalUrl = `https://www.theorvion.io/blog/${post.slug}`;
  const resolvedImage = post.featuredImage 
    ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${API_BASE}${post.featuredImage}`)
    : 'https://www.theorvion.io/og-image.png';

  // Schema markup for Article
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metaTitle || post.title,
    "description": post.metaDescription || post.title,
    "image": resolvedImage,
    "datePublished": post.publishDate || post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "author": {
      "@type": "Person",
      "name": post.authorName || 'The Orvion'
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Orvion",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.theorvion.io/assets/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet-500/30">
      <Helmet>
        <title>{`${post.metaTitle || post.title} | The Orvion Blog`}</title>
        <meta name="description" content={post.metaDescription || post.title} />
        {post.tags && <meta name="keywords" content={[post.category, ...post.tags].join(', ')} />}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.title} />
        <meta property="og:image" content={resolvedImage} />
        <meta property="article:published_time" content={post.publishDate || post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt || post.createdAt} />
        <meta property="article:author" content={post.authorName || 'The Orvion'} />
        <meta property="article:section" content={post.category} />

        {/* Structured Data Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <Navigation />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back navigation */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8 font-medium cursor-none"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          {post.category && (
            <span className="section-label mb-4">{post.category}</span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sora mt-3 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-y-4 items-center justify-between border-y border-violet-500/10 py-4 text-sm text-[#c4b5fd]/70">
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" />
                {post.authorName || 'The Orvion'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-400" />
                {formatDate(post.publishDate || post.createdAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                {calculateReadTime(post.content)} min read
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-violet-400" />
                {post.views || 0} views
              </span>
            </div>

            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-semibold cursor-none"
            >
              <Share2 className="w-4 h-4" /> Share Article
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-3xl overflow-hidden glass border border-violet-500/15 h-[280px] sm:h-[400px] mb-12">
            <img 
              src={post.featuredImage.startsWith('http') ? post.featuredImage : `${API_BASE}${post.featuredImage}`} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mb-12">
          {/* Custom style for rendering rich content body */}
          <div 
            className="rich-text-content text-lg text-[#c4b5fd]/95 leading-relaxed space-y-6 font-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center pt-8 border-t border-violet-500/10 mb-20">
            <Tag className="w-4 h-4 text-violet-400 mr-2" />
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs px-3.5 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/15"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {related && related.length > 0 && (
          <section className="pt-16 border-t border-violet-500/10">
            <h3 className="text-2xl font-bold font-sora mb-8 text-white">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <div key={rel.id} className="rounded-2xl overflow-hidden glass border border-violet-500/10 hover:border-violet-500/30 p-4 transition-all duration-300 group flex flex-col justify-between">
                  <Link to={`/blog/${rel.slug}`} className="cursor-none">
                    {rel.featuredImage ? (
                      <div className="h-32 rounded-xl overflow-hidden bg-violet-950/20 mb-4">
                        <img 
                          src={rel.featuredImage.startsWith('http') ? rel.featuredImage : `${API_BASE}${rel.featuredImage}`} 
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-32 rounded-xl bg-violet-950/10 border border-violet-500/5 mb-4 flex items-center justify-center text-xs text-violet-400/50">
                        No Image
                      </div>
                    )}
                    <span className="text-[10px] text-violet-400 font-semibold uppercase tracking-wider">{rel.category}</span>
                    <h4 className="font-bold text-white text-base font-sora mt-1 mb-2 line-clamp-2 group-hover:text-violet-400 transition-colors">
                      {rel.title}
                    </h4>
                  </Link>
                  <div className="text-[11px] text-[#c4b5fd]/50 pt-2 border-t border-violet-500/5 flex justify-between">
                    <span>By {rel.authorName || 'Orvion'}</span>
                    <span>{formatDate(rel.publishDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
