// src/services/api/nasa.js

import axios from 'axios';

// Replace with your NASA API key - you can get one at https://api.nasa.gov/
const NASA_API_KEY = 'DEMO_KEY'; // Use DEMO_KEY for development or get your own key
const NASA_API_URL = 'https://api.nasa.gov';

// Create axios instance for NASA API
const nasaApi = axios.create({
  baseURL: NASA_API_URL,
  params: {
    api_key: NASA_API_KEY
  }
});

// Astronomy Picture of the Day
export const getApod = async (date = null) => {
  try {
    const params = date ? { date } : {};
    const response = await nasaApi.get('/planetary/apod', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw error;
  }
};

// Get a range of APOD images
export const getApodRange = async (startDate, endDate) => {
  try {
    const response = await nasaApi.get('/planetary/apod', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD range:', error);
    throw error;
  }
};

// Mars Rover Photos
export const getMarsRoverPhotos = async (rover = 'curiosity', earthDate = null, camera = null) => {
  try {
    const params = {};
    if (earthDate) params.earth_date = earthDate;
    if (camera) params.camera = camera;
    
    const response = await nasaApi.get(`/mars-photos/api/v1/rovers/${rover}/photos`, { params });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
    throw error;
  }
};

// Earth imagery
export const getEarthImagery = async (lat, lon, date = null) => {
  try {
    const params = { lat, lon };
    if (date) params.date = date;
    
    const response = await nasaApi.get('/planetary/earth/imagery', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching Earth imagery:', error);
    throw error;
  }
};

// NASA Image and Video Library search
export const searchNasaLibrary = async (query, mediaType = 'image') => {
  try {
    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: {
        q: query,
        media_type: mediaType
      }
    });
    return response.data.collection.items;
  } catch (error) {
    console.error('Error searching NASA library:', error);
    throw error;
  }
};

export default {
  getApod,
  getApodRange,
  getMarsRoverPhotos,
  getEarthImagery,
  searchNasaLibrary
};