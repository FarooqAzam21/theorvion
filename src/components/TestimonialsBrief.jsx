import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestimonialsBrief = () => {
  const testimonials = [
    {
      id: 1,
      quote: 'Exceptional team who delivered our project on time and exceeded expectations.',
      author: 'John Smith',
      position: 'CEO, Tech Startup',
      rating: 5,
      initials: 'JS',
    },
    {
      id: 2,
      quote: 'Professional, reliable, and innovative. Highly recommend for any digital project.',
      author: 'Sarah Johnson',
      position: 'Marketing Director',
      rating: 5,
      initials: 'SJ',
    },
    {
      id: 3,
      quote: 'They transformed our business operations with cutting-edge solutions.',
      author: 'Ahmed Hassan',
      position: 'Founder',
      rating: 5,
      initials: 'AH',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted partners delivering intelligence at every layer
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
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
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-sm font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                  <p className="text-gray-400 text-xs">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/testimonials"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
          >
            View More Testimonials →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsBrief;
