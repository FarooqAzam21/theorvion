import { motion } from 'framer-motion';
import { Search, Compass, Zap, BarChart, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Audit & Analysis',
    desc: 'We start with a detailed audit of your business, audience, and competitors to understand your current position and opportunities.',
    icon: Search,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Tailored Strategy',
    desc: 'Based on insights, we develop a tailored growth strategy aligned specifically with your goals and market needs.',
    icon: Compass,
    color: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'Precision Execution',
    desc: 'We move into execution by implementing targeted campaigns, systems, and digital solutions with engineering precision.',
    icon: Zap,
    color: 'from-fuchsia-600 to-violet-600',
  },
  {
    title: 'Optimization & Scaling',
    desc: 'We continuously monitor performance, optimize results, and scale what works to ensure consistent long-term growth.',
    icon: BarChart,
    color: 'from-cyan-600 to-indigo-600',
  },
];

const HowWeWork = () => {
  return (
    <section id="how-we-work" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 section-label">
            <Zap className="w-3.5 h-3.5" />
            Our Process
          </div>
          <h2 className="text-responsive-lg font-extrabold font-sora text-white mb-5">
            How We <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="text-lg text-[#c4b5fd]/55 max-w-2xl mx-auto leading-relaxed">
            A structured and result-driven process focused on clarity, innovation, and measurable performance.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} p-px mb-8 relative group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-[23px] bg-void flex items-center justify-center">
                       <Icon className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-surface border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 shadow-lg">
                      0{i + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-sora text-white mb-4 group-hover:text-violet-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#c4b5fd]/50 leading-relaxed font-inter px-4">
                    {step.desc}
                  </p>
                  
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 text-violet-500/20">
                       <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;
