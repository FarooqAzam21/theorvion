import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import useContent from '../hooks/useContent';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce platform with payment integration, inventory management, and customer dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    emoji: '🛍️',
  },
  {
    id: 2,
    title: 'AI Chat Assistant',
    category: 'AI/ML',
    description: 'Intelligent chatbot with NLP capabilities, able to handle customer support and sales inquiries 24/7.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    emoji: '🤖',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'Web App',
    description: 'Analytics and management dashboard for SaaS applications with real-time data visualization.',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'GraphQL'],
    emoji: '📊',
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure mobile banking application with transaction history, transfers, and bill payments.',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    emoji: '🏦',
  },
  {
    id: 5,
    title: 'IoT Device Management',
    category: 'IoT/DevOps',
    description: 'System for managing and monitoring IoT devices with real-time alerts and data collection.',
    tech: ['Python', 'Docker', 'Kubernetes', 'AWS'],
    emoji: '🔌',
  },
  {
    id: 6,
    title: 'Marketing Automation',
    category: 'Web App',
    description: 'Campaign management and automation platform for digital marketing teams.',
    tech: ['React', 'Node.js', 'MongoDB', 'Redis'],
    emoji: '📧',
  },
];

const ProjectsPage = () => {
  const { data: portfolioData } = useContent('portfolio', FALLBACK_PROJECTS);
  const projects = (portfolioData || FALLBACK_PROJECTS).map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    tech: p.tech || [],
    emoji: p.emoji || '💼',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
            Our <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Showcasing intelligent solutions built with expertise at every layer
          </motion.p>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -10 }}
                className="rounded-xl overflow-hidden glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center text-6xl">
                  {project.emoji}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-400 uppercase">{project.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 rounded-lg border border-blue-500/50 hover:bg-blue-500/20 transition-colors duration-300 flex items-center justify-center gap-2 text-sm">
                    <Code className="w-4 h-4" />
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
