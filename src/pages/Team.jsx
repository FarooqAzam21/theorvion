import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TeamPage = () => {
  const team = [
    {
      name: 'Ahmed Hassan',
      role: 'Lead Developer',
      expertise: 'Full Stack Development, React, Node.js',
      emoji: '👨‍💻',
    },
    {
      name: 'Fatima Khan',
      role: 'UI/UX Designer',
      expertise: 'Design Systems, Figma, User Research',
      emoji: '👩‍🎨',
    },
    {
      name: 'Ali Malik',
      role: 'AI Specialist',
      expertise: 'Machine Learning, Python, TensorFlow',
      emoji: '🧠',
    },
    {
      name: 'Sara Williams',
      role: 'Product Manager',
      expertise: 'Product Strategy, Client Relations',
      emoji: '📱',
    },
    {
      name: 'Zainab Ahmed',
      role: 'DevOps Engineer',
      expertise: 'Cloud Architecture, Docker, Kubernetes',
      emoji: '⚙️',
    },
    {
      name: 'Hassan Khan',
      role: 'Backend Developer',
      expertise: 'Database Design, API Development',
      emoji: '🔧',
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
            Meet Our <span className="gradient-text">Team</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Talented professionals dedicated to delivering excellence
          </motion.p>
        </div>
      </motion.section>

      {/* Team Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-2xl glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Info Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl glass border border-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-gray-400 mb-8">
            Our team is excited to discuss how we can help bring your vision to life.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300">
            Schedule a Consultation
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default TeamPage;
