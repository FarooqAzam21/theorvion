import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-void overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6 section-label">
              <MessageSquare className="w-3.5 h-3.5" />
              Get In Touch
            </div>
            <h2 className="text-responsive-lg font-extrabold font-sora text-white mb-8 leading-tight">
              Let's Build Something <span className="gradient-text">Exceptional</span> Together
            </h2>
            <p className="text-lg text-[#c4b5fd]/60 leading-relaxed mb-12 font-inter max-w-lg">
              Have a visionary project in mind? We'd love to hear from you. 
              Our team typically responds within 4 business hours.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@theorvion.com', sub: 'For general inquiries' },
                { icon: Phone, label: 'Call Us', value: '+92 336 0196844', sub: 'Mon-Fri, 9am-6pm EST' },
                /*{ icon: MapPin, label: 'Visit Us', value: '123 Innovation Way, Tech City, CA', sub: 'Our global headquarters' }*/,
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-inner-glow">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-violet-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{item.value}</h4>
                      <p className="text-sm text-[#c4b5fd]/40">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[2.5rem] relative"
          >
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-glow-violet animate-float">
               <Sparkles className="w-6 h-6 text-white" />
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>
              
              <div className="form-group">
                <input type="text" id="subject" placeholder=" " required />
                <label htmlFor="subject">Subject</label>
              </div>
              
              <div className="form-group">
                <textarea id="message" rows={5} placeholder=" " required></textarea>
                <label htmlFor="message">Project Details</label>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-[#c4b5fd]/40 mb-2 px-2">
                 <input type="checkbox" id="consent" className="accent-violet-500" required />
                 <label htmlFor="consent">I agree to the privacy policy and data processing.</label>
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                Start Your Project
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
