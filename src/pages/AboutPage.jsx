import Navigation from '../components/Navigation';
import About from '../components/About';
import Footer from '../components/Footer';
import SEO from '../components/HelmetConfig';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
      <SEO path= "/about" />
      <Navigation />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;