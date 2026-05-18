import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioBrief = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      tech: ['React', 'Node.js', 'MongoDB'],
      emoji: '🛍️',
    },
    {
      id: 2,
      title: 'AI Chat Assistant',
      category: 'AI/ML',
      tech: ['Python', 'TensorFlow', 'React'],
      emoji: '🤖',
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      category: 'Web App',
      tech: ['React', 'TypeScript', 'PostgreSQL'],
      emoji: '📊',
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
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Intelligence embedded at every layer of our project delivery
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -5 }}
              className="rounded-xl overflow-hidden glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="h-40 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center text-6xl">
                {project.emoji}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-blue-400 uppercase">{project.category}</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
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
            to="/projects"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
          >
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioBrief;
