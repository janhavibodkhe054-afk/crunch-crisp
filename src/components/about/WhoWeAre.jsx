
import React, { useEffect, useRef } from "react";

import {
  motion,
  useInView,
  useAnimationControls,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  Wheat,
  Handshake,
  TrendingUp,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const highlights = [
  {
    icon: Wheat,
    title: "Quality Products",
  },
  {
    icon: Handshake,
    title: "Reliable Supply",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Partnerships",
  },
];

/* ==========================================
   3D HIGHLIGHT ITEM
========================================== */

function HighlightItem({
  item,
  index,
  isInView,
  reduceMotion,
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 20,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{
        duration: 0.6,
        delay: 0.85 + index * 0.12,
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -7,
              scale: 1.06,
              rotateY: 10,
            }
      }
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`flex flex-col items-center justify-center gap-3 text-center ${
        index !== highlights.length - 1
          ? "border-r border-[#E8D7BF]"
          : ""
      }`}
    >
      <motion.div
        animate={
          isInView && !reduceMotion
            ? {
                y: [0, -4, 0],
                rotateY: [0, 8, 0, -8, 0],
              }
            : undefined
        }
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#E66A16] shadow-[0_6px_18px_rgba(230,106,22,0.12)] sm:h-12 sm:w-12"
      >
        <Icon size={21} strokeWidth={1.8} />
      </motion.div>

      <span className="max-w-[130px] text-[10px] font-bold leading-[1.5] text-[#202A38] sm:text-[12px]">
        {item.title}
      </span>
    </motion.div>
  );
}

