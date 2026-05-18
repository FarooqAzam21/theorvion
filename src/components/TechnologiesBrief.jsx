import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TechnologiesBrief = () => {
  const tech = [
    { name: 'React', image: '/react.jpg' },
    { name: 'Node.js', image: '/node.jfif' },
    { name: 'Python', image: '/python.jpg' },
    { name: 'Docker', image: '/docker.jpg' },
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
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Intelligence in every layer. Latest technologies for your success
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
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

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/technologies"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
          >
            View All Technologies →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesBrief;
