import Navigation from '../components/Navigation';
import PremiumHome from '../components/PremiumHome';
import Footer from '../components/Footer';
import SEO from '../components/HelmetConfig';

const Home = () => {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet-500/30">
      <SEO path= "/" />
      <Navigation />
      
      <main>
        <PremiumHome />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
