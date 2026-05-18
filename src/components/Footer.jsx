import { motion } from 'framer-motion';
import { Zap, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';

const SocialIcons = {
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
  ),
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void pt-24 pb-12 px-5 sm:px-8 border-t border-violet-500/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/assets/logo.png" alt="Orvion Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              </div>
              <span className="text-2xl font-bold font-sora tracking-tight text-white/90">
                The Orvion
              </span>
            </div>
            <p className="text-[#c4b5fd]/50 leading-relaxed mb-8 font-inter">
              Orvion is a modern growth and digital solutions company helping businesses 
              scale through intelligent marketing, automation, and performance-driven systems.
            </p>
            <div className="flex gap-4">
              {[SocialIcons.Twitter, SocialIcons.Github, SocialIcons.Linkedin, SocialIcons.Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-center text-violet-400 hover:bg-violet-500 hover:text-white hover:shadow-glow-violet transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold font-sora mb-8">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'UI/UX Design', 'AI Integration', 'Cloud Solutions', 'Digital Marketing'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#c4b5fd]/50 hover:text-violet-400 transition-colors font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold font-sora mb-8">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Projects', 'Core Team', 'Career', 'News & Media'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#c4b5fd]/50 hover:text-violet-400 transition-colors font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold font-sora mb-8">Newsletter</h4>
            <p className="text-[#c4b5fd]/50 mb-6 text-sm">Join 5,000+ subscribers for digital insights.</p>
            <div className="relative">
               <input 
                 type="email" 
                 placeholder="Email address"
                 className="w-full bg-violet-500/5 border border-violet-500/20 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-violet-500 transition-colors"
               />
               <button className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-colors">
                 Join
               </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-violet-500/10 gap-6">
          <p className="text-[#c4b5fd]/30 text-sm">
            © {new Date().getFullYear()} The Orvion Agency. All rights reserved.
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-[#c4b5fd]/30 hover:text-violet-400 text-xs transition-colors">Privacy Policy</a>
             <a href="#" className="text-[#c4b5fd]/30 hover:text-violet-400 text-xs transition-colors">Terms of Service</a>
             <a href="#" className="text-[#c4b5fd]/30 hover:text-violet-400 text-xs transition-colors">Cookie Policy</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[#c4b5fd]/50 hover:text-white transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Back to top</span>
            <div className="w-8 h-8 rounded-full border border-violet-500/20 flex items-center justify-center group-hover:border-violet-500 group-hover:bg-violet-500/10 transition-all">
               <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Decorative text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02]">
         <h2 className="text-[200px] font-extrabold text-white leading-none whitespace-nowrap">THE ORVION</h2>
      </div>
    </footer>
  );
};

export default Footer;
