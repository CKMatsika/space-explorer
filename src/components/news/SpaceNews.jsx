// src/components/news/SpaceNews.jsx
import React from 'react';

const SpaceNews = () => {
  return (
    <div className="space-news-container">
      <h1>Space News</h1>
      <p>This feature is coming soon. Stay tuned!</p>
      
      <div className="placeholder-content">
        <div className="placeholder-card">
          <h2>Coming Soon: Latest Space News</h2>
          <p>This section will include:</p>
          <ul>
            <li>Latest news from space agencies (NASA, ESA, JAXA, etc.)</li>
            <li>Updates on current and upcoming space missions</li>
            <li>New astronomical discoveries</li>
            <li>Advances in space technology</li>
            <li>Categorized news by topic (exploration, astronomy, technology)</li>
            <li>Significance explainers to understand why discoveries matter</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpaceNews;