import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

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
        <Link to={`/services/${service.id}`} className="flex items-center gap-2 text-xs font-semibold text-violet-400/60 group-hover:text-violet-300 transition-colors w-fit">
          <span>Explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path>
          </svg> Our Services
        </div>
        <h2 className="text-responsive-lg font-extrabold font-sora text-white mb-5">
          Solutions for <span className="gradient-text">Modern Growth</span>
        </h2>
        <p className="text-lg text-[#c4b5fd]/55 max-w-xl mx-auto leading-relaxed">
          Comprehensive digital systems designed to help your brand scale confidently in the digital world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {servicesData.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
