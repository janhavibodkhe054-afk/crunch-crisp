
import React, { useRef } from "react";

import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const values = [
  {
    number: "01",
    title: "Understanding Needs",
  },
  {
    number: "02",
    title: "Product Consistency",
  },
  {
    number: "03",
    title: "Dependable Service",
  },
];

/* ==========================================
   FLOATING 3D LABEL
========================================== */

function FloatingLabel({
  title,
  index,
  inView,
  reduceMotion,
  className = "",
}) {
  const positions = [
    { x: -35, y: 0 },
    { x: 35, y: 0 },
    { x: -25, y: 20 },
  ];

  const position = positions[index];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: reduceMotion ? 0 : position.x,
        y: reduceMotion ? 0 : position.y,
        scale: reduceMotion ? 1 : 0.85,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : {
              opacity: 0,
              x: position.x,
              y: position.y,
              scale: 0.85,
            }
      }
      transition={{
        duration: 0.85,
        delay: 0.55 + index * 0.15,
        ease,
      }}
      className={`absolute z-20 ${className}`}
      style={{
        perspective: "900px",
      }}
    >
      <motion.div
        animate={
          inView && !reduceMotion
            ? {
                y: [0, -7 - index * 2, 0],
                rotateY: [0, 5, 0, -5, 0],
              }
            : undefined
        }
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.08,
                rotateY: 14,
                rotateX: -6,
                y: -10,
              }
        }
        transition={{
          y: {
            duration: 4 + index * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateY: {
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 0.35,
          },
        }}
        className="flex items-center gap-2 rounded-full border border-[#E8D9BF] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(32,42,56,0.08)]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <CheckCircle2
          size={17}
          className="shrink-0 text-[#E66A16]"
        />

        <span className="whitespace-nowrap text-[11px] font-bold text-[#202A38] sm:text-[12px]">
          {title}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ==========================================
   MAIN BUSINESS PHILOSOPHY
========================================== */

export default function BusinessPhilosophy() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  /* ======================================
     3D MOUSE TILT
  ====================================== */

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const smoothTiltX = useSpring(tiltX, {
    stiffness: 85,
    damping: 22,
  });

  const smoothTiltY = useSpring(tiltY, {
    stiffness: 85,
    damping: 22,
  });

  const handleImageMove = (event) => {
    if (
      reduceMotion ||
      !imageRef.current ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    tiltX.set(-y * 12);
    tiltY.set(x * 14);
  };

  const resetImageTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  /* ======================================
     SCROLL REVEAL
  ====================================== */

  const reveal = (delay = 0, x = 0, y = 25) => ({
    initial: {
      opacity: 0,
      x: reduceMotion ? 0 : x,
      y: reduceMotion ? 0 : y,
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
          y: reduceMotion ? 0 : y,
        },

    transition: {
      duration: 0.85,
      delay,
      ease,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="business-philosophy"
      className="relative isolate overflow-hidden bg-[#F6F7F2] py-16 sm:py-20 lg:py-24"
    >
      {/* ======================================
          ANIMATED BACKGROUND ACCENTS
      ====================================== */}

      <motion.div
        aria-hidden="true"
        animate={
          inView && !reduceMotion
            ? {
                x: [-25, 35, -25],
                y: [0, 20, 0],
                scale: [1, 1.15, 1],
              }
            : undefined
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#E9EEDB]/50 blur-[110px]"
      />

      <motion.div
        aria-hidden="true"
        animate={
          inView && !reduceMotion
            ? {
                x: [25, -35, 25],
                y: [0, -20, 0],
                scale: [1, 1.12, 1],
              }
            : undefined
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-[#F8E5C9]/35 blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* ======================================
              LEFT 3D CIRCULAR VISUAL
          ====================================== */}

          <div
            ref={imageRef}
            onPointerMove={handleImageMove}
            onPointerLeave={resetImageTilt}
            className="relative mx-auto flex h-[390px] w-full max-w-[650px] items-center justify-center sm:h-[520px] lg:h-[570px]"
            style={{
              perspective: "1200px",
            }}
          >
            {/* OUTER CIRCLE ENTRANCE */}
            <motion.div
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.7,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      scale: reduceMotion ? 1 : 0.7,
                    }
              }
              transition={{
                duration: 1.1,
                ease,
              }}
              className="pointer-events-none absolute h-[290px] w-[290px] rounded-full sm:h-[410px] sm:w-[410px] lg:h-[465px] lg:w-[465px]"
            >
              {/* ROTATING OUTER GOLDEN RING */}
              <motion.div
                animate={
                  inView && !reduceMotion
                    ? {
                        rotate: 360,
                      }
                    : undefined
                }
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-[#E6C98E]"
              >
                <span className="absolute -top-[5px] left-1/2 h-[10px] w-[10px] rounded-full bg-[#E66A16] shadow-[0_0_16px_rgba(230,106,22,0.35)]" />

                <span className="absolute bottom-[15%] right-[7%] h-2 w-2 rounded-full bg-[#E9AC12]" />
              </motion.div>

              {/* INNER DASHED ORBIT */}
              <motion.div
                animate={
                  inView && !reduceMotion
                    ? {
                        rotate: -360,
                      }
                    : undefined
                }
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[17px] rounded-full border border-dashed border-[#E9AC12]/25"
              />
            </motion.div>

            {/* INTERACTIVE 3D IMAGE */}
            <motion.div
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.8,
                filter: reduceMotion
                  ? "blur(0px)"
                  : "blur(8px)",
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                  : {
                      opacity: 0,
                      scale: reduceMotion ? 1 : 0.8,
                      filter: reduceMotion
                        ? "blur(0px)"
                        : "blur(8px)",
                    }
              }
              transition={{
                duration: 1.25,
                delay: 0.15,
                ease,
              }}
              className="relative z-10"
            >
              {/* MOUSE FOLLOW 3D TILT */}
              <motion.div
                style={{
                  rotateX: smoothTiltX,
                  rotateY: smoothTiltY,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* CONTINUOUS FLOATING */}
                <motion.div
                  animate={
                    inView && !reduceMotion
                      ? {
                          y: [0, -10, 0],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="group relative h-[245px] w-[245px] overflow-hidden rounded-full border-[8px] border-white shadow-[0_25px_65px_rgba(32,42,56,0.13)] sm:h-[355px] sm:w-[355px] lg:h-[400px] lg:w-[400px]"
                >
                  <motion.img
                    src="/turmeric.webp"
                    alt="Quality corn and agricultural products"
                    loading="lazy"
                    draggable={false}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.12,
                          }
                    }
                    transition={{
                      duration: 0.9,
                      ease,
                    }}
                    className="h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/30 via-transparent to-transparent" />

                  {/* MOVING LIGHT REFLECTION */}
                  <motion.div
                    aria-hidden="true"
                    animate={
                      inView && !reduceMotion
                        ? {
                            x: ["-150%", "250%"],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -top-1/2 h-[200%] w-[35%] rotate-[20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[12px]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ======================================
                FLOATING LABELS
            ====================================== */}

            <FloatingLabel
              title={values[0].title}
              index={0}
              inView={inView}
              reduceMotion={reduceMotion}
              className="left-0 top-[8%] sm:left-[2%] sm:top-[10%]"
            />

            <FloatingLabel
              title={values[1].title}
              index={1}
              inView={inView}
              reduceMotion={reduceMotion}
              className="right-0 top-[28%] sm:right-[1%]"
            />

            <FloatingLabel
              title={values[2].title}
              index={2}
              inView={inView}
              reduceMotion={reduceMotion}
              className="bottom-[8%] left-[8%] sm:bottom-[9%] sm:left-[12%]"
            />
          </div>

          {/* ======================================
              RIGHT CONTENT
          ====================================== */}

          <div className="relative">

            {/* EYEBROW */}
            <motion.div
              {...reveal(0, 30, 0)}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-[#E66A16]" />

              <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#E66A16]">
                OUR BUSINESS PHILOSOPHY
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              {...reveal(0.15, 40, 0)}
              className="max-w-[600px] text-[clamp(31px,3.5vw,48px)] font-extrabold leading-[1.17] tracking-[-1.4px] text-[#202A38]"
            >
              Quality Products.

              <span className="mt-1 block text-[#E66A16]">
                Meaningful Partnerships.
              </span>
            </motion.h2>

            {/* ANIMATED ACCENT LINE */}
            <motion.div
              initial={{
                width: 0,
              }}
              animate={
                inView
                  ? {
                      width: 80,
                    }
                  : {
                      width: 0,
                    }
              }
              transition={{
                duration: 1,
                delay: 0.45,
                ease,
              }}
              className="mt-7 h-[3px] overflow-hidden rounded-full bg-gradient-to-r from-[#E66A16] to-[#E9AC12]"
            >
              <motion.div
                animate={
                  inView && !reduceMotion
                    ? {
                        x: ["-100%", "200%"],
                      }
                    : undefined
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-1/2 bg-white/60 blur-[2px]"
              />
            </motion.div>

            {/* DESCRIPTION */}
            <motion.div
              {...reveal(0.35, 0, 25)}
              className="mt-7 space-y-4"
            >
              <p className="max-w-[580px] text-[15px] leading-[1.95] text-[#566270] sm:text-[16px]">
                We believe that strong business relationships
                begin with understanding customer needs,
                maintaining product consistency and delivering
                dependable service.
              </p>

              <p className="max-w-[580px] text-[15px] leading-[1.95] text-[#566270] sm:text-[16px]">
                At Crunch & Crisp India LLP, we focus on
                building meaningful partnerships by offering
                practical agricultural product solutions that
                align with different business requirements.
                Through clear communication and a
                customer-focused approach, we aim to support
                reliable and long-term business relationships.
              </p>
            </motion.div>

            {/* BOTTOM STATEMENT */}
            <motion.div
              {...reveal(0.55, 0, 20)}
              className="mt-8 flex items-center gap-4 border-t border-[#DDE2D6] pt-6"
            >
              <motion.div
                animate={
                  inView && !reduceMotion
                    ? {
                        y: [0, -5, 0],
                        rotateY: [0, 15, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.12,
                        rotateY: 180,
                      }
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0DB] text-[#E66A16]"
              >
                <ArrowUpRight size={22} />
              </motion.div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[2px] text-[#C58A34]">
                  OUR APPROACH
                </span>

                <span className="mt-1 block text-[15px] font-extrabold text-[#202A38]">
                  Quality. Trust. Long-Term Value.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
