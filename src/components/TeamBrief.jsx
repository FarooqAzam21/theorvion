import { motion } from 'framer-motion';
import { Mail, Code, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamBrief = () => {
  const team = [
    {
      name: 'Ahmed Hassan',
      role: 'Lead Developer',
      expertise: 'Full Stack Development',
      emoji: '👨‍💻',
    },
    {
      name: 'Fatima Khan',
      role: 'UI/UX Designer',
      expertise: 'Design Systems',
      emoji: '👩‍🎨',
    },
    {
      name: 'Ali Malik',
      role: 'AI Specialist',
      expertise: 'Machine Learning',
      emoji: '🧠',
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
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Talented professionals dedicated to your success
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
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
              className="text-center p-8 rounded-2xl glass border border-blue-500/20 group cursor-pointer"
            >
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-blue-400 font-medium mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm mb-6">{member.expertise}</p>
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
            to="/team"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
          >
            View Full Team →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamBrief;
