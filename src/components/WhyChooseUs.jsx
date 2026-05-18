import { motion } from 'framer-motion';
import { CheckCircle2, Target, Zap, TrendingUp, Users, Sparkles } from 'lucide-react';

const differentiators = [
  {
    title: 'Real, Measurable Growth',
    desc: 'We don’t do “just enough” — every solution is built for impact and scaling.',
    icon: Target,
  },
  {
    title: 'Strategy-First Approach',
    desc: 'Every campaign is backed by clear thinking and data, not guesswork.',
    icon: Zap,
  },
  {
    title: 'Focus on Results',
    desc: 'We solve business problems, not just deliver tasks. Impact is our goal.',
    icon: TrendingUp,
  },
  {
    title: 'Built for Scalability',
    desc: 'What we create today is designed to grow with your business tomorrow.',
    icon: Sparkles,
  },
  {
    title: 'Partnership Mindset',
    desc: 'We grow when you grow. We believe in long-term, consistent execution.',
    icon: Users,
  },
  {
    title: 'Innovation + Performance',
    desc: 'Blending creativity with tech to keep your brand strong and competitive.',
    icon: CheckCircle2,
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-night">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side - The Why */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-6 section-label">
                <CheckCircle2 className="w-3.5 h-3.5" />
                The Orvion Advantage
              </div>
              <h2 className="text-responsive-lg font-extrabold font-sora text-white mb-8 leading-tight">
                Why Choose <span className="gradient-text">Orvion</span>
              </h2>
              <div className="space-y-6 text-lg text-[#c4b5fd]/60 leading-relaxed font-inter">
                <p>
                  At Orvion, we go beyond traditional marketing by building intelligent growth systems tailored to each business. 
                  We combine strategy, creativity, automation, and technology to help brands generate better results.
                </p>
                <p>
                  We focus on real impact — not just impressions or trends. Our goal is to create long-term value through 
                  performance-driven solutions that help businesses grow smarter, faster, and stronger.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Differentiators */}
          <div className="lg:col-span-7">
             <div className="mb-10">
                <h3 className="text-2xl font-bold font-sora text-white mb-2">What Makes Us Different?</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" />
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {differentiators.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className="glass-card p-6 rounded-3xl group hover:border-violet-500/40 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold font-sora text-white mb-2 group-hover:text-violet-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#c4b5fd]/50 leading-relaxed font-inter">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
