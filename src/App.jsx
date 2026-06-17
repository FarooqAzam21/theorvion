import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/chat/ChatWidget';
import './index.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const BlogListing = lazy(() => import('./pages/BlogListing'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Stylized loading fallback to keep with the site's dark premium aesthetic
const PageLoader = () => (
  <div className="min-h-screen bg-void text-white flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-400 font-medium tracking-wider uppercase font-sora">Loading Orvion...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="relative">
        <CustomCursor />
        <ChatWidget />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            <Route path="/blog" element={<BlogListing />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="*" element={<Home />} /> 
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
