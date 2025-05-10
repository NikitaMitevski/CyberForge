import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you will have a CSS file for styling
import logo from './Adobe_Express_-_file.png'; // Adjust the path to your logo image
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'MK', name: 'Македонски' },
        { code: 'EN', name: 'English' },
        { code: 'SQ', name: 'Shqip' }
    ];

    const toggleLanguage = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const selectLanguage = (lang) => {
        setLanguage(lang.code);
        setIsLanguageOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt='CyberForge Logo' className='cyber-logo'/>
            </div>
            <ul className="navbar-links">
                <div className="nav-group-left">
                    <li><Link to="/clicksafe">{t.clickSafe}</Link></li>
                    <li><Link to="/about">{t.whatIs}</Link></li>
                    <li><Link to="/services">{t.whySecurity}</Link></li>
                </div>
                <div className="nav-group-right">
                    <div className="language-selector">
                        <button className="language-button" onClick={toggleLanguage}>
                            <span>{language}</span>
                            <svg className="language-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6"/>
                            </svg>
                        </button>
                        {isLanguageOpen && (
                            <div className="language-dropdown">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`language-option ${language === lang.code ? 'active' : ''}`}
                                        onClick={() => selectLanguage(lang)}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/" className="test-btn-link">
                        <button className="home-button">
                            <svg className="home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <span>{t.home}</span>
                        </button>
                    </Link>
                    <li><Link to="/aboutus">{t.aboutUs}</Link></li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;