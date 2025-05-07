import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you will have a CSS file for styling
import logo from './Adobe_Express_-_file.png'; // Adjust the path to your logo image

function Navbar() {
    return (
        <nav className="navbar">
        <div className="navbar-logo">
            <img src={logo} alt='CyberForge Logo' className='cyber-logo'/>
        </div>
        <ul className="navbar-links">
            <li><Link to="/">Дома</Link></li>
            <li><Link to="/about">Што е CyberForge?</Link></li>
            <li><Link to="/services">Зошто безбедност?</Link></li>
            <li><Link to="/contact">Тестирај</Link></li>
            <li><Link to="/aboutus">За нас</Link></li>  {/* Changed from /contact to /aboutus */}
        </ul>
        </nav>
    );

}

export default Navbar;