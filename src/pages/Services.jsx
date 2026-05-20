import { motion } from 'framer-motion';
import { Globe, Palette, TrendingUp, Cpu, MessageSquare, BarChart, Cloud, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';

const ServicesPage = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-primary text-white">
      <Navigation />
      
      {/* Header */}
      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
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
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive solutions with intelligence in every layer. Transform your business with advanced technology
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {servicesData.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <Icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-cyan-400 transition-colors" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-blue-300">Key Features:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.tags.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Explore Service →
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl glass border border-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Let's discuss which services are right for your business and create a custom solution.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300">
            Get in Touch
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
