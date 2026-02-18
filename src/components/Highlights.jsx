import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlightsData = [
  {
    img: "/laptop.png",
    title: "Fly through demanding tasks",
    subtitle: "up to 9.8x faster",
    column: "left",
  },
  {
    img: "/sun.png",
    title: "A stunning",
    subtitle: "Liquid Retina display",
    column: "left",
  },
  {
    img: "/ai.png",
    title: "Built for",
    subtitle: "Apple Intelligence",
    column: "right",
    gradient: true,
  },
  {
    img: "/battery.png",
    title: "Up to",
    subtitle: "14 more hours battery life",
    extra: "(up to 24 hours total.)",
    column: "right",
  },
];

const Highlights = () => {
  const highlightsRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    if (!highlightsRef.current) return;

    const left = highlightsRef.current.querySelectorAll(".left-column > div");
    const right = highlightsRef.current.querySelectorAll(".right-column > div");

    // Start slightly lower and invisible
    gsap.set([...left, ...right], { y: 50, x: 0, opacity: 0 });

    // Fade in sooner + subtle horizontal movement
    gsap.to([...left, ...right], {
      scrollTrigger: {
        trigger: highlightsRef.current,
        start: "top 80%", // fade in sooner
        end: "bottom top",
        scrub: true,
      },
      y: 0,
      x: (i) => (i % 2 === 0 ? -20 : 20), // subtle left/right shift
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: "power1.out",
    });
  }, [isMobile]);

  return (
    <section
      id="highlights"
      ref={highlightsRef}
      className="relative w-full min-h-screen bg-black text-white px-5 py-20"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          There's never been a better time to upgrade.
        </h2>
        <h3 className="text-xl text-gray-400">
          Here's what you get with the new Macbook Pro.
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="left-column flex flex-col gap-8">
          {highlightsData
            .filter((item) => item.column === "left")
            .map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-32 md:w-40 mb-4"
                />
                <p className="text-lg md:text-xl">
                  {item.title} <span className="font-semibold">{item.subtitle}</span>
                </p>
              </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="right-column flex flex-col gap-8">
          {highlightsData
            .filter((item) => item.column === "right")
            .map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-4 rounded-lg ${
                  item.gradient ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-32 md:w-40 mb-4"
                />
                <p className="text-lg md:text-xl">
                  {item.title} <span className="font-semibold">{item.subtitle}</span>{" "}
                  {item.extra && <span className="text-gray-400">{item.extra}</span>}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
