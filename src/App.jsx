import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import About from './About/About';
import Services from './Services/Services';
import Contact from './Contact/Contact';
import AboutUs from './AboutUs/AboutUs';
import ClickSafe from './ClickSafe/ClickSafe';
import GlobeSection from './GlobeSection/GlobeSection'; // Adjust the path if needed
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const handleThemeToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDarkTheme(prev => !prev);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="app-container">
          <button 
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/clicksafe" element={<ClickSafe />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
