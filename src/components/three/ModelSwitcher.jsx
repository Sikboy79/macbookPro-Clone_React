import { PresentationControls } from "@react-three/drei";
import React, { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";

const ModelSwitcher = ({ scale, isMobile }) => {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI, Math.PI],
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <PresentationControls {...controlsConfig}>
      {showLargeMacbook ? (
        <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
      ) : (
        <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
      )}
    </PresentationControls>
  );
};

export default ModelSwitcher;
