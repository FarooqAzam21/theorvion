import { motion } from 'framer-motion';

const Technologies = () => {
  const tech = [
    { name: 'React', image: '/react.jpg' },
    { name: 'Node.js', image: '/node.jfif' },
    { name: 'Python', image: '/python.jpg' },
    { name: 'Docker', image: '/docker.jpg' },
    { name: 'PostgreSQL', image: '/postgresql.jpg' },
    { name: 'Kubernetes', image: '/kubernetes.jfif' },
    { name: 'Git', image: '/git.jpg' },
    {name:"WordPress" , image:'/wordpress.jfif'},
    {name:"Express.js" , image:'/express js.jfif'},
    {name:"Mongo DB" , image:'/mongo db.jfif'}
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
        {/* Section header */}
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
            We use the latest and most reliable technologies to build scalable solutions
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
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
              className="p-6 rounded-xl glass border border-purple-500/20 hover:border-purple-500/50 flex flex-col items-center justify-center text-center group cursor-pointer"
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

        {/* Additional info */}
        <motion.div
          className="mt-16 p-8 rounded-2xl glass border border-purple-500/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-3 text-white">Always Learning</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our team stays updated with the latest technology trends and framework updates.
            We continuously adopt new tools and practices to provide cutting-edge solutions
            to our clients while maintaining code quality and security.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
