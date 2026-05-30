import Navigation from '../components/Navigation';
import WhyChooseUs from '../components/WhyChooseUs';
import HowWeWork from '../components/HowWeWork';
import Footer from '../components/Footer';
import SEO from '../components/HelmetConfig';

const WhyUsPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
      <SEO path= "/why-us" />
      <Navigation />
      <div className="pt-24">
        <WhyChooseUs />
        <HowWeWork />
      </div>
      <Footer />
    </div>
  );
};

export default WhyUsPage;
