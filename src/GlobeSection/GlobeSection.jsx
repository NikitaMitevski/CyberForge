import React, { useRef, useEffect } from "react";
import Globe from "globe.gl";
import './GlobeSection.css';

const GlobeSection = () => {
  const globeEl = useRef();

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor('rgba(0,0,0,0)') // transparent background
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .width(600) // adjust as needed
      .height(600);

    // Optional: auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // Remove background from renderer
    globe.renderer().setClearColor(0x000000, 0); // transparent

    return () => {
      // Clean up on unmount
      globeEl.current.innerHTML = '';
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
