import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-void text-white">
      <Helmet>
        <title>{`${service.title} | The Orvion`}</title>
        <meta name="description" content={service.description} />
        <meta name="keywords" content={`${service.title.toLowerCase()}, web development, ai integration, orvion services`} />
        <link rel="canonical" href={`https://www.theorvion.io/services/${service.id}`} />
        <meta property="og:title" content={`${service.title} | The Orvion`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={`https://www.theorvion.io/services/${service.id}`} />
      </Helmet>
      <Navigation />
      
      <main className="pt-32 pb-20 px-5 sm:px-8 max-w-5xl mx-auto min-h-[80vh]">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div 
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ background: `radial-gradient(circle, ${service.glow}, transparent)` }}
          />
          
          <div className="relative z-10">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-8 shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-sora mb-6">{service.title}</h1>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {service.tags.map((tag) => (
                <span key={tag} className="text-sm px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-[#c4b5fd]/80 leading-relaxed mb-8">
                {service.description}
              </p>
              
              <h2 className="text-2xl font-semibold font-sora mb-4 text-white">Service Overview</h2>
              <p className="text-[#c4b5fd]/70 leading-relaxed mb-10">
                {service.details}
              </p>

              <div className="bg-[#0c051a] border border-violet-500/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold font-sora mb-6 text-white">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.tags.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                      <span className="text-[#c4b5fd]/80">{feature} Integration & Strategy</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span className="text-[#c4b5fd]/80">Dedicated Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span className="text-[#c4b5fd]/80">Customized Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary justify-center">
                Get Started with {service.title}
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
