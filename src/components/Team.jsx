import { motion } from 'framer-motion';
import { Mail, Code, Share2 } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: 'Aarav Sharma',
      role: 'CEO & Founder',
      expertise: 'Full-Stack Development, AI Strategy',
      image: '👨‍💼',
      social: { linkedin: '#', github: '#', twitter: '#' },
    },
    {
      name: 'Priya Patel',
      role: 'CTO',
      expertise: 'Cloud Architecture, DevOps',
      image: '👩‍💻',
      social: { linkedin: '#', github: '#', twitter: '#' },
    },
    {
      name: 'Rahul Gupta',
      role: 'AI/ML Lead',
      expertise: 'Machine Learning, Data Science',
      image: '👨‍🔬',
      social: { linkedin: '#', github: '#', twitter: '#' },
    },
    {
      name: 'Neha Singh',
      role: 'Design Director',
      expertise: 'UI/UX Design, Product Strategy',
      image: '👩‍🎨',
      social: { linkedin: '#', github: '#', twitter: '#' },
    },
    {
      name: 'Vikram Kumar',
      role: 'Senior Developer',
      expertise: 'React, Node.js, Databases',
      image: '👨‍💻',
      social: { linkedin: '#', github: '#', twitter: '#' },
    },
    {
      name: 'Anjali Desai',
      role: 'Project Manager',
      expertise: 'Agile, Client Relations',
      image: '👩‍💼',
      social: { linkedin: '#', github: '#', twitter: '#' },
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
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary/30">
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
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Talented professionals dedicated to delivering excellence and innovation
          </p>
        </motion.div>

        {/* Team grid */}
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
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl glass border border-blue-500/20 hover:border-blue-500/50 p-8"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Avatar */}
                <div className="text-6xl mb-4 text-center">{member.image}</div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-white text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-medium text-center text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm text-center mb-6">
                  {member.expertise}
                </p>

                {/* Social links */}
                <div className="flex justify-center gap-4">
                  <a
                    href={member.social.linkedin}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-blue-400" />
                  </a>
                  <a
                    href={member.social.github}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors"
                  >
                    <Code className="w-5 h-5 text-blue-400" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-blue-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join team CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">Ready to join our growing team?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50">
            View Careers
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
