import { motion } from 'framer-motion';
import { Zap, Target, Palette, Code, Rocket, Headphones } from 'lucide-react';

const ProcessTimeline = () => {
  const steps = [
    {
      id: 1,
      icon: Target,
      title: 'Discovery',
      description: 'We dive deep into your vision, goals, and market positioning to create a comprehensive strategy blueprint.',
      details: ['Market Analysis', 'Competitive Research', 'User Personas', 'Project Roadmap']
    },
    {
      id: 2,
      icon: Palette,
      title: 'Strategy & Design',
      description: 'Transform insights into actionable designs with user-centric approach and proven best practices.',
      details: ['UX/UI Design', 'Wireframing', 'Prototyping', 'Design System']
    },
    {
      id: 3,
      icon: Code,
      title: 'Development',
      description: 'Build scalable, high-performance solutions using modern technologies and best engineering practices.',
      details: ['Full Stack Dev', 'API Design', 'Database Optimization', 'Quality Assurance']
    },
    {
      id: 4,
      icon: Zap,
      title: 'Optimization',
      description: 'Fine-tune performance, security, and user experience with rigorous testing and refinement.',
      details: ['Performance Tuning', 'Security Audit', 'User Testing', 'Accessibility']
    },
    {
      id: 5,
      icon: Rocket,
      title: 'Launch',
      description: 'Deploy with precision. We handle everything from infrastructure to marketing coordination.',
      details: ['Deployment', 'Monitoring', 'Launch Marketing', 'Analytics Setup']
    },
    {
      id: 6,
      icon: Headphones,
      title: 'Support & Scale',
      description: 'Ongoing partnership with continuous improvements, scaling, and strategic guidance.',
      details: ['24/7 Support', 'Performance Monitoring', 'Feature Updates', 'Growth Strategy']
    }
  ];

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
            <span className="text-xs font-semibold text-violet-300">Process</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sora text-white mb-5">
            Our <span className="gradient-text">Proven Process</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A structured approach designed to deliver exceptional results while keeping you informed every step of the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500/0 via-violet-500/40 to-violet-500/0 pointer-events-none" />

          <div className="grid lg:grid-cols-6 gap-6 md:gap-4 lg:gap-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 mb-6 relative">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300"
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-violet-600 flex items-center justify-center text-xs font-bold">
                      {step.id}
                    </div>
                  </div>
                  
                  {/* Arrow to next step (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute left-[70px] top-6 w-12 h-0.5 bg-gradient-to-r from-violet-500/60 to-transparent" />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-violet-500/[0.02] border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white/[0.05] group-hover:to-violet-500/[0.05]">
                  <h3 className="text-xl font-bold font-sora text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-5 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-xs text-white/50"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Each phase is designed with flexibility to adapt to your needs while maintaining our commitment to excellence.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white/5 border border-violet-500/40 hover:bg-violet-500/10 text-violet-300 transition-all duration-300">
            Let's Discuss Your Project
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ProcessTimeline;
