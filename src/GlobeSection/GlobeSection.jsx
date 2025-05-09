import React, { useRef, useEffect } from "react";
import Globe from "globe.gl";
import './GlobeSection.css';

const shieldRing = {
  lat: 31.8,
  lng: 35.2,
  maxRadius: 180,
  propagationSpeed: 20,
  repeatPeriod: 2000
};

const GlobeSection = () => {
  const globeEl = useRef();

  useEffect(() => {
    const globe = Globe()(globeEl.current)
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

    const handleResize = () => {
      globe
        .width(window.innerWidth * 2.2)
        .height(window.innerHeight * 1.2);
    };

    window.addEventListener('resize', handleResize);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    globe.controls().enableZoom = false;
    globe.renderer().setClearColor(0x000000, 0);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeEl.current) {
        globeEl.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={globeEl}
      className="globe-section-container"
    />
  );
};

export default GlobeSection;