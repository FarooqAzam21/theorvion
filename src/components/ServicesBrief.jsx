import { motion } from 'framer-motion';
import { TrendingUp, Globe, Cpu, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesBrief = () => {
  const services = [
    {
      id: 1,
      title: 'Digital Marketing',
      description: 'Strategic campaigns to grow your online presence and drive leads',
      icon: TrendingUp,
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Modern, responsive websites that captivate your audience',
      icon: Globe,
    },
    {
      id: 3,
      title: 'AI Development',
      description: 'Intelligent solutions for modern business challenges',
      icon: Cpu,
    },
    {
      id: 4,
      title: 'Software Solutions',
      description: 'Custom CRM, POS, ERP, and bespoke platforms',
      icon: Code,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Intelligence in every layer. Solutions designed for modern businesses
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <Icon className="w-10 h-10 text-blue-400 mb-4 group-hover:text-cyan-400 transition-colors" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/services"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
          >
            View All Services →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesBrief;
