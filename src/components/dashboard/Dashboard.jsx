// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApod } from '../../services/api/nasa';
import '../../styles/Dashboard.scss';

const Dashboard = () => {
  const [todayApod, setTodayApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch today's APOD
  useEffect(() => {
    const fetchApod = async () => {
      try {
        setLoading(true);
        const data = await getApod();
        setTodayApod(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Astronomy Picture of the Day');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApod();
  }, []);
  
  return (
    <div className="dashboard">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Explore the Wonders of Space</h1>
          <p>
            Discover the universe through interactive visualizations, real-time data,
            and stunning imagery from NASA and other space agencies.
          </p>
          <div className="hero-buttons">
            <Link to="/solar-system" className="btn btn-primary">
              Explore Solar System
            </Link>
            <Link to="/skymap" className="btn btn-secondary">
              View Night Sky
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {!loading && todayApod && todayApod.media_type === 'image' && (
            <img src={todayApod.url} alt={todayApod.title} />
          )}
        </div>
      </section>
      
      <section className="features-section">
        <h2>Discover the Universe</h2>
        
        <div className="feature-cards">
          <Link to="/apod" className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#FFD700"
                  d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
                />
              </svg>
            </div>
            <h3>Astronomy Picture of the Day</h3>
            <p>
              Explore NASA's collection of cosmic wonders with daily images and explanations
              written by astronomers.
            </p>
          </Link>
          
          <Link to="/solar-system" className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#FFD700"
                  d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6.5A5.5,5.5 0 0,0 6.5,12A5.5,5.5 0 0,0 12,17.5A5.5,5.5 0 0,0 17.5,12A5.5,5.5 0 0,0 12,6.5M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
                />
              </svg>
            </div>
            <h3>Solar System Explorer</h3>
            <p>
              Interact with a 3D model of our solar system, with real-time planet positions
              and detailed information about each celestial body.
            </p>
          </Link>
          
          <Link to="/skymap" className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#FFD700"
                  d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
                />
              </svg>
            </div>
            <h3>Interactive Sky Map</h3>
            <p>
              Observe the night sky in real-time based on your location. Identify stars,
              planets, and constellations visible tonight.
            </p>
          </Link>
          
          <Link to="/mars" className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#FFD700"
                  d="M12,2A9.91,9.91 0 0,0 2.09,11.9C2.09,16.5 5.5,19.69 6.34,20.43C6.58,20.64 7,20.5 7,20.24V18.97C7,18.74 6.84,18.53 6.62,18.44C6.34,18.32 5.11,17.24 5.11,14.83C5.11,14.25 4.72,14 4.41,13.71C4.07,13.42 3.53,12.28 5.11,12.03C6.7,11.77 7.14,13.34 7.14,13.34C7.14,13.34 7.39,13.1 7.46,11.21C7.5,10.08 7,9.25 8.58,9C10.18,8.78 11.07,11 11.07,11C11.07,11 12.68,8.88 14.62,10.38C16.57,11.88 14.5,15.12 14.5,15.12C14.5,15.12 15.41,15.44 15.81,16.7C16.22,17.97 14.67,19.1 14.67,19.1C14.67,19.1 15.95,19.91 17.38,19.31C18.5,18.84 20.73,16.82 20.73,12.91C20.73,9.39 18,4.18 12.5,4.18C7,4.18 3.18,9.95 3.18,11.91C3.18,13.87 4.28,17.17 8.58,17.17C10.31,17.17 10.83,16.95 10.83,16.95C11.17,16.91 11.61,16.97 12,16.47C12.26,16.1 11.72,15.53 11.35,15.3C11.19,15.22 10.07,15.04 10,13.92C9.93,12.8 11.73,12.91 11.73,12.91C11.73,12.91 13.86,12.63 13.86,10.37C13.86,8.12 11.96,8.19 11.73,8.21C11.5,8.23 10.39,8.31 9.42,8.31C8.44,8.31 5.58,7.66 5.58,5.33C5.58,3 9.77,2.5 9.77,2.5C9.77,2.5 5.58,2.39 5.58,5.9S10.55,10.36 11.69,10.36C12.83,10.36 14.13,9.92 14.1,8.14C14.03,6.36 12.88,6.08 12.88,6.08C12.88,6.08 13.91,8.46 11.77,8.46C9.74,8.46 7.61,7.75 7.61,5.94C7.61,4.13 9.13,3.75 9.13,3.75C9.13,3.75 8.46,3.53 8,3.42C7.49,3.29 6.67,3.06 6.67,2.25C6.67,1.44 7.95,1.25 7.95,1.25C7.95,1.25 2.2,1.81 2.2,9.5C2.2,9.5 2.09,12.14 2.09,12.54C2.09,14.03 2.96,20.23 8.33,20.97C13.7,21.71 16.26,19.07 16.26,19.07C16.26,19.07 16.83,20 17.88,20C18.94,20 19.11,18.97 19.11,18.97C19.11,18.97 19.28,20 20.5,20C21.72,20 21.92,18.97 21.92,18.97V12.91C21.92,12.91 22,2 12,2Z"
                />
              </svg>
            </div>
            <h3>Mars Rover Photos</h3>
            <p>
              Browse the latest images from Mars rovers and learn about the Martian
              landscape and ongoing exploration missions.
            </p>
          </Link>
          
          <Link to="/events" className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#FFD700"
                  d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
                />
              </svg>
            </div>
            <h3>Astronomical Events</h3>
            <p>
              Keep track of upcoming celestial events including meteor showers, eclipses,
              and planetary alignments visible from your location.
            </p>
          </Link>
          
          <Link to="/news" className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  fill="#FFD700"
                  d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z"
                />
              </svg>
            </div>
            <h3>Space News</h3>
            <p>
              Stay updated with the latest developments in space exploration, astronomy
              discoveries, and mission updates from around the world.
            </p>
          </Link>
        </div>
      </section>
      
      <section className="apod-preview">
        <div className="apod-header">
          <h2>Today's Astronomy Picture of the Day</h2>
          <Link to="/apod" className="view-more">View Gallery</Link>
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
            <span>Loading cosmic content...</span>
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : todayApod ? (
          <div className="apod-card">
            <div className="apod-image-container">
              {todayApod.media_type === 'image' ? (
                <img
                  src={todayApod.url}
                  alt={todayApod.title}
                  className="apod-image"
                />
              ) : todayApod.media_type === 'video' ? (
                <iframe
                  src={todayApod.url}
                  title={todayApod.title}
                  allowFullScreen
                  className="apod-video"
                ></iframe>
              ) : (
                <div className="apod-placeholder">Media not available</div>
              )}
            </div>
            <div className="apod-info">
              <h3>{todayApod.title}</h3>
              <div className="apod-date">{new Date().toLocaleDateString()}</div>
              <p className="apod-explanation">
                {todayApod.explanation.length > 300
                  ? `${todayApod.explanation.substring(0, 300)}...`
                  : todayApod.explanation}
              </p>
              <Link to="/apod" className="btn btn-primary">View Full Details</Link>
            </div>
          </div>
        ) : (
          <div className="no-data">No astronomy picture available today.</div>
        )}
      </section>
      
      <section className="quick-links-section">
        <h2>Quick Access</h2>
        <div className="quick-links">
          <div className="quick-link-card">
            <h3>Space Weather</h3>
            <p>Current solar activity and aurora forecasts.</p>
            <button className="btn btn-secondary">Coming Soon</button>
          </div>
          
          <div className="quick-link-card">
            <h3>What's Visible Tonight?</h3>
            <p>Check what planets and stars are visible from your location tonight.</p>
            <Link to="/skymap" className="btn btn-primary">Check Sky Map</Link>
          </div>
          
          <div className="quick-link-card">
            <h3>Latest Mars Images</h3>
            <p>The newest photos from Mars rovers.</p>
            <Link to="/mars" className="btn btn-primary">View Images</Link>
          </div>
        </div>
      </section>
      
      <section className="education-section">
        <div className="education-content">
          <h2>Learn About Space</h2>
          <p>Expand your knowledge of astronomy and space exploration through our educational resources.</p>
          <div className="education-buttons">
            <button className="btn btn-secondary">Interactive Tutorials</button>
            <button className="btn btn-secondary">Space Quiz</button>
          </div>
        </div>
        <div className="star-field-background"></div>
      </section>
    </div>
  );
};

export default Dashboard;