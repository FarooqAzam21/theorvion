import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TechnologiesPage = () => {
  const tech = [
    { name: 'React', image: '/react.jpg' },
    { name: 'Node.js', image: '/node.jfif' },
    { name: 'Python', image: '/python.jpg' },
    { name: 'Docker', image: '/docker.jpg' },
    { name: 'PostgreSQL', image: '/postgresql.jpg' },
    { name: 'Kubernetes', image: '/kubernetes.jfif' },
    { name: 'Git', image: '/git.jpg' },
    { name: 'WordPress', image: '/wordpress.jfif' },
    { name: 'Express.js', image: '/express js.jfif' },
    { name: 'MongoDB', image: '/mongo db.jfif' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
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
            Technologies We <span className="gradient-text">Master</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Intelligence in every layer. Latest technologies for intelligent solutions
          </motion.p>
        </div>
      </motion.section>

      {/* Tech Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tech.map((technology, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-6 rounded-xl glass border border-blue-500/20 hover:border-blue-500/50 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <img 
                  src={technology.image} 
                  alt={technology.name}
                  className="h-16 w-16 mb-2 object-contain group-hover:scale-125 transition-transform duration-300"
                />
                <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                  {technology.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto p-12 rounded-2xl glass border border-blue-500/20">
          <h3 className="text-2xl font-semibold mb-3 text-white">Always Learning</h3>
          <p className="text-gray-400 mb-4">
            Our team stays updated with the latest technology trends and framework updates. We continuously adopt new tools and practices to provide cutting-edge solutions to our clients while maintaining code quality and security.
          </p>
          <p className="text-gray-400">
            Whether it's a new JavaScript framework, cloud platform, or AI/ML library, we invest in continuous learning to bring the best solutions to your projects.
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default TechnologiesPage;
