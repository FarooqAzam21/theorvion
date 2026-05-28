import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. Most projects range from 8-24 weeks. We provide a detailed timeline during discovery. With our structured process, you can expect regular milestones and transparent communication throughout.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern, industry-leading technologies including React, Node.js, Next.js, Python, PostgreSQL, MongoDB, Docker, Kubernetes, AWS, and AI/ML tools. We choose technologies based on project requirements and your specific needs.'
    },
    {
      question: 'Do you provide maintenance and support after launch?',
      answer: 'Yes! We offer ongoing 24/7 support packages including monitoring, bug fixes, performance optimization, and feature updates. Many of our clients maintain long-term partnerships with us for continuous improvement and scaling.'
    },
    {
      question: 'How does your pricing work?',
      answer: 'We offer flexible pricing models: fixed-price projects for well-defined scopes, time-and-materials for evolving projects, and dedicated team augmentation. We provide a detailed proposal after discovery conversations and are transparent about all costs.'
    },
    {
      question: 'Can you build AI solutions and integrate LLMs?',
      answer: 'Absolutely! We have extensive expertise in AI/ML integration including OpenAI APIs, LangChain, custom ML models, and AI automation. Whether you need chatbots, predictive analytics, or intelligent workflows, we can help.'
    },
    {
      question: 'What\'s your approach to code quality and testing?',
      answer: 'We follow software engineering best practices: comprehensive unit and integration tests, code reviews, CI/CD pipelines, and security audits. Our goal is production-ready code with >90% test coverage and zero critical vulnerabilities.'
    },
    {
      question: 'Do you work with startups and enterprises?',
      answer: 'Yes! We work with ambitious startups, scale-ups, and enterprises. Our approach scales from MVP development for startups to complex systems for large organizations. Many of our clients started as startups and grew with us.'
    },
    {
      question: 'How do you handle communication and reporting?',
      answer: 'We believe in radical transparency. You get weekly status updates, sprint reviews, direct access to your team, and a dedicated project manager. We use Slack, Jira, and regular video calls to keep you informed.'
    }
  ];

  return (
    <section className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            <span className="text-xs font-semibold text-violet-300">Questions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sora text-white mb-5">
            Frequently <span className="gradient-text">Asked Questions</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know about working with Orvion. Can't find what you're looking for? <a href="#contact" className="text-violet-400 hover:text-violet-300">Contact us</a>.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full text-left"
              >
                <div className="relative group p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-violet-500/[0.02] border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%)'
                    }}
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <h3 className="text-base md:text-lg font-bold font-sora text-white text-left flex-1 group-hover:text-violet-300 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-violet-400" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 bg-violet-500/[0.03] border-x border-b border-violet-500/10 rounded-b-2xl mt-1">
                      <p className="text-white/70 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-violet-500/10 via-transparent to-purple-500/10 border border-violet-500/20 text-center"
        >
          <h3 className="text-2xl font-bold font-sora text-white mb-3">Still have questions?</h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            We're always happy to discuss your project and answer any questions. Schedule a free consultation with our team.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30">
            Book Free Consultation
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default FAQ;
