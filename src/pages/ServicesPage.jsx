import Navigation from '../components/Navigation';
import Services from '../components/Services';
import Footer from '../components/Footer';
import SEO from '../components/HelmetConfig';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
      <SEO path= "/services" />
      <Navigation />
      <div className="pt-24">
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
