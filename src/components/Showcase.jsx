import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(
    () => {
      if (!isTablet) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#showcase",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        });

        timeline
          .to(".mask img", {
            scale: 1.1,
            duration: 1,
            ease: "power1.inOut",
          })
          .to(
            ".content",
            { opacity: 1, y: 0, duration: 1, ease: "power1.in" },
            "<"
          );
      }
    },
    [isTablet]
  );

  return (
    <section
      id="showcase"
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Media Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center">
        <video
          src="/videos/game.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="mask absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src="/mask-logo.svg" alt="Mask Logo" className="w-32 md:w-48" />
        </div>
      </div>

      {/* Content Section */}
      <div className="content opacity-0 transform translate-y-10 transition-all duration-700 relative z-20 w-full max-w-7xl mx-auto px-5 md:px-10 py-10">
        <div className="wrapper flex flex-col lg:flex-row gap-10">
          {/* Left Column */}
          <div className="lg:max-w-md space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Rocket Chip
            </h2>

            <div className="space-y-5 mt-5 pr-0 md:pr-10 text-gray-400">
              <p>
                Introducing{" "}
                <span className="text-white">M4, the next generation of Apple silicon</span>. 
                M4 powers your creativity.
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design that's
                unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-primary cursor-pointer">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2 text-gray-200">
              <p>Up to</p>
              <h3 className="text-2xl font-semibold text-white">4x faster</h3>
              <p>Pro rendering performance than M2</p>
            </div>
            <div className="space-y-2 text-gray-200">
              <p>Up to</p>
              <h3 className="text-2xl font-semibold text-white">1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;