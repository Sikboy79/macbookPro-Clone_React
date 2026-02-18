import { useEffect, useRef } from "react";
import { features } from "../constants";
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const macbookRef = useRef(null);

  useEffect(() => {
    // Animate MacBook image on scroll
    if (macbookRef.current) {
      gsap.to(macbookRef.current, {
        scrollTrigger: {
          trigger: "#f-image",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
        y: -30,
        scale: 1.05,
        ease: "power1.out",
      });
    }

    // Fade in feature boxes based on scroll progress
    features.forEach((feature, idx) => {
      gsap.fromTo(
        `.box${idx + 1}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: "#f-image",
            start: `top+=${idx * 50} center`, // stagger by scroll position
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section id="features" className="relative w-full min-h-screen bg-black">
      {/* Heading */}
      <div className="text-center pt-20 pb-10">
        <h2 className="text-4xl font-bold text-white">
          See it all in a new light.
        </h2>
      </div>

      {/* MacBook Image */}
      <div
        id="f-image"
        className="w-[90%] top-20 flex justify-end mb-20 relative"
      >
        <img
          ref={macbookRef}
          src="/performance5.jpg"
          alt="MacBook"
          className="w-[600px] max-w-full"
        />
      </div>

      {/* Feature Boxes Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto px-5 h-full flex flex-col justify-center gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={clsx(
                "box opacity-0 transform translate-y-6",
                `box${index + 1}`,
                feature.styles
              )}
            >
              <div className="flex items-center gap-4">
                <img
                  src={feature.icon}
                  alt={feature.highlight}
                  className="w-12 h-12"
                />
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
