import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet-500/30">
      <Navigation />
      
      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
