import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import StudioLights from "./three/StudioLights";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import { Html } from "@react-three/drei";
import useMacbookStore from "../store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  // preload videos
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");
      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });
      v.load();
    });
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      const modelTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#f-canvas",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    features.forEach((feature, idx) => {
      timeline
        .call(() => setTexture(feature.videoPath))
        .to(`.box${idx + 1}`, { opacity: 1, y: 0, duration: 1 });
    });
  }, [setTexture]);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html center>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative w-full min-h-screen bg-black">
      {/* Heading */}
      <div className="text-center pt-20 pb-10">
        <h2 className="text-4xl font-bold text-white">See it all in a new light.</h2>
      </div>

      {/* 3D Canvas */}
      <Canvas
        id="f-canvas"
        camera={{ position: [0, 2, 5], fov: 50 }}
        className="w-full h-[70vh]"
      >
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      {/* Overlay Feature Boxes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto px-5 h-full flex flex-col justify-center gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={clsx(
                "box opacity-0 transform translate-y-6 transition-all duration-700",
                `box${index + 1}`,
                feature.styles
              )}
            >
              <div className="flex items-center gap-4">
                <img src={feature.icon} alt={feature.highlight} className="w-12 h-12" />
                <div>
                  <p className="text-white font-semibold">{feature.highlight}</p>
                  <p className="text-gray-400">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
