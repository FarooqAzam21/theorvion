import { motion } from 'framer-motion';
import { Mail, Share2, GitFork } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & Lead Architect',
      bio: 'Former Google engineer with 10+ years building scalable systems. Passionate about AI and cloud infrastructure.',
      expertise: ['System Design', 'Cloud Architecture', 'AI/ML', 'DevOps'],
      image: '👨‍💻',
      social: { linkedin: '#', github: '#', email: 'alex@orvion.com' }
    },
    {
      name: 'Sarah Williams',
      role: 'Lead Product Designer',
      bio: 'Award-winning designer from Stripe. Expert in conversion optimization and user experience.',
      expertise: ['UI/UX Design', 'CRO', 'Design Systems', 'User Research'],
      image: '👩‍🎨',
      social: { linkedin: '#', github: '#', email: 'sarah@orvion.com' }
    },
    {
      name: 'Michael Rodriguez',
      role: 'Engineering Lead',
      bio: 'Full-stack engineer passionate about clean code and scalable architectures.',
      expertise: ['React', 'Node.js', 'Database Design', 'Performance'],
      image: '👨‍💼',
      social: { linkedin: '#', github: '#', email: 'michael@orvion.com' }
    },
    {
      name: 'Emma Johnson',
      role: 'AI/ML Specialist',
      bio: 'ML engineer with expertise in LLMs, transformers, and production AI systems.',
      expertise: ['LLMs', 'ML Ops', 'AI Integration', 'Data Science'],
      image: '👩‍🔬',
      social: { linkedin: '#', github: '#', email: 'emma@orvion.com' }
    },
    {
      name: 'James Park',
      role: 'DevOps & Infrastructure',
      bio: 'Kubernetes expert with deep experience in cloud infrastructure and CI/CD.',
      expertise: ['Kubernetes', 'AWS', 'Infrastructure as Code', 'Monitoring'],
      image: '👨‍💻',
      social: { linkedin: '#', github: '#', email: 'james@orvion.com' }
    },
    {
      name: 'Lisa Thompson',
      role: 'Project Manager',
      bio: 'Certified Scrum Master keeping projects on track and teams aligned.',
      expertise: ['Agile', 'Project Management', 'Stakeholder Communication', 'Strategy'],
      image: '👩‍💼',
      social: { linkedin: '#', github: '#', email: 'lisa@orvion.com' }
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
            <span className="text-xs font-semibold text-violet-300">Team</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sora text-white mb-5">
            Meet Our <span className="gradient-text">Exceptional Team</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            World-class engineers, designers, and strategists united by a passion for building extraordinary digital products.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-violet-500/[0.02] border border-violet-500/10 hover:border-violet-500/30 transition-all duration-500 overflow-hidden h-full flex flex-col"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%)'
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Avatar & Role Badge */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {member.image}
                    </div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
                      {member.role.split(' ')[0]}
                    </span>
                  </div>

                  {/* Name & Info */}
                  <h3 className="text-xl font-bold font-sora text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-violet-400 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-white/60 mb-6 leading-relaxed flex-1">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-6 border-t border-violet-500/10">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full bg-violet-500/10 text-xs text-violet-300/80 border border-violet-500/15">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a href={member.social.email} className="p-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                    <a href={member.social.linkedin} className="p-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </a>
                    <a href={member.social.github} className="p-2 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors">
                      <GitFork className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-4 gap-6 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-violet-500/10 to-purple-500/5 border border-violet-500/20"
        >
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '50+', label: 'Team Members' },
            { value: '150+', label: 'Projects Delivered' },
            { value: '25+', label: 'Countries Served' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Hiring CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-sora text-white mb-4">
            Interested in Joining Orvion?
          </h3>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            We're always looking for talented engineers, designers, and strategists who are passionate about building amazing products.
          </p>
          <a href="mailto:careers@orvion.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30">
            View Open Positions
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Team;
