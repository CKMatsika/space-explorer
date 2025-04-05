// src/components/dashboard/MarsRover.jsx
import React from 'react';

const MarsRover = () => {
  return (
    <div className="mars-rover-container">
      <h1>Mars Rover Photos</h1>
      <p>This feature is coming soon. Stay tuned!</p>
      
      <div className="placeholder-content">
        <div className="placeholder-card">
          <h2>Coming Soon: Mars Exploration</h2>
          <p>You'll be able to:</p>
          <ul>
            <li>Browse the latest images from Mars rovers (Curiosity, Perseverance, etc.)</li>
            <li>Filter by rover, camera, and date</li>
            <li>Learn about the Martian landscape</li>
            <li>See where photos were taken on the Martian surface</li>
            <li>Discover the history of Mars exploration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarsRover;