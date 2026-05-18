import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutBrief = () => {
  const stats = [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Happy Clients', value: '200+' },
    { label: 'Years Experience', value: '8+' },
    { label: 'Team Members', value: '50+' },
  ];

  const expertise = ['Web Development', 'Mobile Apps', 'AI/ML Solutions', 'DevOps', 'Cloud Architecture', 'UI/UX Design'];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Orvion</span>
            </h2>
            <p className="text-gray-400 text-lg mb-4">
              We're a team of passionate developers and designers bringing intelligence to every layer of digital solutions. Empowering modern businesses with advanced technology.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl glass border border-purple-500/20"
                >
                  <p className="text-2xl font-bold text-purple-400">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors duration-300"
            >
              Learn More →
            </Link>
          </motion.div>

          {/* Right - Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <span className="text-lg text-white">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrief;
