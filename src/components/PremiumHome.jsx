import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Calendar,
  Cloud,
  Code,
  Cpu,
  Globe,
  Mail,
  MessageSquare,
  Paintbrush,
  Server,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import useContent from '../hooks/useContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const TypeEffect = ({ text, className = '' }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) window.clearInterval(interval);
    }, 34);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span className="ml-1 inline-block h-[0.9em] w-px translate-y-1 bg-violet-300 animate-pulse" />
    </span>
  );
};

const Counter = ({ value, suffix = '', label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame;
    const start = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-violet-500/15 bg-white/[0.035] px-4 py-5 backdrop-blur-sm">
      <p className="text-3xl font-extrabold font-sora gradient-text mb-1">
        {count}{suffix}
      </p>
      <p className="text-xs text-[#c4b5fd]/60">{label}</p>
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, accent, description, align = 'center' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={fadeUp}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className={align === 'left' ? 'max-w-2xl' : 'mx-auto max-w-2xl text-center'}
  >
    <div className="section-label mb-5">
      <Sparkles className="w-3.5 h-3.5" />
      {eyebrow}
    </div>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-sora mb-5">
      {title} <span className="gradient-text">{accent}</span>
    </h2>
    <p className="text-base sm:text-lg text-[#c4b5fd]/60 leading-relaxed">{description}</p>
  </motion.div>
);

const StarField = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,180,254,0.9)_0_1px,transparent_1.5px),radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.7)_0_1px,transparent_1.5px),radial-gradient(circle_at_40%_75%,rgba(255,255,255,0.55)_0_1px,transparent_1.5px),radial-gradient(circle_at_88%_78%,rgba(216,180,254,0.65)_0_1px,transparent_1.5px)] bg-[length:180px_180px,260px_260px,220px_220px,300px_300px] opacity-45" />
    <motion.div
      className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(168,85,247,0.08)_45%,transparent_62%)]"
      animate={{ x: ['-30%', '30%'], opacity: [0.1, 0.45, 0.1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const FALLBACK_HERO_STATS = [
  { id: 'projects', value: 20, suffix: '+', label: 'Projects Delivered' },
  { id: 'industries', value: 5, suffix: '+', label: 'Industries Served' },
  { id: 'response', value: 24, suffix: 'h', label: 'Typical Response' },
  { id: 'experience', value: 2, suffix: '+', label: 'Years Experience' },
];

const Hero = () => {
  const { data: stats } = useContent('statistics', { hero: FALLBACK_HERO_STATS });
  const heroStats = stats?.hero || FALLBACK_HERO_STATS;

  return (
  <section id="hero" className="relative min-h-[92vh] overflow-hidden bg-void px-5 pb-16 pt-28 sm:px-8 lg:pt-32">
    <StarField />
    <div className="noise absolute inset-0 pointer-events-none" />
    <div className="absolute inset-0 grid-bg opacity-15" />
    <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[150px]" />
    <div className="absolute bottom-[-220px] right-[-160px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />

    <div className="pointer-events-none absolute left-1/2 top-[46%] z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 sm:h-[660px] sm:w-[660px] lg:h-[820px] lg:w-[820px]">
      <motion.img
        src="/assets/spinning-removebg-preview.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain object-center opacity-28"
        animate={{ rotateY: 360, scale: [1, 1.04, 1] }}
        transition={{ rotateY: { duration: 18, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>

    <div className="relative z-10 mx-auto flex min-h-[calc(92vh-8rem)] max-w-6xl flex-col items-center justify-center text-center">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl">
        <motion.div variants={fadeUp} className="section-label mb-6 mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="gradient-text font-semibold normal-case tracking-normal">
            Intelligence in Every Layer
          </span>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 font-sora text-[clamp(2.15rem,5.8vw,4.85rem)] font-extrabold leading-[1.05]"
        >
          <TypeEffect
            text="Software and AI built with intelligence in every layer."
            className="gradient-text"
          />
        </motion.h1>
        <motion.p variants={fadeUp} className="mx-auto mb-9 max-w-3xl text-base leading-relaxed sm:text-lg">
          <TypeEffect
            text="Scalable platforms, automation, and premium web experiences for growing businesses."
            className="bg-gradient-to-r from-[#f0eeff] via-[#d8b4fe] to-[#a78bfa] bg-clip-text text-transparent"
          />
        </motion.p>
        <motion.div variants={fadeUp} className="mb-11 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#contact" className="btn-primary justify-center group">
            Book Free Consultation
            <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </a>
          <a href="#work" className="btn-outline justify-center group">
            View Our Work
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <Counter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

const Services = () => {
  const services = [
    { icon: TrendingUp, title: 'Digital Marketing', text: 'Campaigns, content, and funnels designed to increase visibility and qualified leads.' },
    { icon: Globe, title: 'Web Development', text: 'Fast, responsive, conversion-focused websites with polished UX.' },
    { icon: Cpu, title: 'AI Development', text: 'Intelligent automation, chatbots, and ML systems for smarter operations.' },
    { icon: Code, title: 'Software Solutions', text: 'Custom CRM, POS, ERP, and bespoke platforms for your business.' },
    { icon: Share2, title: 'Influencer Marketing', text: 'Creator partnerships that build trust, reach the right audience, and drive action.' },
    { icon: Server, title: 'DevOps', text: 'CI/CD pipelines, containerization, and monitoring for reliable delivery.' },
    { icon: Cloud, title: 'Cloud Services', text: 'Deploy, monitor, improve, and scale with confidence after launch.' },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-night px-5 py-20 sm:px-8 sm:py-28">
      <StarField />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Services"
          title="Built for business"
          accent="outcomes"
          description="Brief, focused services for teams that need dependable execution and a premium digital presence."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={fadeUp} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/12 text-violet-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-sora text-lg font-bold text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed text-[#c4b5fd]/58">{service.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const stack = [
    { name: 'React', image: '/react.jpg' },
    { name: 'Node.js', image: '/node.jfif' },
    { name: 'Express', image: '/express js.jfif' },
    { name: 'MongoDB', image: '/mongo db.jfif' },
    { name: 'PostgreSQL', image: '/postgresql.jpg' },
    { name: 'Python', image: '/python.jpg' },
    { name: 'Docker', image: '/docker.jpg' },
    { name: 'Kubernetes', image: '/kubernetes.jfif' },
    { name: 'Git', image: '/git.jpg' },
    { name: 'WordPress', image: '/wordpress.jfif' },
  ];

  return (
    <section className="relative overflow-hidden bg-void px-5 py-20 sm:px-8 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px shimmer-line opacity-45" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Tech stack"
          title="Modern tools,"
          accent="real delivery"
          description="A brief view of technologies we use, powered by the icon assets already in your public folder."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {stack.map((tech) => (
            <motion.div key={tech.name} variants={fadeUp} whileHover={{ y: -6, scale: 1.02 }} className="glass-card flex items-center gap-4 rounded-2xl p-4">
              <img src={tech.image} alt={`${tech.name} icon`} loading="lazy" className="h-11 w-11 rounded-xl object-cover" />
              <p className="text-sm font-bold text-white">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const WorkAndWhy = () => {
  const points = [
    { icon: ShieldCheck, title: 'Scalable Architecture', text: 'Clean foundations for growth.' },
    { icon: Zap, title: 'Fast Delivery', text: 'Focused sprints and clear milestones.' },
    { icon: MessageSquare, title: 'Transparent Communication', text: 'You always know what is happening.' },
  ];

  return (
    <section id="work" className="relative overflow-hidden bg-night px-5 py-20 sm:px-8 sm:py-28">
      <StarField />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeader
          align="left"
          eyebrow="Brief approach"
          title="Premium work without"
          accent="homepage overload"
          description="We keep the first page concise: what we build, why clients trust us, and how to start a conversation."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-card rounded-2xl p-6"
              >
                <Icon className="mb-5 h-7 w-7 text-violet-300" />
                <h3 className="mb-2 font-sora text-lg font-bold text-white">{point.title}</h3>
                <p className="text-sm leading-relaxed text-[#c4b5fd]/58">{point.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="relative overflow-hidden bg-night px-5 py-20 sm:px-8 sm:py-28">
    <StarField />
    <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <SectionHeader
          align="left"
          eyebrow="Contact"
          title="Let's build something"
          accent="exceptional"
          description="Share your idea, product, workflow, or website goal. We will help shape the next step."
        />
        <a href="mailto:hello@theorvion.com" className="mt-8 inline-flex items-center gap-3 text-violet-300 hover:text-white transition-colors">
          <Mail className="h-5 w-5" />
          hello@theorvion.com
        </a>
      </div>

      <motion.form
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        onSubmit={(event) => event.preventDefault()}
        className="glass-card space-y-5 rounded-[2rem] p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="form-group">
            <input id="name" type="text" placeholder=" " required />
            <label htmlFor="name">Full Name</label>
          </div>
          <div className="form-group">
            <input id="email" type="email" placeholder=" " required />
            <label htmlFor="email">Email Address</label>
          </div>
        </div>
        <div className="form-group">
          <textarea id="message" rows={5} placeholder=" " required />
          <label htmlFor="message">Project Details</label>
        </div>
        <button type="submit" className="btn-primary w-full justify-center py-4">
          Book Free Consultation
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.form>
    </div>
  </section>
);

const PremiumHome = () => (
  <>
    <Hero />
    <Services />
    <TechStack />
    <WorkAndWhy />
    <Contact />
  </>
);

export default PremiumHome;
