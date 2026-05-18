import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AboutPage = () => {
  const stats = [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Happy Clients', value: '200+' },
    { label: 'Years Experience', value: '8+' },
    { label: 'Team Members', value: '50+' },
  ];

  const expertise = [
    'Web Development',
    'Mobile Applications',
    'AI & Machine Learning',
    'DevOps & Cloud',
    'Cloud Architecture',
    'UI/UX Design',
    'Digital Marketing',
    'E-Commerce Solutions',
    'Chatbot Development',
    'API Development',
    'Database Design',
    'Security & Compliance',
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We stay ahead of technology trends to deliver cutting-edge solutions.',
    },
    {
      title: 'Quality',
      description: 'Every project meets our high standards for code quality and user experience.',
    },
    {
      title: 'Collaboration',
      description: 'We work closely with clients to understand and exceed their expectations.',
    },
    {
      title: 'Reliability',
      description: 'Your project is delivered on time and within budget, every time.',
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation />

      {/* Hero Section */}
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
            About <span className="gradient-text">Orvion</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Intelligence in every layer. Delivering advanced solutions worldwide
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl glass border border-blue-500/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Our Mission</h3>
            <p className="text-gray-400 text-lg">
              To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation. We believe in creating lasting partnerships with our clients and delivering value beyond expectations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl glass border border-cyan-500/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Our Vision</h3>
            <p className="text-gray-400 text-lg">
              To be the preferred technology partner for businesses seeking to leverage AI, cloud computing, and modern development practices. We envision a future where technology is accessible, secure, and contributes to meaningful business outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Track Record</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl glass border border-blue-500/20 text-center"
              >
                <p className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl glass border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-400">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500/10 transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
