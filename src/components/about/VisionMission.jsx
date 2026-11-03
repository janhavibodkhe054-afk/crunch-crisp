
import React, { useRef } from "react";

import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  Eye,
  Target,
  ArrowUpRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

/* ==========================================
   INTERACTIVE 3D VISION / MISSION BLOCK
========================================== */

function VisionMissionBlock({
  type,
  number,
  label,
  title,
  description,
  footer,
  Icon,
  delay,
  inView,
  reduceMotion,
}) {
  const blockRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
  });

  const handleMove = (event) => {
    if (
      reduceMotion ||
      event.pointerType !== "mouse" ||
      !blockRef.current
    ) {
      return;
    }

    const rect = blockRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 9);
    mouseY.set(-y * 7);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isVision = type === "vision";

  return (
    <motion.article
      ref={blockRef}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      initial={{
        opacity: 0,
        x: reduceMotion ? 0 : isVision ? -85 : 85,
        y: reduceMotion ? 0 : 22,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              x: reduceMotion ? 0 : isVision ? -85 : 85,
              y: reduceMotion ? 0 : 22,
            }
      }
      transition={{
        duration: 0.95,
        delay,
        ease,
      }}
      className={`group relative min-h-[350px] ${
        isVision
          ? "lg:pr-12"
          : "lg:pl-12 lg:pt-20"
      }`}
      style={{
        perspective: "1200px",
      }}
    >
      {/* INTERACTIVE 3D CONTENT */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        {/* LARGE BACKGROUND NUMBER */}
        <motion.span
          animate={
            inView && !reduceMotion
              ? {
                  y: [0, -10, 0],
                  x: [0, isVision ? 7 : -7, 0],
                }
              : undefined
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`pointer-events-none absolute -top-12 right-2 select-none text-[145px] font-black leading-none tracking-[-12px] sm:text-[195px] ${
            isVision
              ? "text-[#E9AC12]/[0.13] lg:right-10"
              : "text-[#E66A16]/[0.09] lg:top-3"
          }`}
        >
          {number}
        </motion.span>

        {/* FLOATING 3D ICON */}
        <div
          className="relative z-10 mb-8 h-[72px] w-[72px]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* ROTATING GOLDEN OUTER RING */}
          <motion.div
            aria-hidden="true"
            animate={
              inView && !reduceMotion
                ? {
                    rotate: 360,
                  }
                : undefined
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -inset-[7px] rounded-full border border-dashed border-[#E9AC12]/50"
          />

          {/* ICON CIRCLE */}
          <motion.div
            animate={
              inView && !reduceMotion
                ? {
                    y: [0, -7, 0],
                    rotateY: [0, 12, 0, -12, 0],
                  }
                : undefined
            }
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.12,
                    rotateY: 180,
                  }
            }
            transition={{
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotateY: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 0.4,
              },
            }}
            className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#E9C994] bg-white/90 text-[#E66A16] shadow-[0_12px_35px_rgba(204,150,68,0.15)]"
          >
            <Icon size={32} strokeWidth={1.6} />
          </motion.div>
        </div>

        {/* TEXT CONTENT */}
        <div
          className="relative z-10"
          style={{
            transform: "translateZ(18px)",
          }}
        >
          {/* EYEBROW */}
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              animate={
                inView && !reduceMotion
                  ? {
                      width: [36, 48, 36],
                    }
                  : undefined
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-[2px] w-9 bg-[#E66A16]"
            />

            <span className="text-[11px] font-bold uppercase tracking-[2.2px] text-[#C88A2C]">
              {label}
            </span>
          </div>

          {/* TITLE */}
          <motion.h3
            whileHover={
              reduceMotion
                ? undefined
                : {
                    x: 5,
                  }
            }
            transition={{
              duration: 0.35,
            }}
            className="text-[35px] font-extrabold tracking-[-1px] text-[#202A38] sm:text-[43px]"
          >
            {title}
          </motion.h3>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-[480px] text-[15px] leading-[2] text-[#596674] sm:text-[16px]">
            {description}
          </p>

          {/* FOOTER LINE */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-[1px] w-12 bg-[#E9AC12]" />

            <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#BA842E]">
              {footer}
            </span>

            <motion.div
              animate={
                inView && !reduceMotion
                  ? {
                      x: [0, 4, 0],
                      y: [0, -4, 0],
                    }
                  : undefined
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUpRight
                size={17}
                className="text-[#E66A16]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ==========================================
   MAIN VISION & MISSION SECTION
========================================== */

export default function VisionMission() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.18,
  });

  const reveal = (x = 0, delay = 0) => ({
    initial: {
      opacity: 0,
      x: reduceMotion ? 0 : x,
      y: reduceMotion ? 0 : 22,
    },

    animate: inView
      ? {
          opacity: 1,
          x: 0,
          y: 0,
        }
      : {
          opacity: 0,
          x: reduceMotion ? 0 : x,
          y: reduceMotion ? 0 : 22,
        },

    transition: {
      duration: 0.95,
      delay,
      ease,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="vision-mission"
      className="relative isolate overflow-hidden bg-[#F8F5EE] py-16 sm:py-20 lg:py-24"
    >
      {/* ======================================
          ANIMATED BACKGROUND GLOWS
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={
            inView && !reduceMotion
              ? {
                  x: [-25, 45, -25],
                  y: [0, 25, 0],
                  scale: [1, 1.15, 1],
                }
              : undefined
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#F7DDAE]/25 blur-[110px]"
        />

        <motion.div
          animate={
            inView && !reduceMotion
              ? {
                  x: [30, -40, 30],
                  y: [0, -30, 0],
                  scale: [1, 1.12, 1],
                }
              : undefined
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-44 -right-32 h-[520px] w-[520px] rounded-full bg-[#F5C6A5]/20 blur-[110px]"
        />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        

        {/* ======================================
            CONNECTED VISION / MISSION
        ====================================== */}

        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-24">

          {/* DESKTOP CONNECTING PATH */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg
              viewBox="0 0 1200 410"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="visionMissionPath"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#E66A16"
                  />

                  <stop
                    offset="100%"
                    stopColor="#E9AC12"
                  />
                </linearGradient>
              </defs>

              {/* BASE TRACK */}
              <path
                d="M 555 50 C 690 95, 495 295, 645 360"
                stroke="#E8DAC6"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* ANIMATED DRAWING PATH */}
              <motion.path
                d="M 555 50 C 690 95, 495 295, 645 360"
                stroke="url(#visionMissionPath)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={
                  inView
                    ? {
                        pathLength: 1,
                        opacity: 1,
                      }
                    : {
                        pathLength: 0,
                        opacity: 0,
                      }
                }
                transition={{
                  duration: 1.9,
                  delay: 0.45,
                  ease: "easeInOut",
                }}
              />

              {/* CONTINUOUS MOVING LIGHT DOT */}
              {inView && !reduceMotion && (
                <circle
                  r="6"
                  fill="#E9AC12"
                  stroke="#FFF5DC"
                  strokeWidth="3"
                >
                  <animateMotion
                    dur="5s"
                    repeatCount="indefinite"
                    path="M 555 50 C 690 95, 495 295, 645 360"
                  />
                </circle>
              )}

              {/* START POINT */}
              <motion.circle
                cx="555"
                cy="50"
                r="7"
                fill="#E66A16"
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0,
                      }
                }
                transition={{
                  duration: 0.45,
                  delay: 0.5,
                }}
              />

              {/* END POINT */}
              <motion.circle
                cx="645"
                cy="360"
                r="7"
                fill="#E9AC12"
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0,
                      }
                }
                transition={{
                  duration: 0.45,
                  delay: 2.1,
                }}
              />
            </svg>
          </div>

          {/* VISION */}
          <VisionMissionBlock
            type="vision"
            number="01"
            label="OUR FUTURE"
            title="Our Vision"
            description="To become a trusted name in agricultural commodities and corn-based product solutions by building strong business relationships and creating long-term value."
            footer="Building Tomorrow"
            Icon={Eye}
            delay={0.18}
            inView={inView}
            reduceMotion={reduceMotion}
          />

          {/* MISSION */}
          <VisionMissionBlock
            type="mission"
            number="02"
            label="OUR COMMITMENT"
            title="Our Mission"
            description="To provide quality-focused agricultural products, understand customer requirements and support businesses through reliable service and continuous improvement."
            footer="Delivering Every Day"
            Icon={Target}
            delay={0.35}
            inView={inView}
            reduceMotion={reduceMotion}
          />
        </div>

        {/* BOTTOM STATEMENT */}
        <motion.div
          {...reveal(0, 0.75)}
          className="mt-8 flex items-center justify-center gap-4 border-t border-[#E5D9C9] pt-8 text-center lg:mt-10"
        >
          <motion.span
            animate={
              inView && !reduceMotion
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }
                : undefined
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 w-2 shrink-0 rounded-full bg-[#E66A16]"
          />

          <p className="text-[11px] font-semibold tracking-[1.5px] text-[#927A5F] sm:text-[12px]">
            ROOTED IN AGRICULTURE. DRIVEN BY PURPOSE.
          </p>

          <motion.span
            animate={
              inView && !reduceMotion
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }
                : undefined
            }
            transition={{
              duration: 2.5,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 w-2 shrink-0 rounded-full bg-[#E9AC12]"
          />
        </motion.div>
      </div>
    </section>
  );
}
