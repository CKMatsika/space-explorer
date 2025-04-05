// src/components/core/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.scss';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position to add/remove shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="12" r="10" fill="#0B3D91" />
              <circle cx="12" cy="12" r="3" fill="#FFD700" />
              <ellipse cx="12" cy="12" rx="7" ry="3" fill="transparent" stroke="#FFD700" strokeWidth="1" />
              <ellipse cx="12" cy="12" rx="7" ry="3" fill="transparent" stroke="#FFD700" strokeWidth="1" transform="rotate(60,12,12)" />
              <ellipse cx="12" cy="12" rx="7" ry="3" fill="transparent" stroke="#FFD700" strokeWidth="1" transform="rotate(120,12,12)" />
            </svg>
          </div>
          <span className="logo-text">Space Explorer</span>
        </Link>
        
        <div className="header-actions">
          <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="header-button">
            NASA API
          </a>
          
          <a href="https://github.com/yourusername/space-explorer" target="_blank" rel="noopener noreferrer" className="header-button">
            GitHub
          </a>
          
          <button className="theme-toggle">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#FFD700"
                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20V4Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;