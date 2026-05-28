import { motion } from 'framer-motion';
import { Star, Check } from 'lucide-react';

const SocialProof = () => {
  const clients = [
    { name: 'TechVision', category: 'AI Solutions' },
    { name: 'CloudSync', category: 'Infrastructure' },
    { name: 'DataFlow', category: 'Analytics' },
    { name: 'DigitalHub', category: 'E-Commerce' },
    { name: 'Innovate AI', category: 'ML Platform' },
    { name: 'NextGen', category: 'SaaS' },
  ];

  const stats = [
    { value: '500+', label: 'Successful Projects', icon: Check },
    { value: '98%', label: 'Client Retention', icon: Star },
    { value: '$50M+', label: 'Revenue Delivered', icon: '💰' },
    { value: '99.9%', label: 'Uptime Record', icon: '⚡' },
  ];

  const testimonials = [
    {
      rating: 5,
      text: 'Orvion transformed our entire digital infrastructure. Their expertise in modern tech stack is unmatched.',
      author: 'Sarah Chen',
      role: 'CEO, TechVision',
      image: '👩‍💼'
    },
    {
      rating: 5,
      text: 'The team delivered our AI platform in record time without compromising quality. Highly recommended.',
      author: 'Marcus Johnson',
      role: 'Founder, DataFlow',
      image: '👨‍💼'
    },
    {
      rating: 5,
      text: 'Best development partner we\'ve worked with. Their attention to detail and communication is exceptional.',
      author: 'Elena Rodriguez',
      role: 'Product Director, CloudSync',
      image: '👩‍🦰'
    },
  ];

  return (
    <section id="social-proof" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Star className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">Trusted by Leaders</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sora text-white mb-5">
            <span className="gradient-text">Proven Results</span> from Ambitious Brands
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From startups to enterprises, companies trust Orvion to deliver exceptional digital products.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold font-sora gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-sm font-semibold text-white/50 text-center mb-10 uppercase tracking-wide">
            Trusted by Growing Companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative p-4 md:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold mb-3 group-hover:scale-110 transition-transform">
                  {client.name[0]}
                </div>
                <p className="font-semibold text-white text-center text-sm">{client.name}</p>
                <p className="text-xs text-white/50 mt-2">{client.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-violet-500/5 via-transparent to-purple-500/5 rounded-3xl p-8 md:p-12 border border-violet-500/10">
          <h3 className="text-3xl font-bold font-sora text-white mb-12 text-center">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-500/20 transition-all duration-300 group"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-white/80 mb-6 flex-1 leading-relaxed text-sm md:text-base">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                    <p className="text-xs text-white/50">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {['ISO 27001 Certified', 'GDPR Compliant', 'SOC 2 Type II', 'Carbon Neutral'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/60">
              <Check className="w-4 h-4 text-violet-400" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default SocialProof;
