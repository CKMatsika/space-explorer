// src/components/solar-system/SolarSystem.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../../styles/SolarSystem.scss';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const frameIdRef = useRef(null);
  const planetsRef = useRef({});
  
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  
  // Planet data
  const planets = [
    {
      id: 'mercury',
      name: 'Mercury',
      radius: 0.38, // Size relative to Earth
      distance: 5, // Distance from Sun (not to scale for better visualization)
      rotationSpeed: 0.01,
      orbitalSpeed: 0.04,
      color: '#A9A9A9',
      texture: '/assets/textures/mercury.jpg',
      description: 'Mercury is the smallest and innermost planet in the Solar System. It has no atmosphere to retain heat, causing extreme temperature variations.'
    },
    {
      id: 'venus',
      name: 'Venus',
      radius: 0.95,
      distance: 7,
      rotationSpeed: 0.005,
      orbitalSpeed: 0.015,
      color: '#E6E6FA',
      texture: '/assets/textures/venus.jpg',
      description: 'Venus is the second planet from the Sun. It has a thick atmosphere that traps heat, making it the hottest planet in our solar system.'
    },
    {
      id: 'earth',
      name: 'Earth',
      radius: 1,
      distance: 10,
      rotationSpeed: 0.01,
      orbitalSpeed: 0.01,
      color: '#6495ED',
      texture: '/assets/textures/earth.jpg',
      description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of its surface is covered with water.'
    },
    {
      id: 'mars',
      name: 'Mars',
      radius: 0.53,
      distance: 13,
      rotationSpeed: 0.01,
      orbitalSpeed: 0.008,
      color: '#CD5C5C',
      texture: '/assets/textures/mars.jpg',
      description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often called the "Red Planet" due to its reddish appearance.'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      radius: 11.2,
      distance: 18,
      rotationSpeed: 0.02,
      orbitalSpeed: 0.005,
      color: '#F4A460',
      texture: '/assets/textures/jupiter.jpg',
      description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.'
    },
    {
      id: 'saturn',
      name: 'Saturn',
      radius: 9.45,
      distance: 24,
      rotationSpeed: 0.02,
      orbitalSpeed: 0.003,
      color: '#DEB887',
      texture: '/assets/textures/saturn.jpg',
      hasRings: true,
      description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.'
    },
    {
      id: 'uranus',
      name: 'Uranus',
      radius: 4.0,
      distance: 30,
      rotationSpeed: 0.015,
      orbitalSpeed: 0.002,
      color: '#B0E0E6',
      texture: '/assets/textures/uranus.jpg',
      description: 'Uranus is the seventh planet from the Sun. It has the third-largest diameter in our solar system and is the only planet that rotates on its side.'
    },
    {
      id: 'neptune',
      name: 'Neptune',
      radius: 3.88,
      distance: 35,
      rotationSpeed: 0.015,
      orbitalSpeed: 0.001,
      color: '#5F9EA0',
      texture: '/assets/textures/neptune.jpg',
      description: 'Neptune is the eighth and farthest-known planet from the Sun. It is the fourth-largest planet by diameter and the third-largest by mass. Neptune is 17 times the mass of Earth.'
    }
    ];
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const initialize = () => {
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 50;
      cameraRef.current = camera;
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setClearColor(0x000000);
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 5;
      controls.maxDistance = 100;
      controlsRef.current = controls;
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0x404040, 1);
      scene.add(ambientLight);
      
      // Add point light (Sun)
      const sunLight = new THREE.PointLight(0xFFFFFF, 2, 100);
      sunLight.position.set(0, 0, 0);
      scene.add(sunLight);
      
      // Create Sun
      const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 1
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);
      
      // Create stars (background)
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1
      });
      
      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      
      // Create planets
      planets.forEach(planet => {
        // Create planet mesh
        const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({
          color: planet.color,
          roughness: 0.7,
          metalness: 0.0
        });
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        
        // Create orbit
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: 0x444444,
          transparent: true,
          opacity: 0.3
        });
        
        const orbitPoints = [];
        for (let i = 0; i <= 360; i++) {
          const angle = (i * Math.PI) / 180;
          const x = planet.distance * Math.cos(angle);
          const z = planet.distance * Math.sin(angle);
          orbitPoints.push(x, 0, z);
        }
        
        orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
        const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        scene.add(orbit);
        
        // Create planet orbit group
        const planetOrbit = new THREE.Group();
        planetOrbit.add(planetMesh);
        
        // Position planet
        planetMesh.position.x = planet.distance;
        
        // Add rings for Saturn
        if (planet.hasRings) {
          const ringGeometry = new THREE.RingGeometry(planet.radius + 0.5, planet.radius + 2, 32);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xA29B7C,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          planetOrbit.add(ring);
          ring.position.x = planet.distance;
        }
        
        scene.add(planetOrbit);
        
        // Store reference to planet objects
        planetsRef.current[planet.id] = {
          planet: planetMesh,
          orbitGroup: planetOrbit,
          data: planet
        };
      });
      
      setSceneReady(true);
      setIsLoading(false);
    };
    
    initialize();
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Rotate planets and move them around their orbits
      if (sceneReady) {
        Object.values(planetsRef.current).forEach(({ planet, orbitGroup, data }) => {
          // Rotate planet around its axis
          planet.rotation.y += data.rotationSpeed;
          
          // Rotate planet around the Sun
          orbitGroup.rotation.y += data.orbitalSpeed;
        });
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && mountRef.current) {
        cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);
  
  // Handle planet selection
  const handlePlanetSelect = (planetId) => {
    setSelectedPlanet(planets.find(p => p.id === planetId));
    
    // Focus camera on selected planet
    if (planetsRef.current[planetId] && cameraRef.current && controlsRef.current) {
      const planetObj = planetsRef.current[planetId];
      const planetWorldPos = new THREE.Vector3();
      planetObj.planet.getWorldPosition(planetWorldPos);
      
      // Animate camera to focus on the planet
      const distanceFactor = planetObj.data.radius * 5 + 5;
      
      // Target position that is somewhat offset from the planet
      const targetPosition = new THREE.Vector3(
        planetWorldPos.x + distanceFactor,
        planetWorldPos.y + distanceFactor / 2,
        planetWorldPos.z + distanceFactor
      );
      
      // Set camera position and update controls target
      cameraRef.current.position.copy(targetPosition);
      controlsRef.current.target.copy(planetWorldPos);
      controlsRef.current.update();
    }
  };
  
  // Handle reset view
  const handleResetView = () => {
    setSelectedPlanet(null);
    
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 20, 50);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };
  
  return (
    <div className="solar-system-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Creating the cosmos...</p>
        </div>
      )}
      
      <div className="solar-system" ref={mountRef}></div>
      
      <div className="controls-panel">
        <h2>Solar System Explorer</h2>
        <p>Click on a planet to learn more about it, or use your mouse to navigate the view.</p>
        
        <div className="planet-buttons">
          {planets.map((planet) => (
            <button
              key={planet.id}
              className={`planet-button ${selectedPlanet?.id === planet.id ? 'selected' : ''}`}
              onClick={() => handlePlanetSelect(planet.id)}
              style={{ backgroundColor: planet.color }}
            >
              {planet.name}
            </button>
          ))}
          <button className="reset-button" onClick={handleResetView}>
            Reset View
          </button>
        </div>
      </div>
      
      {selectedPlanet && (
        <div className="planet-info-panel">
          <h3>{selectedPlanet.name}</h3>
          <p>{selectedPlanet.description}</p>
          <div className="planet-facts">
            <div className="fact">
              <span className="fact-label">Relative Size:</span>
              <span className="fact-value">{selectedPlanet.radius}x Earth</span>
            </div>
            <div className="fact">
              <span className="fact-label">Distance from Sun:</span>
              <span className="fact-value">{selectedPlanet.distance} units</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarSystem;