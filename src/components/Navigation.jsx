import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { title: 'Home',     href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'About',   href: '/about' },
  { title: 'Why Us',  href: '/why-us' },
  { title: 'Blog',     href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030008]/80 backdrop-blur-2xl border-b border-violet-500/10 shadow-[0_1px_0_rgba(139,92,246,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-violet-500/15 transition-all duration-300 group-hover:scale-105 group-hover:ring-violet-400/40">
            <img src="/assets/logo.png" alt="Orvion Logo" className="h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.55)]" />
          </div>
          <span className="hidden sm:block text-lg font-bold font-sora tracking-tight text-white/90">
            The Orvion
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
            >
              <Link
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group rounded-lg hover:bg-violet-500/8 ${
                  location.pathname === link.href ? 'text-white' : 'text-[#c4b5fd]/70 hover:text-white'
                }`}
              >
                {link.title}
                <span className={`absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-violet-500 to-cyan-500 transition-transform duration-300 origin-left ${
                  location.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/contact" className="hidden md:flex btn-primary text-sm py-2.5 px-5">
            Get Consultation
          </Link>
        </motion.div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl glass text-violet-300 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#060112]/95 backdrop-blur-3xl border-b border-violet-500/15"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all ${
                      location.pathname === link.href ? 'text-white bg-violet-500/20' : 'text-[#c4b5fd]/80 hover:text-white hover:bg-violet-500/10'
                    }`}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3">
                <Link
                  to="/contact"
                  className="btn-primary w-full justify-center"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
