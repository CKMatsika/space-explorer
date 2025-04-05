// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import './styles/Placeholders.scss';

// Import components
import Header from './components/core/Header';
import Navigation from './components/core/Navigation';
import Footer from './components/core/Footer';
import Dashboard from './components/dashboard/Dashboard';
import ApodGallery from './components/dashboard/ApodGallery';
import SkyMap from './components/skymap/SkyMap';
import SolarSystem from './components/solar-system/SolarSystem';
import EventCalendar from './components/calendar/EventCalendar';
import MarsRover from './components/dashboard/MarsRover';
import SpaceNews from './components/news/SpaceNews';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Space theme default is dark

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/apod" element={<ApodGallery />} />
            <Route path="/skymap" element={<SkyMap />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/events" element={<EventCalendar />} />
            <Route path="/mars" element={<MarsRover />} />
            <Route path="/news" element={<SpaceNews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;