import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { performanceImages } from "../constants/index.js"; // 6 side images
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const images = sectionEl.querySelectorAll(".wrapper img.side-image");
    const laptop = sectionEl.querySelector(".laptop");

    const laptopCenterX = sectionEl.offsetWidth / 2;
    const laptopBottomY = sectionEl.offsetHeight * 0.4;

    // Initialize side images
    images.forEach((img) => {
      img.style.position = "absolute";
      img.style.left = `${laptopCenterX}px`;
      img.style.bottom = `${laptopBottomY}px`;
      img.style.transform = "translateX(-50%) scale(1)";
      img.style.opacity = 0;
      img.style.width = "180px"; // slightly larger
      img.style.pointerEvents = "none";
    });

    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      images.forEach((img, i) => {
        const isLeft = i < 3;
        const yOffsets = [120, 0, -120]; // top, middle, bottom
        const xOffset = 300; // horizontal distance
        const scaleFactor = 0.7; // slightly larger

        tl.to(
          img,
          {
            left: isLeft
              ? `${laptopCenterX - xOffset}px`
              : `${laptopCenterX + xOffset}px`,
            bottom: `${laptopBottomY + yOffsets[i % 3]}px`,
            scale: scaleFactor,
            opacity: 1,
            duration: 2,
            ease: "power1.inOut",
          },
          0
        );
      });
    } else {
      gsap.to(images, { opacity: 1, scale: 0.6, duration: 1, stagger: 0.2 });
    }
  }, [isMobile]);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-start"
    >
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Next-level graphics performance. Game on.
      </h2>

      <div className="wrapper relative w-full h-full">
        {/* Central laptop */}
        <img
          src="/laptop.png"
          alt="Laptop"
          className="laptop absolute left-1/2 bottom-[40%] -translate-x-1/2 z-10 w-[400px] max-w-[50%]"
        />

        {/* Side images */}
        {performanceImages.map((item, i) => (
          <img
            key={i}
            src={item.src}
            className={`side-image ${item.id}`}
            alt={item.alt || `Performance Image #${i + 1}`}
          />
        ))}
      </div>

      <div className="content relative z-20 max-w-3xl mx-auto mt-10 text-center text-gray-400">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;