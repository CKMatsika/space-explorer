// src/components/dashboard/ApodGallery.jsx
import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { getApod, getApodRange } from '../../services/api/nasa';
import '../../styles/ApodGallery.scss';

const ApodGallery = () => {
  const [currentApod, setCurrentApod] = useState(null);
  const [recentApods, setRecentApods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch today's APOD
  useEffect(() => {
    const fetchApod = async () => {
      try {
        setLoading(true);
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const data = await getApod(formattedDate);
        setCurrentApod(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Astronomy Picture of the Day');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, [selectedDate]);

  // Fetch recent APODs for the gallery
  useEffect(() => {
    const fetchRecentApods = async () => {
      try {
        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);
        
        const startDate = format(thirtyDaysAgo, 'yyyy-MM-dd');
        const endDate = format(subDays(today, 1), 'yyyy-MM-dd');
        
        const data = await getApodRange(startDate, endDate);
        setRecentApods(data);
      } catch (err) {
        console.error('Failed to load recent APOD images:', err);
      }
    };

    fetchRecentApods();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleThumbnailClick = (date) => {
    setSelectedDate(new Date(date));
  };

  if (loading) {
    return (
      <div className="apod-container loading">
        <div className="loader">Loading cosmic wonders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apod-container error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="apod-gallery">
      <h1>Astronomy Picture of the Day</h1>
      
      <div className="date-selector">
        <label htmlFor="apod-date">Select Date: </label>
        <input
          type="date"
          id="apod-date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={handleDateChange}
          max={format(new Date(), 'yyyy-MM-dd')}
        />
      </div>

      {currentApod && (
        <div className="apod-feature">
          <h2>{currentApod.title}</h2>
          <div className="apod-date">{format(selectedDate, 'MMMM d, yyyy')}</div>
          
          {currentApod.media_type === 'image' ? (
            <div className="apod-image-container">
              <img
                src={currentApod.hdurl || currentApod.url}
                alt={currentApod.title}
                className="apod-image"
              />
            </div>
          ) : currentApod.media_type === 'video' ? (
            <div className="apod-video-container">
              <iframe
                src={currentApod.url}
                title={currentApod.title}
                allowFullScreen
                className="apod-video"
              ></iframe>
            </div>
          ) : (
            <div className="apod-unsupported">
              This media type is not supported.
            </div>
          )}
          
          <div className="apod-details">
            <div className="apod-copyright">
              {currentApod.copyright ? `© ${currentApod.copyright}` : 'Public Domain'}
            </div>
            <div className="apod-explanation">{currentApod.explanation}</div>
          </div>
        </div>
      )}

      <div className="recent-apods">
        <h3>Recent Cosmic Wonders</h3>
        <div className="apod-thumbnails">
          {recentApods.map((apod) => (
            <div
              key={apod.date}
              className="apod-thumbnail"
              onClick={() => handleThumbnailClick(apod.date)}
            >
              <img
                src={apod.url}
                alt={apod.title}
                className={selectedDate.toISOString().split('T')[0] === apod.date ? 'selected' : ''}
              />
              <div className="thumbnail-date">{format(new Date(apod.date), 'MMM d')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApodGallery;