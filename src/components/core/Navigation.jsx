// src/components/core/Navigation.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.scss';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
              </svg>
              Dashboard
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/apod" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M4,18V6H20V18H4M6,8H18V16H6V8M7,10V14H17V10" />
              </svg>
              APOD Gallery
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/skymap" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
              </svg>
              Sky Map
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/solar-system" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6.5A5.5,5.5 0 0,0 6.5,12A5.5,5.5 0 0,0 12,17.5A5.5,5.5 0 0,0 17.5,12A5.5,5.5 0 0,0 12,6.5M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
              </svg>
              Solar System
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/events" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
              </svg>
              Events
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/mars" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M15.9,18.45C17.25,18.45 18.35,17.35 18.35,16C18.35,14.65 17.25,13.55 15.9,13.55C14.55,13.55 13.45,14.65 13.45,16C13.45,17.35 14.55,18.45 15.9,18.45M21.1,16.68L22.58,17.84C22.71,17.95 22.75,18.13 22.66,18.29L21.26,20.71C21.17,20.86 21,20.92 20.83,20.86L19.09,20.16C18.73,20.44 18.33,20.67 17.91,20.85L17.64,22.7C17.62,22.87 17.47,23 17.3,23H14.5C14.32,23 14.18,22.87 14.15,22.7L13.89,20.85C13.46,20.67 13.07,20.44 12.71,20.16L10.96,20.86C10.81,20.92 10.62,20.86 10.54,20.71L9.14,18.29C9.05,18.13 9.09,17.95 9.22,17.84L10.7,16.68L10.65,16L10.7,15.31L9.22,14.16C9.09,14.05 9.05,13.86 9.14,13.71L10.54,11.29C10.62,11.13 10.81,11.07 10.96,11.13L12.71,11.84C13.07,11.56 13.46,11.32 13.89,11.15L14.15,9.29C14.18,9.13 14.32,9 14.5,9H17.3C17.47,9 17.62,9.13 17.64,9.29L17.91,11.15C18.33,11.32 18.73,11.56 19.09,11.84L20.83,11.13C21,11.07 21.17,11.13 21.26,11.29L22.66,13.71C22.75,13.86 22.71,14.05 22.58,14.16L21.1,15.31L21.15,16L21.1,16.68M6.69,8.07C7.56,8.07 8.26,7.37 8.26,6.5C8.26,5.63 7.56,4.92 6.69,4.92A1.58,1.58 0 0,0 5.11,6.5C5.11,7.37 5.82,8.07 6.69,8.07M10.03,6.94L11,7.68C11.07,7.75 11.09,7.87 11.03,7.97L10.13,9.53C10.08,9.63 9.96,9.67 9.86,9.63L8.74,9.18L8,9.62L7.81,10.81C7.79,10.92 7.7,11 7.59,11H5.79C5.67,11 5.58,10.92 5.56,10.81L5.4,9.62L4.64,9.18L3.5,9.63C3.41,9.67 3.3,9.63 3.24,9.53L2.34,7.97C2.28,7.87 2.31,7.75 2.39,7.68L3.34,6.94L3.31,6.5L3.34,6.06L2.39,5.32C2.31,5.25 2.28,5.13 2.34,5.03L3.24,3.47C3.3,3.37 3.41,3.33 3.5,3.37L4.63,3.82L5.4,3.38L5.56,2.19C5.58,2.08 5.67,2 5.79,2H7.59C7.7,2 7.79,2.08 7.81,2.19L8,3.38L8.74,3.82L9.86,3.37C9.96,3.33 10.08,3.37 10.13,3.47L11.03,5.03C11.09,5.13 11.07,5.25 11,5.32L10.03,6.06L10.06,6.5L10.03,6.94Z" />
              </svg>
              Mars Rover
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/news" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M20,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V5A2,2 0 0,0 20,3M5,7H19V8H5V7M5,10H19V11H5V10M5,12H13V13H5V12M5,16H17V17H5V16Z" />
              </svg>
              Space News
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;