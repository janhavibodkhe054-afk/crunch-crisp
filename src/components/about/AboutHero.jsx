
import React, { useRef } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import { ArrowDownRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function AboutHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  /* ======================================
     MOUSE RESPONSIVE 3D MOTION
  ====================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 65,
    damping: 22,
    mass: 0.8,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 65,
    damping: 22,
    mass: 0.8,
  });

  const handleMouseMove = (event) => {
    if (reduceMotion || !sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 9);
    mouseY.set(-y * 6);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToContent = () => {
    const section = document.getElementById("about-overview");

    if (section) {
      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      className="relative isolate flex min-h-[350px] items-center overflow-hidden bg-[#202A38] sm:min-h-[390px] lg:min-h-[420px]"
      style={{
        perspective: "1400px",
      }}
    >
      {/* ======================================
          INTERACTIVE 3D BACKGROUND IMAGE
      ====================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="pointer-events-none absolute -inset-[7%] -z-30"
      >
        <motion.img
          src="/corn.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          initial={
            reduceMotion
              ? false
              : {
                  scale: 1.15,
                  opacity: 0.6,
                }
          }
          animate={
            reduceMotion
              ? {
                  scale: 1,
                  opacity: 1,
                }
              : {
                  scale: [1.08, 1.16, 1.08],
                  x: [0, -18, 0],
                  y: [0, 9, 0],
                  opacity: 1,
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  scale: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  x: {
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 1.2,
                  },
                }
          }
        />
      </motion.div>

      {/* DARK GRADIENT OVERLAY */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-[#111B29]/95 via-[#172332]/85 to-[#172332]/35" />

      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-t from-[#111B29]/50 via-transparent to-[#111B29]/15" />

      {/* ======================================
          CONTINUOUS GOLDEN LIGHT SWEEP
      ====================================== */}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[50%] left-0 -z-10 h-[200%] w-[30%] rotate-[22deg] bg-gradient-to-r from-transparent via-[#E9AC12]/10 to-transparent blur-[40px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-100vw", "160vw"],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* FLOATING GOLDEN GLOW */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [-35, 45, -35],
                y: [0, -25, 0],
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.35, 0.15],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-20 top-[5%] -z-10 h-[300px] w-[300px] rounded-full bg-[#E9AC12]/20 blur-[100px]"
      />

      {/* ======================================
          3D CONTENT
      ====================================== */}

      <div className="relative mx-auto w-full max-w-[1450px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-16">
        <motion.div
          className="max-w-[800px]"
          style={{
            rotateX: useSpring(mouseY, {
              stiffness: 55,
              damping: 25,
            }),
            rotateY: useSpring(mouseX, {
              stiffness: 55,
              damping: 25,
            }),
            transformStyle: "preserve-3d",
          }}
        >
          {/* EYEBROW */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -35,
                    rotateY: -18,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="mb-4 flex items-center gap-3"
            style={{
              transform: "translateZ(20px)",
            }}
          >
            <span className="h-[2px] w-8 bg-[#E9AC12]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#F4C45A] sm:text-[11px]">
              ABOUT CRUNCH & CRISP INDIA LLP
            </span>
          </motion.div>

          {/* 3D HEADING */}
          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 55,
                    rotateX: -25,
                    scale: 0.92,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.05,
              delay: 0.12,
              ease,
            }}
            className="text-[clamp(32px,4.3vw,58px)] font-extrabold leading-[1.12] tracking-[-1.5px] text-white"
            style={{
              transformOrigin: "bottom left",
            }}
          >
            Rooted in Agriculture.

            <span className="mt-1 block bg-gradient-to-r from-[#F6A43A] via-[#F2B94B] to-[#FFE39B] bg-clip-text text-transparent">
              Driven by Quality.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    rotateX: -10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 0.3,
              ease,
            }}
            className="mt-5 max-w-[660px] border-l-[3px] border-[#E9AC12] pl-4 text-[13px] leading-[1.85] text-white/85 sm:text-[15px]"
          >
            Discover Crunch & Crisp India LLP — connecting
            agricultural resources with the evolving requirements
            of food and industrial businesses.
          </motion.p>

          {/* EXPLORE CTA */}
          <motion.button
            type="button"
            onClick={scrollToContent}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    x: 6,
                    scale: 1.04,
                  }
            }
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease,
            }}
            className="group mt-7 inline-flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9AC12]/70 bg-[#E9AC12]/10 text-[#F4C45A] transition-all duration-300 group-hover:bg-[#E9AC12] group-hover:text-[#202A38]">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 4, 0],
                        x: [0, 3, 0],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDownRight size={19} />
              </motion.span>
            </span>

            <span className="text-[11px] font-bold uppercase tracking-[2px] text-white/90">
              Explore Our Story
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* BOTTOM GOLDEN ACCENT */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/10">
        <motion.div
          animate={
            reduceMotion
              ? { scaleX: 1 }
              : {
                  scaleX: [0.35, 1, 0.35],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "left",
          }}
          className="h-full w-[30%] bg-gradient-to-r from-[#E66A16] to-[#E9AC12]"
        />
      </div>

      {/* SECTION NUMBER */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                x: 25,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease,
        }}
        className="absolute bottom-7 right-8 hidden items-end gap-3 text-white/65 sm:flex lg:right-12"
      >
        <span className="text-[10px] font-bold tracking-[2px]">
          ABOUT US
        </span>

        <span className="text-[25px] font-light leading-none text-[#F4C45A]">
          01
        </span>
      </motion.div>
    </section>
  );
}
