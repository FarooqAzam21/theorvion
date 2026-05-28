import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const CaseStudies = () => {
  const cases = [
    {
      id: 1,
      title: 'TechVision AI Platform',
      category: 'AI / ML',
      challenge: 'Build an enterprise AI platform that could process millions of data points in real-time',
      solution: 'Designed and developed a scalable ML infrastructure using Node.js, Python, and cloud services',
      impact: 'Reduced processing time by 87% and enabled 10,000+ concurrent users',
      technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
      metrics: [
        { label: 'Performance Gain', value: '87%' },
        { label: 'Concurrent Users', value: '10K+' },
        { label: 'API Response', value: '<100ms' }
      ],
      image: '🤖',
      color: 'from-violet-600 to-purple-600'
    },
    {
      id: 2,
      title: 'CloudSync Enterprise',
      category: 'Cloud Infrastructure',
      challenge: 'Migrate legacy monolith to microservices architecture for 50+ million users',
      solution: 'Architected containerized microservices using Docker, Kubernetes, and managed databases',
      impact: 'Increased system reliability to 99.99% uptime and reduced costs by 45%',
      technologies: ['Docker', 'Kubernetes', 'Node.js', 'MongoDB', 'Redis'],
      metrics: [
        { label: 'Uptime', value: '99.99%' },
        { label: 'Cost Reduction', value: '45%' },
        { label: 'Scale Factor', value: '100x' }
      ],
      image: '☁️',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 3,
      title: 'DataFlow Analytics Suite',
      category: 'Data Analytics',
      challenge: 'Create a real-time analytics dashboard for 500+ SaaS companies',
      solution: 'Built custom analytics engine with WebSocket streaming and predictive models',
      impact: 'Processed 2 billion data points daily with sub-second query response times',
      technologies: ['React', 'Express', 'PostgreSQL', 'Elasticsearch', 'React Query'],
      metrics: [
        { label: 'Daily Records', value: '2B+' },
        { label: 'Query Speed', value: '<1s' },
        { label: 'Users', value: '500+' }
      ],
      image: '📊',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 4,
      title: 'Innovate E-Commerce Platform',
      category: 'E-Commerce',
      challenge: 'Build high-performance e-commerce platform handling Black Friday traffic spikes',
      solution: 'Engineered optimized frontend with Next.js and serverless backend architecture',
      impact: 'Handled 500K concurrent users without performance degradation',
      technologies: ['Next.js', 'Serverless', 'DynamoDB', 'CloudFront', 'Stripe'],
      metrics: [
        { label: 'Concurrent Users', value: '500K' },
        { label: 'Page Load', value: '<1.5s' },
        { label: 'Conversion Lift', value: '+35%' }
      ],
      image: '🛒',
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <section id="portfolio" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
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
            <span className="text-xs font-semibold text-violet-300">Case Studies</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sora text-white mb-5">
            <span className="gradient-text">Real Results</span> from Real Projects
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            See how we've helped ambitious companies build world-class digital products and scale their impact.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-12 md:space-y-16">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="group relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-violet-500/10 hover:border-violet-500/30 transition-all duration-500 bg-gradient-to-br from-white/[0.03] to-violet-500/[0.02]">
                
                {/* Background glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-10">
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                    
                    {/* Left: Main Info */}
                    <div className="md:col-span-2 space-y-6">
                      
                      {/* Header */}
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${caseStudy.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                            {caseStudy.image}
                          </div>
                          <div>
                            <span className="inline-block px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
                              {caseStudy.category}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold font-sora text-white">
                              {caseStudy.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Challenge, Solution, Impact */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">Challenge</p>
                          <p className="text-sm text-white/70 leading-relaxed">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">Solution</p>
                          <p className="text-sm text-white/70 leading-relaxed">{caseStudy.solution}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">Impact</p>
                          <p className="text-sm text-white/70 leading-relaxed">{caseStudy.impact}</p>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="pt-4 border-t border-violet-500/10">
                        <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-3">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-violet-500/10 text-xs text-violet-300/80 border border-violet-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Metrics */}
                    <div className="md:border-l border-violet-500/10 md:pl-8 space-y-4">
                      <p className="text-xs font-semibold text-white/60 uppercase tracking-wide">Key Metrics</p>
                      {caseStudy.metrics.map((metric, i) => (
                        <div key={i}>
                          <p className="text-2xl md:text-3xl font-bold font-sora gradient-text mb-1">
                            {metric.value}
                          </p>
                          <p className="text-xs text-white/50">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-violet-500/10 flex items-center justify-between">
                    <p className="text-sm text-white/60">View full case study</p>
                    <button className="group/btn p-3 rounded-full bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all">
                      <ExternalLink className="w-5 h-5 text-violet-400 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-white/60 mb-6">Ready to build something extraordinary?</p>
          <a href="#contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30">
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default CaseStudies;
