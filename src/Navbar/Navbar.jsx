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
            <div className="nav-group-left">
                <li><Link to="/">Кликни безбедно</Link></li>
                <li><Link to="/about">Што е CyberForge?</Link></li>
                <li><Link to="/services">Зошто безбедност?</Link></li>
            </div>
            <div className="nav-group-right">
                <Link to="/" className="test-btn-link">
                    <button className="home-button">
                        <span>Home</span>
                        <i></i>
                    </button>
                </Link>
                <li><Link to="/aboutus">За нас</Link></li>
            </div>
        </ul>
        </nav>
    );

}

export default Navbar;