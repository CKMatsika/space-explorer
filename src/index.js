// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.scss';
import App from './App';

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);