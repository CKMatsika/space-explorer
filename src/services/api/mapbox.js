// src/services/api/mapbox.js
import mapboxgl from 'mapbox-gl';

// Replace with your Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'your_mapbox_access_token_here';

// Initialize mapbox
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Function to create a sky map
export const createSkyMap = (container, coordinates, time = new Date()) => {
  if (!container) return null;
  
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/navigation-night-v1', // Dark style for sky map
    center: coordinates, // [longitude, latitude]
    zoom: 3,
    projection: 'globe' // Use globe projection for sky view
  });
  
  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl());
  
  // Add fullscreen control
  map.addControl(new mapboxgl.FullscreenControl());
  
  // Set the time for the sky
  map.setLight({
    anchor: 'viewport',
    color: '#ffffff',
    intensity: 0.15
  });
  
  return map;
};

// Function to get user's location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

// Function to add stars and constellations to the map
export const addCelestialObjects = (map) => {
  // This would typically load star data from an API or JSON file
  // For now, we'll add some placeholder stars
  
  map.on('load', () => {
    // Add a source for stars
    map.addSource('stars', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          // Add major stars - these would come from your API
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 90] // North Star (Polaris) - approximate
            },
            'properties': {
              'name': 'Polaris (North Star)',
              'magnitude': 2.0
            }
          },
          // Add more stars here
        ]
      }
    });
    
    // Add a layer for stars
    map.addLayer({
      'id': 'stars',
      'type': 'circle',
      'source': 'stars',
      'paint': {
        'circle-radius': ['interpolate', ['linear'], ['get', 'magnitude'], 
          1, 5,  // Brighter stars (lower magnitude) are larger
          6, 1   // Dimmer stars (higher magnitude) are smaller
        ],
        'circle-color': '#ffffff',
        'circle-opacity': 0.8
      }
    });
    
    // Add click event to show information
    map.on('click', 'stars', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.name;
      const magnitude = e.features[0].properties.magnitude;
      
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`<h3>${name}</h3><p>Magnitude: ${magnitude}</p>`)
        .addTo(map);
    });
    
    // Change cursor when hovering over stars
    map.on('mouseenter', 'stars', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'stars', () => {
      map.getCanvas().style.cursor = '';
    });
  });
  
  return map;
};

// Function to adjust the time of the sky
export const adjustSkyTime = (map, time) => {
  // This would set the time of day for the sky
  // For detailed implementation, you would need a specialized astronomy library
  
  const hours = time.getHours();
  const sunPosition = hours > 6 && hours < 18 ? 1.0 : 0.1; // Day vs night
  
  map.setLight({
    intensity: sunPosition
  });
  
  return map;
};

export default {
  createSkyMap,
  getUserLocation,
  addCelestialObjects,
  adjustSkyTime
};