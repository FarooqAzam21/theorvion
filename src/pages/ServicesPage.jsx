import Navigation from '../components/Navigation';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
      <Navigation />
      <div className="pt-24">
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
