import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Search, 
  Share2, 
  Cpu, 
  Palette, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Data-driven marketing strategies designed to increase visibility, generate qualified leads, and drive measurable business growth.',
    accent: 'from-violet-600 to-violet-800',
    glow: 'rgba(147,51,234,0.18)',
    tags: ['Leads', 'ROI', 'Growth'],
  },
  {
    icon: Users,
    title: 'Social Media Management',
    description: 'Creative content and brand-focused social media strategies that help businesses build authority and engage their audience effectively.',
    accent: 'from-violet-500 to-violet-700',
    glow: 'rgba(168,85,247,0.18)',
    tags: ['Brand', 'Engagement', 'Social'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive, and high-performing websites built to strengthen your online presence and improve customer experience.',
    accent: 'from-violet-700 to-indigo-900',
    glow: 'rgba(139,92,246,0.18)',
    tags: ['React', 'Performance', 'UX'],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Search engine optimization strategies focused on improving rankings, increasing organic traffic, and boosting online visibility.',
    accent: 'from-violet-600 to-indigo-800',
    glow: 'rgba(147,51,234,0.18)',
    tags: ['Ranking', 'Traffic', 'SEO'],
  },
  {
    icon: Share2,
    title: 'Influencer Marketing',
    description: 'Strategic influencer collaborations that connect your brand with the right audience and drive real conversions through authentic promotion.',
    accent: 'from-violet-500 to-purple-800',
    glow: 'rgba(168,85,247,0.18)',
    tags: ['Auth', 'Reach', 'Sales'],
  },
  {
    icon: Cpu,
    title: 'AI & Automation Systems',
    description: 'Smart automation solutions, AI-powered workflows, chatbots, and CRM integrations designed to improve efficiency.',
    accent: 'from-violet-700 to-violet-900',
    glow: 'rgba(139,92,246,0.18)',
    tags: ['AI', 'Workflows', 'CRM'],
  },
  {
    icon: Palette,
    title: 'Branding & Creative Solutions',
    description: 'Strategic branding, visual identity, and creative design solutions that help businesses stand out and create a lasting impression.',
    accent: 'from-violet-600 to-indigo-700',
    glow: 'rgba(147,51,234,0.18)',
    tags: ['Identity', 'Design', 'Strategy'],
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -7, y: dx * 7 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      className="relative group rounded-2xl overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${service.glow}, transparent 70%)`, boxShadow: `0 0 50px ${service.glow}` }}
      />
      <div className="glass-card h-full rounded-2xl p-7 flex flex-col group-hover:border-violet-500/30 transition-all duration-300">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-bold font-sora text-white mb-3">{service.title}</h3>
        <p className="text-sm text-[#c4b5fd]/55 leading-relaxed mb-5 flex-1">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300/80 border border-violet-500/15">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-400/60 group-hover:text-violet-300 transition-colors">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px shimmer-line opacity-40" />
    <div className="relative z-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 mb-5 section-label">
          <Sparkles className="w-3.5 h-3.5" /> Our Services
        </div>
        <h2 className="text-responsive-lg font-extrabold font-sora text-white mb-5">
          Solutions for <span className="gradient-text">Modern Growth</span>
        </h2>
        <p className="text-lg text-[#c4b5fd]/55 max-w-xl mx-auto leading-relaxed">
          Comprehensive digital systems designed to help your brand scale confidently in the digital world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
