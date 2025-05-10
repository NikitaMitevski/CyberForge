import React, { useRef, useEffect, useMemo } from "react";
import Globe from "globe.gl";
import './GlobeSection.css';

const GlobeSection = () => {
  const globeEl = useRef();
  
  // Memoize the shield ring data to prevent unnecessary recreations
  const shieldRing = useMemo(() => ({
    lat: 31.8,
    lng: 35.2,
    maxRadius: 180,
    propagationSpeed: 20,
    repeatPeriod: 2000
  }), []);

  useEffect(() => {
    let globe;
    let animationFrameId;

    const initGlobe = () => {
      globe = Globe()(globeEl.current)
        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('#3a228a')
        .atmosphereAltitude(0.25)
        .width(window.innerWidth * 2.2)
        .height(window.innerHeight * 1.2)
        .ringsData([shieldRing])
        .ringColor(() => 'lightblue')
        .ringMaxRadius('maxRadius')
        .ringAltitude(0.25)
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod');

      // Optimize controls
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableZoom = false;
      globe.controls().dampingFactor = 0.25; // Add damping for smoother rotation
      globe.renderer().setClearColor(0x000000, 0);
      
      // Optimize rendering
      globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
      globe.renderer().powerPreference = 'high-performance';
    };

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (globe) {
          globe
            .width(window.innerWidth * 2.2)
            .height(window.innerHeight * 1.2);
        }
      }, 250); // Debounce resize events
    };

    initGlobe();
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (globe) {
        globe._destructor();
      }
      if (globeEl.current) {
        globeEl.current.innerHTML = '';
      }
    };
  }, [shieldRing]); // Only re-run if shieldRing changes

  return (
    <div
      ref={globeEl}
      className="globe-section-container"
    />
  );
};

export default React.memo(GlobeSection); // Memoize the component