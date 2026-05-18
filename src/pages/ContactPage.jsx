import Navigation from '../components/Navigation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-void text-white">
      <Navigation />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
