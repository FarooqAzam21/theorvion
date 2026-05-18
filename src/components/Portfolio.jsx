import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'Nexus AI Platform',
    category: 'AI / SaaS',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    color: 'from-violet-600/20 to-indigo-600/20',
  },
  {
    title: 'Ethos Wallet',
    category: 'Fintech / Web3',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
    color: 'from-cyan-600/20 to-blue-600/20',
  },
  {
    title: 'Velocita E-Com',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
    color: 'from-fuchsia-600/20 to-pink-600/20',
  },
  {
    title: 'Orbit Design System',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    color: 'from-indigo-600/20 to-violet-600/20',
  },
  {
    title: 'Pulse Health App',
    category: 'Healthtech',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
    color: 'from-pink-600/20 to-rose-600/20',
  },
  {
    title: 'Lumina Cloud',
    category: 'Cloud Infrastructure',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    color: 'from-blue-600/20 to-cyan-600/20',
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-5 section-label">
              <Sparkles className="w-3.5 h-3.5" />
              Recent Work
            </div>
            <h2 className="text-responsive-lg font-extrabold font-sora text-white">
              Selected <span className="gradient-text">Masterpieces</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <button className="btn-outline group">
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-none"
            >
              {/* Image with zoom effect */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-0 z-0"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-80`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </motion.div>

              {/* Content overlay */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="overflow-hidden">
                   <motion.p 
                     initial={{ y: '100%' }}
                     whileInView={{ y: 0 }}
                     className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2"
                   >
                     {project.category}
                   </motion.p>
                </div>
                <div className="overflow-hidden">
                   <motion.h3 
                     initial={{ y: '100%' }}
                     whileInView={{ y: 0 }}
                     className="text-2xl font-bold font-sora text-white mb-4"
                   >
                     {project.title}
                   </motion.h3>
                </div>
                
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-12 h-px bg-violet-500/50" />
                  <button className="flex items-center gap-2 text-white font-semibold text-sm">
                    View Case Study
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Corner Glow */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                    <ArrowUpRight className="w-5 h-5" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
