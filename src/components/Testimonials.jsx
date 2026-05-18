import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStartup Inc.',
      comment:
        'Orvion transformed our vision into reality. Their team was professional, responsive, and delivered beyond expectations.',
      rating: 5,
      company: 'TechStartup Inc.',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, GlobalTech',
      comment:
        'The AI solutions provided by Orvion have increased our efficiency by 40%. Amazing work!',
      rating: 5,
      company: 'GlobalTech',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, E-Commerce Plus',
      comment:
        'Working with Orvion was a game-changer for our business. Their expertise in e-commerce is unmatched.',
      rating: 5,
      company: 'E-Commerce Plus',
    },
    {
      name: 'David Park',
      role: 'CTO, Innovation Labs',
      comment:
        'Outstanding technical expertise and great communication throughout the project. Highly recommended!',
      rating: 5,
      company: 'Innovation Labs',
    },
    {
      name: 'Lisa Anderson',
      role: 'Business Director, Enterprise Solutions',
      comment:
        'Orvion provided scalable cloud infrastructure that handles millions of transactions daily.',
      rating: 5,
      company: 'Enterprise Solutions',
    },
    {
      name: 'James Wilson',
      role: 'Founder, FinTech Startup',
      comment:
        'Responsive team, excellent problem-solving skills, and delivered on time. A pleasure to work with!',
      rating: 5,
      company: 'FinTech Startup',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
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
            Trusted by leading companies around the world
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl glass border border-purple-500/20 hover:border-purple-500/50"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { value: '98%', label: 'Client Satisfaction' },
            { value: '200+', label: 'Happy Clients' },
            { value: '500+', label: 'Projects Delivered' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl glass border border-purple-500/20"
            >
              <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
