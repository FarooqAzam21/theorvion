import Navigation from '../components/Navigation';
import PremiumHome from '../components/PremiumHome';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet-500/30">
      <Navigation />
      
      <main>
        <PremiumHome />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
