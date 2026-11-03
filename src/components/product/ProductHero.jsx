
import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";

import { ArrowUpRight } from "lucide-react";

const HERO_IMAGE =
  "https://media.istockphoto.com/id/507457626/photo/corn-groats-and-seeds-corncobs-on-wooden-rustic-table.jpg?s=612x612&w=0&k=20&c=JeoMvxyaDJSfABZ0G3YFEm7jX62O3v06cfVICzy2zJ8=";

const ease = [0.22, 1, 0.36, 1];

const particles = [
  { left: "12%", top: "20%", size: 4, duration: 5 },
  { left: "75%", top: "18%", size: 5, duration: 7 },
  { left: "88%", top: "65%", size: 3, duration: 6 },
  { left: "48%", top: "80%", size: 4, duration: 8 },
  { left: "65%", top: "45%", size: 3, duration: 5.5 },
  { left: "30%", top: "72%", size: 3, duration: 6.5 },
];

/* ======================================
   DEVICE DETECTION
====================================== */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1023px)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const update = () => setIsMobile(media.matches);

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/* ======================================
   MAIN PRODUCT HERO
====================================== */

export default function ProductHero() {
  const sectionRef = useRef(null);

  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const isInView = useInView(sectionRef, {
    amount: 0.1,
  });

  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      setPageVisible(!document.hidden);
    };

    update();

    document.addEventListener("visibilitychange", update);

    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const animateEffects =
    !reduceMotion && isInView && pageVisible;

  const desktopEffects = animateEffects && !isMobile;

  /* ======================================
     DESKTOP 3D MOUSE PARALLAX
  ====================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgRotateX = useSpring(mouseY, {
    stiffness: 60,
    damping: 22,
  });

  const bgRotateY = useSpring(mouseX, {
    stiffness: 60,
    damping: 22,
  });

  const contentRotateX = useSpring(mouseY, {
    stiffness: 75,
    damping: 25,
  });

  const contentRotateY = useSpring(mouseX, {
    stiffness: 75,
    damping: 25,
  });

  const handlePointerMove = (event) => {
    if (
      !desktopEffects ||
      event.pointerType !== "mouse" ||
      !sectionRef.current
    ) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 8);
    mouseY.set(-y * 5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!desktopEffects) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [desktopEffects, mouseX, mouseY]);

  /* ======================================
     ENTRY ANIMATION HELPER
  ====================================== */

  const entry = (desktop, mobile, delay = 0) => ({
    initial: reduceMotion ? false : isMobile ? mobile : desktop,
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    },
    transition: {
      duration: reduceMotion ? 0 : isMobile ? 0.55 : 0.9,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="product-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMouse}
      className="group relative isolate w-full overflow-hidden bg-[#202A38] text-white"
      style={{
        perspective: isMobile ? "none" : "1400px",
      }}
    >
      {/* ======================================
          CINEMATIC BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* BACKGROUND 3D WRAPPER */}
        <motion.div
          style={
            isMobile || reduceMotion
              ? {}
              : {
                  rotateX: bgRotateX,
                  rotateY: bgRotateY,
                  transformStyle: "preserve-3d",
                }
          }
          className="absolute -inset-[8%]"
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    scale: 1.08,
                    opacity: 0.8,
                  }
            }
            animate={
              animateEffects
                ? isMobile
                  ? {
                      scale: [1.06, 1.11, 1.06],
                      opacity: 1,
                    }
                  : {
                      scale: [1.08, 1.16, 1.08],
                      x: [0, -16, 0],
                      y: [0, 10, 0],
                      opacity: 1,
                    }
                : {
                    scale: 1.08,
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={
              animateEffects
                ? isMobile
                  ? {
                      scale: {
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      opacity: {
                        duration: 0.5,
                      },
                    }
                  : {
                      scale: {
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      x: {
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      y: {
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      opacity: {
                        duration: 1.4,
                      },
                    }
                : {
                    duration: 0.2,
                  }
            }
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${HERO_IMAGE}")`,
            }}
          />
        </motion.div>

        {/* DARK OVERLAYS */}
        <div className="absolute inset-0 bg-[#152233]/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101C2B]/95 via-[#142132]/75 to-[#142132]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#101C2B]/40 via-transparent to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_45%,rgba(233,172,18,0.12),transparent_50%)]" />

        {/* ======================================
            GOLDEN LIGHT SWEEP
            DESKTOP FULL / MOBILE LIGHT
        ====================================== */}

        {desktopEffects && (
          <motion.div
            aria-hidden="true"
            animate={{
              x: ["-100vw", "160vw"],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute -top-[50%] left-0
              h-[200%] w-[28%]
              rotate-[22deg]
              bg-gradient-to-r
              from-transparent
              via-[#E9AC12]/10
              to-transparent
              blur-[45px]
            "
          />
        )}

        {/* ======================================
            GOLDEN GLOW
        ====================================== */}

        {desktopEffects && (
          <motion.div
            aria-hidden="true"
            animate={{
              x: [-30, 35, -30],
              y: [0, -25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-24 top-[5%] h-[350px] w-[350px] rounded-full bg-[#E9AC12]/20 blur-[110px]"
          />
        )}

        {/* MOBILE LIGHT GLOW */}
        {isMobile && (
          <div className="absolute -right-16 top-[10%] h-[180px] w-[180px] rounded-full bg-[radial-gradient(circle,rgba(233,172,18,0.14),transparent_70%)]" />
        )}

        {/* ======================================
            GOLDEN PARTICLES
        ====================================== */}

        {animateEffects &&
          particles
            .slice(0, isMobile ? 3 : particles.length)
            .map((particle, index) => (
              <motion.span
                key={index}
                aria-hidden="true"
                className="absolute rounded-full bg-[#F4BD43]"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  y: isMobile
                    ? [0, -12, 0]
                    : [0, -25, 0],
                  x: isMobile
                    ? [0, 4, 0]
                    : [0, 10, 0],
                  opacity: [0.15, 0.7, 0.15],
                  scale: isMobile
                    ? [0.9, 1.1, 0.9]
                    : [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: particle.duration,
                  delay: index * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative mx-auto flex min-h-[350px] max-w-[1450px] items-center px-5 py-12 sm:min-h-[440px] sm:px-8 lg:min-h-[480px] lg:px-12">
        <motion.div
          style={
            isMobile || reduceMotion
              ? {}
              : {
                  rotateX: contentRotateX,
                  rotateY: contentRotateY,
                  transformStyle: "preserve-3d",
                }
          }
          className="max-w-[750px]"
        >
          {/* EYEBROW */}
          <motion.div
            {...entry(
              {
                opacity: 0,
                x: -35,
                rotateY: -18,
              },
              {
                opacity: 0,
                x: -15,
              },
              0.1
            )}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-10 shrink-0 bg-[#E9AC12]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#F1C77E]">
              CRUNCH & CRISP INDIA LLP
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            {...entry(
              {
                opacity: 0,
                y: 55,
                rotateX: -25,
                scale: 0.92,
              },
              {
                opacity: 0,
                y: 20,
                scale: 0.98,
              },
              0.2
            )}
            style={{
              transformOrigin: "bottom left",
            }}
            className="text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.12] tracking-[-1.3px]"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#F6A43A] via-[#E9AC12] to-[#FFE39B] bg-clip-text text-transparent">
              Products
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            {...entry(
              {
                opacity: 0,
                y: 25,
                rotateX: -10,
              },
              {
                opacity: 0,
                y: 14,
              },
              0.35
            )}
            className="mt-6 max-w-[620px] text-[14px] leading-[1.9] text-[#E0E6EB] sm:text-[15px]"
          >
            Explore our range of corn-based products,
            agricultural commodities and frozen foods for
            commercial and industrial applications.
          </motion.p>

          {/* ======================================
              BUTTONS
          ====================================== */}

          <motion.div
            {...entry(
              {
                opacity: 0,
                y: 25,
              },
              {
                opacity: 0,
                y: 14,
              },
              0.5
            )}
            className="mt-8 flex flex-wrap gap-3"
          >
            {/* EXPLORE PRODUCTS */}
            <motion.a
              href="#product-range"
              whileHover={
                !isMobile && !reduceMotion
                  ? {
                      y: -5,
                      scale: 1.05,
                      rotateX: -5,
                      rotateY: 5,
                    }
                  : undefined
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              transition={{
                duration: 0.3,
              }}
              className="group/btn inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-6 py-3.5 text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(230,106,22,0.15)]"
            >
              Explore Products

              <motion.span
                animate={
                  animateEffects
                    ? {
                        x: isMobile
                          ? [0, 2, 0]
                          : [0, 3, 0],
                        y: isMobile
                          ? [0, -2, 0]
                          : [0, -3, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowUpRight size={17} />
              </motion.span>
            </motion.a>

            {/* BULK ENQUIRY */}
            <motion.a
              href="/contact"
              whileHover={
                !isMobile && !reduceMotion
                  ? {
                      y: -5,
                      scale: 1.05,
                      rotateX: -5,
                      rotateY: -5,
                    }
                  : undefined
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              transition={{
                duration: 0.3,
              }}
              className="group/btn inline-flex items-center gap-3 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-[13px] font-bold text-white lg:backdrop-blur-sm"
            >
              Bulk Enquiry

              <ArrowUpRight
                size={17}
                className="text-[#E9AC12]"
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ======================================
          BOTTOM GOLD BORDER
      ====================================== */}

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  scaleX: 0,
                }
          }
          animate={{
            scaleX: 1,
          }}
          transition={{
            duration: isMobile ? 0.9 : 1.5,
            delay: isMobile ? 0.2 : 0.5,
            ease,
          }}
          style={{
            transformOrigin: "left",
          }}
          className="h-full w-full bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-transparent"
        />
      </div>
    </section>
  );
}
