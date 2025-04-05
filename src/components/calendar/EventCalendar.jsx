// src/components/calendar/EventCalendar.jsx
import React from 'react';

const EventCalendar = () => {
  return (
    <div className="event-calendar-container">
      <h1>Astronomical Event Calendar</h1>
      <p>This feature is coming soon. Stay tuned!</p>
      
      <div className="placeholder-content">
        <div className="placeholder-card">
          <h2>Upcoming Astronomical Events</h2>
          <p>The calendar will show events like:</p>
          <ul>
            <li>Meteor showers</li>
            <li>Eclipses</li>
            <li>Planetary alignments</li>
            <li>Moon phases</li>
            <li>International Space Station visibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;