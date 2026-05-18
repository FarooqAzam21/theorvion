import { motion } from 'framer-motion';
import { Target, Eye, Zap, Shield, Rocket, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Content Left - About Us */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6 section-label">
              <Zap className="w-3.5 h-3.5" />
              About Us
            </div>
            
            <h2 className="text-responsive-lg font-extrabold font-sora text-white mb-8 leading-tight">
              We Build Systems for <span className="gradient-text">Measurable Growth</span>
            </h2>
            
            <div className="space-y-6 text-lg text-[#c4b5fd]/70 leading-relaxed font-inter">
              <p>
                Orvion is a modern digital growth agency focused on helping businesses scale through smart marketing, 
                automation, and performance-driven strategies. We don’t just run campaigns — we build systems that generate 
                real, measurable business growth.
              </p>
              <p>
                By combining creativity, data, and technology, we help brands increase visibility, improve conversions, 
                and streamline their digital operations. Every strategy we create is designed with one goal: impact.
              </p>
              <p>
                At Orvion, we believe in long-term partnerships, consistent execution, and delivering results that help 
                businesses grow with confidence in a competitive digital world.
              </p>
            </div>
          </motion.div>
          
          {/* Content Right - Mission & Vision */}
          <div className="space-y-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-sora text-white">Our Mission</h3>
              </div>
              <p className="text-[#c4b5fd]/60 leading-relaxed font-inter">
                Our mission is to help brands and businesses grow through intelligent marketing, automation, 
                and scalable digital systems. We aim to simplify how companies attract customers, manage operations, 
                and increase conversions by combining creativity, technology, and performance-driven strategies.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-sora text-white">Our Vision</h3>
              </div>
              <p className="text-[#c4b5fd]/60 leading-relaxed font-inter">
                To become a globally recognized growth and technology company that empowers modern businesses 
                with smart digital infrastructure. We aspire to build an ecosystem where marketing, AI, automation, 
                and software work together seamlessly to help businesses scale faster and operate smarter.
              </p>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