/* ==========================================
   MAIN SECTION
========================================== */

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
  });

  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  /* ======================================
     MOUSE FOLLOW 3D IMAGE TILT
  ====================================== */

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const smoothTiltX = useSpring(tiltX, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const smoothTiltY = useSpring(tiltY, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
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

    tiltX.set(-y * 13);
    tiltY.set(x * 15);
  };

  const resetImageTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  /* ======================================
     ENTRANCE ANIMATIONS
  ====================================== */

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 160,
      scale: reduceMotion ? 1 : 0.82,
      filter: reduceMotion ? "blur(0px)" : "blur(8px)",
    },

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",

      transition: {
        duration: 1.25,
        ease,
        delay: 0.15,
      },
    },
  };

  const circleVariants = {
    hidden: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.65,
    },

    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 1.1,
        ease,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 32,
    },

    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease,
        delay,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="about-overview"
      className="relative isolate overflow-hidden bg-[#FFFEFC] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND GOLDEN GLOW */}
      <motion.div
        aria-hidden="true"
        animate={
          isInView && !reduceMotion
            ? {
                x: [-25, 35, -25],
                y: [0, -20, 0],
                scale: [1, 1.15, 1],
                opacity: [0.55, 0.9, 0.55],
              }
            : undefined
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#F6C875]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">

          {/* ======================================
              LEFT 3D IMAGE AREA
          ====================================== */}

          <div
            ref={imageRef}
            onPointerMove={handleImageMove}
            onPointerLeave={resetImageTilt}
            className="relative mx-auto flex h-[340px] w-full max-w-[610px] items-center justify-center sm:h-[470px] lg:h-[560px]"
            style={{
              perspective: "1200px",
            }}
          >
            {/* CIRCULAR BACKGROUND */}
            <motion.div
              variants={circleVariants}
              initial="hidden"
              animate={controls}
              className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,#FFF4DE_0%,#FFF9EF_65%,transparent_72%)] sm:h-[400px] sm:w-[400px] lg:h-[490px] lg:w-[490px]"
            />

            {/* OUTER ROTATING GOLDEN RING */}
            <motion.div
              variants={circleVariants}
              initial="hidden"
              animate={controls}
              className="pointer-events-none absolute h-[290px] w-[290px] rounded-full border border-[#E9AC12]/45 sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]"
            >
              <motion.div
                animate={
                  isInView && !reduceMotion
                    ? { rotate: 360 }
                    : undefined
                }
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full"
              >
                <span className="absolute -top-[6px] left-1/2 h-3 w-3 rounded-full bg-[#E66A16] shadow-[0_0_15px_rgba(230,106,22,0.35)]" />

                <span className="absolute bottom-[16%] right-[6%] h-2 w-2 rounded-full bg-[#E9AC12]" />
              </motion.div>
            </motion.div>

            {/* INNER ROTATING DASHED RING */}
            <motion.div
              variants={circleVariants}
              initial="hidden"
              animate={controls}
              className="pointer-events-none absolute h-[245px] w-[245px] rounded-full sm:h-[365px] sm:w-[365px] lg:h-[455px] lg:w-[455px]"
            >
              <motion.div
                animate={
                  isInView && !reduceMotion
                    ? { rotate: -360 }
                    : undefined
                }
                transition={{
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-full rounded-full border border-dashed border-[#E9AC12]/30"
              />
            </motion.div>

            {/* 3D IMAGE ENTRANCE */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={controls}
              className="relative z-10 flex h-full w-full items-center justify-center"
            >
              {/* MOUSE RESPONSIVE 3D TILT */}
              <motion.div
                style={{
                  rotateX: smoothTiltX,
                  rotateY: smoothTiltY,
                  transformStyle: "preserve-3d",
                }}
                className="flex h-full w-full items-center justify-center"
              >
                {/* CONTINUOUS FLOATING IMAGE */}
                <motion.img
                  src="/fresh.png"
                  alt="Premium corn and agricultural products"
                  loading="lazy"
                  draggable={false}
                  animate={
                    isInView && !reduceMotion
                      ? {
                          y: [0, -12, 0],
                          rotateZ: [0, 1.5, 0, -1.5, 0],
                        }
                      : {
                          y: 0,
                          rotateZ: 0,
                        }
                  }
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.1,
                        }
                  }
                  transition={{
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotateZ: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 0.55,
                      ease,
                    },
                  }}
                  className="relative z-10 h-[320px] w-full max-w-[590px] object-contain drop-shadow-[0_25px_28px_rgba(63,62,28,0.16)] sm:h-[450px] lg:h-[550px]"
                />
              </motion.div>
            </motion.div>

            {/* FLOATING DECORATIVE DOT */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={
                isInView
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
                duration: 0.5,
                delay: 0.9,
              }}
              className="pointer-events-none absolute bottom-[12%] left-[8%] h-2.5 w-2.5 rounded-full bg-[#E9AC12]"
            />
          </div>

          {/* ======================================
              RIGHT CONTENT
          ====================================== */}

          <div className="relative w-full max-w-[700px]">

            {/* EYEBROW */}
            <motion.div
              variants={textVariants}
              custom={0.15}
              initial="hidden"
              animate={controls}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-[#E66A16]" />

              <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#E66A16]">
                WHO WE ARE
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              variants={textVariants}
              custom={0.25}
              initial="hidden"
              animate={controls}
              className="text-[clamp(31px,3.6vw,52px)] font-extrabold leading-[1.15] tracking-[-1.5px] text-[#202A38]"
            >
              Building Value Through

              <span className="block text-[#E66A16]">
                Agricultural Products.
              </span>
            </motion.h2>

            {/* PARAGRAPH 1 */}
            <motion.p
              variants={textVariants}
              custom={0.4}
              initial="hidden"
              animate={controls}
              className="mt-6 text-[14px] leading-[1.9] text-[#596674] sm:text-[15px]"
            >
              Crunch & Crisp India LLP is an India-based company
              engaged in corn processing products, agricultural
              commodities and frozen food solutions.
            </motion.p>

            {/* PARAGRAPH 2 */}
            <motion.p
              variants={textVariants}
              custom={0.5}
              initial="hidden"
              animate={controls}
              className="mt-4 text-[14px] leading-[1.9] text-[#596674] sm:text-[15px]"
            >
              Our product range includes Corn Grits, Corn Cob,
              Corn Germ, Yellow Crushed Maize, Fine Corn Powder
              and other agricultural products.
            </motion.p>

            {/* PARAGRAPH 3 */}
            <motion.p
              variants={textVariants}
              custom={0.6}
              initial="hidden"
              animate={controls}
              className="mt-4 text-[14px] leading-[1.9] text-[#596674] sm:text-[15px]"
            >
              We focus on understanding commercial requirements
              and delivering product solutions that support
              businesses across different sectors.
            </motion.p>

            {/* ======================================
                3D HIGHLIGHTS
            ====================================== */}

            <motion.div
              variants={textVariants}
              custom={0.75}
              initial="hidden"
              animate={controls}
              className="mt-8 grid grid-cols-3 gap-2 rounded-[18px] bg-[#FFF5E8] px-3 py-5 sm:gap-4 sm:px-5"
              style={{
                perspective: "1000px",
              }}
            >
              {highlights.map((item, index) => (
                <HighlightItem
                  key={item.title}
                  item={item}
                  index={index}
                  isInView={isInView}
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
