import Navigation from '../components/Navigation';
import WhyChooseUs from '../components/WhyChooseUs';
import HowWeWork from '../components/HowWeWork';
import Footer from '../components/Footer';

const WhyUsPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
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
