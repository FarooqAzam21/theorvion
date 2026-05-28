import { motion } from 'framer-motion';

const TechStack = () => {
  const technologies = [
    // Frontend
    { name: 'React', category: 'Frontend', icon: '⚛️', color: 'from-blue-400 to-cyan-500' },
    { name: 'Next.js', category: 'Frontend', icon: '▲', color: 'from-black to-gray-800' },
    { name: 'TypeScript', category: 'Frontend', icon: '<>', color: 'from-blue-600 to-blue-400' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', color: 'from-cyan-400 to-blue-500' },
    
    // Backend
    { name: 'Node.js', category: 'Backend', icon: '🟢', color: 'from-green-500 to-emerald-600' },
    { name: 'Express', category: 'Backend', icon: 'E', color: 'from-yellow-600 to-yellow-400' },
    { name: 'Python', category: 'Backend', icon: '🐍', color: 'from-blue-500 to-yellow-400' },
    { name: 'NestJS', category: 'Backend', icon: '🦅', color: 'from-red-500 to-pink-600' },
    
    // Databases
    { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'from-blue-700 to-blue-500' },
    { name: 'MongoDB', category: 'Database', icon: '🍃', color: 'from-green-600 to-green-400' },
    { name: 'Redis', category: 'Database', icon: '📦', color: 'from-red-600 to-red-400' },
    { name: 'Firebase', category: 'Database', icon: '🔥', color: 'from-orange-500 to-yellow-500' },
    
    // DevOps & Cloud
    { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'from-blue-600 to-cyan-500' },
    { name: 'Kubernetes', category: 'DevOps', icon: '☸️', color: 'from-blue-500 to-blue-700' },
    { name: 'AWS', category: 'Cloud', icon: '📡', color: 'from-orange-600 to-yellow-600' },
    { name: 'GCP', category: 'Cloud', icon: '🌩️', color: 'from-blue-400 to-red-500' },
    
    // AI & ML
    { name: 'TensorFlow', category: 'AI/ML', icon: '🧠', color: 'from-orange-500 to-orange-700' },
    { name: 'Ollama', category: 'AI/ML', icon: '🦙', color: 'from-purple-600 to-purple-400' },
    { name: 'OpenAI API', category: 'AI/ML', icon: '🤖', color: 'from-gray-700 to-gray-900' },
    { name: 'LangChain', category: 'AI/ML', icon: '🔗', color: 'from-emerald-600 to-teal-500' }
  ];

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'AI/ML'];
  const categoryColors = {
    Frontend: 'from-blue-600 to-cyan-600',
    Backend: 'from-green-600 to-emerald-600',
    Database: 'from-purple-600 to-violet-600',
    DevOps: 'from-orange-600 to-red-600',
    Cloud: 'from-yellow-600 to-orange-600',
    'AI/ML': 'from-rose-600 to-pink-600'
  };

  return (
    <section className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            <span className="text-xs font-semibold text-violet-300">Technology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sora text-white mb-5">
            Built with <span className="gradient-text">Cutting-Edge Tech</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We leverage the latest and most reliable technologies to build scalable, performant, and maintainable solutions.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className={`px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/20 bg-gradient-to-r ${categoryColors[category]} opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer`}
            >
              {category}
            </motion.div>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: (index % 5) * 0.05
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-violet-500/[0.02] border border-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%)`
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-violet-500/30 transition-all duration-300`}>
                  {tech.icon}
                </div>

                {/* Name & Category */}
                <div className="text-center">
                  <h3 className="font-bold text-white text-sm">{tech.name}</h3>
                  <p className="text-xs text-white/50 mt-1">{tech.category}</p>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, rgba(168, 85, 247, 0.3), transparent)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-violet-500/10 to-purple-500/5 border border-violet-500/20"
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Why These Tools</h3>
            <p className="text-sm text-white/60">We choose technologies based on project requirements, scalability needs, and long-term maintainability.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Future-Proof</h3>
            <p className="text-sm text-white/60">Our stack evolves with industry standards. We continuously evaluate and integrate emerging technologies.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Open to Customization</h3>
            <p className="text-sm text-white/60">Your tech preferences matter. We're flexible to work with your existing stack or preferred technologies.</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default TechStack;
