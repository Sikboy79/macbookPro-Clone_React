import React from "react";
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StudioLights from "./three/StudioLights.jsx";
import ModelSwitcher from "./three/ModelSwitcher.jsx";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacbookStore();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <section
  id="product-viewer"
  className="relative w-full h-[80vh] flex flex-col items-center justify-start"
>
  <h2 className="text-3xl font-bold text-white mt-5">Take a closer look</h2>

  <div className="controls z-10 mt-5 flex flex-col items-center gap-5">
    <div className="flex-center gap-5">
      {/* Color controls */}
      <div className="color-control flex gap-2">
        <div
          onClick={() => setColor("#adb5bd")}
          className={clsx(
            "w-6 h-6 rounded-full cursor-pointer bg-neutral-300",
            color === "#adb5bd" && "ring-2 ring-white"
          )}
        />
        <div
          onClick={() => setColor("#2e2c2e")}
          className={clsx(
            "w-6 h-6 rounded-full cursor-pointer bg-neutral-800",
            color === "#2e2c2e" && "ring-2 ring-white"
          )}
        />
      </div>

      {/* Size controls */}
      <div className="size-control flex gap-2">
        <div
          onClick={() => setScale(0.06)}
          className={clsx(
            "px-3 py-1 rounded cursor-pointer",
            scale === 0.06
              ? "bg-white text-black"
              : "bg-transparent text-white border border-gray-500"
          )}
        >
          14"
        </div>
        <div
          onClick={() => setScale(0.08)}
          className={clsx(
            "px-3 py-1 rounded cursor-pointer",
            scale === 0.08
              ? "bg-white text-black"
              : "bg-transparent text-white border border-gray-500"
          )}
        >
          16"
        </div>
      </div>
    </div>
  </div>

  <Canvas
    id="canvas"
    className="w-full h-full"
    camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
  >
    <StudioLights />
    <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
    <OrbitControls enablePan={false} enableZoom={true} />
  </Canvas>
</section>
  );
};

export default ProductViewer;
