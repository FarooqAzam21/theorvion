import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import useContent from '../hooks/useContent';

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    quote: 'Exceptional team who delivered our project on time and exceeded expectations. Their attention to detail and commitment to quality is remarkable.',
    author: 'John Smith',
    position: 'CEO, Tech Startup',
    rating: 5,
    initials: 'JS',
  },
  {
    id: 2,
    quote: 'Professional, reliable, and innovative. Highly recommend for any digital project. They understood our needs perfectly.',
    author: 'Sarah Johnson',
    position: 'Marketing Director',
    rating: 5,
    initials: 'SJ',
  },
  {
    id: 3,
    quote: 'They transformed our business operations with cutting-edge solutions. The ROI was incredible.',
    author: 'Ahmed Hassan',
    position: 'Founder, E-Commerce Store',
    rating: 5,
    initials: 'AH',
  },
  {
    id: 4,
    quote: 'Outstanding communication and technical expertise. Best investment we made for our company.',
    author: 'Emily Brown',
    position: 'Product Manager',
    rating: 5,
    initials: 'EB',
  },
  {
    id: 5,
    quote: 'The team went above and beyond to ensure our satisfaction. Truly world-class service.',
    author: 'David Lee',
    position: 'CTO, Financial Services',
    rating: 5,
    initials: 'DL',
  },
  {
    id: 6,
    quote: 'Fast, efficient, and highly skilled developers. They delivered features we didn\'t even know were possible.',
    author: 'Lisa Anderson',
    position: 'Business Owner',
    rating: 5,
    initials: 'LA',
  },
];

const FALLBACK_STATS = [
  { value: '98%', label: 'Client Satisfaction' },
  { value: '200+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects Delivered' },
];

const TestimonialsPage = () => {
  const { data: testimonialData } = useContent('testimonials', FALLBACK_TESTIMONIALS);
  const { data: statsData } = useContent('statistics', { testimonialStats: FALLBACK_STATS });

  const stats = statsData?.testimonialStats || FALLBACK_STATS;
  const testimonials = (testimonialData || FALLBACK_TESTIMONIALS).map(t => ({
    id: t.id,
    quote: t.quote || t.text || t.comment,
    author: t.name || t.author,
    position: t.role || t.position,
    rating: t.rating || 5,
    initials: t.initials || (t.name ? t.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '') || 'C',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation />

      {/* Header */}
      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our <span className="gradient-text">Clients</span> Say
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted by leading businesses worldwide. Intelligence in every layer of what we deliver.
          </motion.p>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-sm font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl glass border border-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing List of Satisfied Clients</h2>
          <p className="text-gray-400 mb-8">
            Ready to transform your business with our solutions?
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300">
            Get Started Today
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
