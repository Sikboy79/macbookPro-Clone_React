import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { performanceImages } from "../constants/index.js"; // 7 images total (6 sides + 1 laptop)
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const sideImages = sectionEl.querySelectorAll(".wrapper img.side-image");
    const laptopCenterX = sectionEl.offsetWidth / 2;
    const laptopBottomY = sectionEl.offsetHeight * 0.4;

    // Initialize side images
    sideImages.forEach((img) => {
      img.style.position = "absolute";
      img.style.left = `${laptopCenterX}px`;
      img.style.bottom = `${laptopBottomY}px`;
      img.style.transform = "translateX(-50%) translateY(0) scale(1)";
      img.style.opacity = 0;
      img.style.width = "180px";
      img.style.pointerEvents = "none";

      // Reset GSAP transforms
      gsap.set(img, { x: 0, y: 0 });
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

      const xOffset = 400; // horizontal distance from laptop
      const scaleFactor = 0.85;

      // Vertical offsets for 3 left and 3 right images
      const leftYOffsets = [-150, 0, 150];
      const rightYOffsets = [-150, 0, 150];

      sideImages.forEach((img, i) => {
        const isLeft = i < 3; // first 3 = left
        const y = isLeft ? leftYOffsets[i] : rightYOffsets[i - 3];

        tl.to(
          img,
          {
            x: isLeft ? -xOffset : xOffset,
            y: y,
            scale: scaleFactor,
            opacity: 1,
            duration: 2,
            ease: "power1.inOut",
          },
          0
        );
      });
    } else {
      gsap.to(sideImages, { opacity: 1, scale: 0.75, duration: 1, stagger: 0.2 });
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
          src="/performance5.jpg"
          alt="Laptop"
          className="laptop absolute left-1/2 bottom-[40%] -translate-x-1/2 z-10 w-[500px] max-w-[60%]"
        />

        {/* Side images (exclude laptop) */}
        {performanceImages
          .filter((item) => item.src !== "/performance5.jpg")
          .map((item, i) => (
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