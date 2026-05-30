import Navigation from '../components/Navigation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/HelmetConfig';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
      <SEO path= "/contact" />  
      <Navigation />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
