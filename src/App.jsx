import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import ContactPage from './pages/ContactPage';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/chat/ChatWidget';
import './index.css';

function App() {
  return (
    <Router>
      <div className="relative">
        <CustomCursor />
        <ChatWidget />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
