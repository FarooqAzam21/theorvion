import { useRef , useMemo  } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, BarChart, Code, Settings, Sparkles } from 'lucide-react';


const Hero = () => {
  const PARTICLES = useMemo(
  () =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 17) % 100,
      y: (i * 13) % 100,
      size: 2,
      duration: 8,
      delay: 0,
    })),
  []
);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void pt-24"
    >
      {/* ─── Background Elements ─── */}
      <div className="noise absolute inset-0 pointer-events-none z-0" />
      
      {/* Animated Nebular Blobs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="blob w-[800px] h-[800px] top-[-20%] right-[-10%]"
          style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15), transparent 70%)', animationDuration: '20s' }}
        />
        <div
          className="blob w-[600px] h-[600px] bottom-[-10%] left-[-10%]"
          style={{ background: 'radial-gradient(circle, rgba(126, 34, 206, 0.1), transparent 70%)', animationDuration: '25s' }}
        />
      </motion.div>

      {/* Stars/Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-violet-300"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.2 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* Brand Logo & Name */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          className="mb-16 flex items-center gap-4 self-start lg:ml-0"
        >
          <span className="text-xl font-medium tracking-wide text-white/90">The Orvion</span>
          <div className="w-1 h-1 rounded-full bg-violet-400 ml-2 animate-pulse" />
        </motion.div>

        {/* Central Brand Identity */}
        <div className="text-center mb-20 relative">


          <motion.h1
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-sora tracking-widest mb-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4"
          >
            <span className="text-white">The</span>
            <span className="gradient-text">Orvion</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-[10px] sm:text-xs md:text-sm font-medium text-violet-300/60 uppercase mt-8 text-center tracking-[0.5em]"
          >
            Intelligence in Every Layer
          </motion.div>
          
          <div className="mt-8 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </div>

        {/* Horizontal Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mb-24 border-t border-b border-violet-500/10 py-10"
        >
          {[
            { icon: TrendingUp, label: 'PERFORMANCE', sub: 'MARKETING' },
            { icon: BarChart, label: 'BRAND', sub: 'STRATEGY' },
            { icon: Code, label: 'WEB', sub: 'DEVELOPMENT' },
            { icon: Settings, label: 'AUTOMATION', sub: 'SYSTEMS' },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 group cursor-none">
              <div className="w-10 h-10 rounded-lg border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-all duration-300 shadow-glow-sm">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-white/90 tracking-widest leading-none">{item.label}</p>
                <p className="text-[10px] font-medium text-violet-400 tracking-widest mt-1">{item.sub}</p>
              </div>
              {i < 3 && <div className="hidden lg:block h-8 w-px bg-violet-500/20 ml-12" />}
            </div>
          ))}
        </motion.div>

        {/* Bottom Tagline Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-violet-500 shadow-glow-sm" />
            DATA DRIVEN
          </div>
          <div className="hidden md:block w-px h-4 bg-violet-500/20" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-violet-500 shadow-glow-sm" />
            CREATIVE LED
          </div>
          <div className="hidden md:block w-px h-4 bg-violet-500/20" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-violet-500 shadow-glow-sm" />
            RESULTS FOCUSED
          </div>
        </motion.div>

      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollTo('#services')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-violet-400/30 hover:text-violet-300 transition-colors"
      >
        <div className="w-px h-12 bg-gradient-to-b from-violet-500/50 to-transparent mx-auto" />
      </motion.button>
    </section>
  );
};

export default Hero;
