
import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  Wheat,
  Handshake,
  TrendingUp,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

/* ======================================
   HIGHLIGHTS DATA
====================================== */

const highlights = [
  {
    icon: Wheat,
    title: "Diverse Product Range",
  },
  {
    icon: Handshake,
    title: "Bulk Supply Solutions",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Partnerships",
  },
];

/* ======================================
   MOBILE DETECTION
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

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  return isMobile;
}

/* ======================================
   HIGHLIGHT ITEM
====================================== */

function HighlightItem({
  item,
  index,
  animateEffects,
  reduceMotion,
  isMobile,
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: isMobile ? 10 : 20,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: isMobile ? 0.4 : 0.6,
        delay: isMobile ? index * 0.06 : 0.4 + index * 0.12,
        ease,
      }}
      whileHover={
        animateEffects
          ? {
              y: -7,
              scale: 1.06,
              rotateY: 10,
            }
          : undefined
      }
      style={{
        transformStyle: animateEffects
          ? "preserve-3d"
          : "flat",
      }}
      className={`flex min-w-0 flex-col items-center justify-center gap-3 text-center ${
        index !== highlights.length - 1
          ? "border-r border-[#E8D7BF]"
          : ""
      }`}
    >
      {/* ICON */}
      <motion.div
        animate={
          animateEffects
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
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-full bg-white
          text-[#E66A16]
          shadow-[0_4px_12px_rgba(230,106,22,0.1)]
          sm:h-12 sm:w-12
        "
      >
        <Icon size={21} strokeWidth={1.8} />
      </motion.div>

      <span className="max-w-[130px] px-1 text-[10px] font-bold leading-[1.5] text-[#202A38] sm:text-[12px]">
        {item.title}
      </span>
    </motion.div>
  );
}

/* ======================================
   MAIN SECTION
====================================== */

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const isInView = useInView(sectionRef, {
    amount: 0.15,
  });

  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      setPageVisible(!document.hidden);
    };

    update();

    document.addEventListener("visibilitychange", update);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        update
      );
    };
  }, []);

  const animateEffects =
    !isMobile &&
    !reduceMotion &&
    isInView &&
    pageVisible;

  const mobileEffects =
    isMobile &&
    !reduceMotion &&
    isInView &&
    pageVisible;

  /* ======================================
     DESKTOP MOUSE TILT
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
      !animateEffects ||
      event.pointerType !== "mouse" ||
      !imageRef.current
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

  useEffect(() => {
    if (!animateEffects) {
      tiltX.set(0);
      tiltY.set(0);
    }
  }, [animateEffects, tiltX, tiltY]);

  /* ======================================
     ENTRANCE ANIMATION
  ====================================== */

  const reveal = (delay = 0) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: isMobile ? 12 : 30,
        },

    whileInView: {
      opacity: 1,
      y: 0,
    },

    viewport: {
      once: true,
      amount: 0.1,
    },

    transition: {
      duration: reduceMotion ? 0 : isMobile ? 0.4 : 0.7,
      delay: isMobile ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="about-overview"
      className="
        relative isolate overflow-hidden
        bg-[#FFFEFC]
        py-12 sm:py-16 lg:py-24
      "
    >
      {/* ======================================
          BACKGROUND GOLDEN GLOW
      ====================================== */}

      {animateEffects && (
        <motion.div
          aria-hidden="true"
          animate={{
            x: [-25, 35, -25],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
            opacity: [0.55, 0.9, 0.55],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none absolute
            -left-32 top-1/2 -z-10
            h-[450px] w-[450px]
            -translate-y-1/2
            rounded-full
            bg-[#F6C875]/10
            blur-[100px]
          "
        />
      )}

      {/* MOBILE STATIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#FFFEFC] via-[#FFFAF3] to-[#FFFEFC] lg:hidden" />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">

          {/* ======================================
              LEFT IMAGE AREA
          ====================================== */}

          <div
            ref={imageRef}
            onPointerMove={handleImageMove}
            onPointerLeave={resetImageTilt}
            className="
              relative mx-auto flex
              h-[300px] w-full max-w-[610px]
              items-center justify-center
              sm:h-[420px]
              lg:h-[560px]
            "
            style={{
              perspective: isMobile ? "none" : "1200px",
            }}
          >
            {/* CIRCULAR BACKGROUND */}
            <motion.div
              {...reveal(0)}
              className="
                pointer-events-none absolute
                h-[260px] w-[260px]
                rounded-full
                bg-[radial-gradient(circle,#FFF4DE_0%,#FFF9EF_65%,transparent_72%)]
                sm:h-[400px] sm:w-[400px]
                lg:h-[490px] lg:w-[490px]
              "
            />

            {/* OUTER GOLDEN RING */}
            <motion.div
              {...reveal(0.1)}
              className="
                pointer-events-none absolute
                h-[270px] w-[270px]
                rounded-full
                border border-[#E9AC12]/45
                sm:h-[420px] sm:w-[420px]
                lg:h-[520px] lg:w-[520px]
              "
            >
              {animateEffects && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full"
                >
                  <span className="absolute -top-[6px] left-1/2 h-3 w-3 rounded-full bg-[#E66A16]" />

                  <span className="absolute bottom-[16%] right-[6%] h-2 w-2 rounded-full bg-[#E9AC12]" />
                </motion.div>
              )}
            </motion.div>

            {/* INNER DASHED RING */}
            <motion.div
              {...reveal(0.15)}
              className="
                pointer-events-none absolute
                h-[230px] w-[230px]
                rounded-full
                border border-dashed border-[#E9AC12]/30
                sm:h-[365px] sm:w-[365px]
                lg:h-[455px] lg:w-[455px]
              "
            />

            {/* MAIN PRODUCT IMAGE */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isMobile ? 0 : 90,
                      y: isMobile ? 15 : 0,
                      scale: isMobile ? 0.98 : 0.88,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: isMobile ? 0.45 : 0.9,
                ease,
              }}
              className="relative z-10 flex h-full w-full items-center justify-center"
            >
              {/* DESKTOP 3D TILT */}
              <motion.div
                style={
                  isMobile || reduceMotion
                    ? {}
                    : {
                        rotateX: smoothTiltX,
                        rotateY: smoothTiltY,
                        transformStyle: "preserve-3d",
                      }
                }
                className="flex h-full w-full items-center justify-center"
              >
                <motion.img
                  src="/fresh.png"
                  alt="Crunch & Crisp agricultural products including corn, rice and spices"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  animate={
                    animateEffects
                      ? {
                          y: [0, -12, 0],
                          rotateZ: [0, 1.5, 0, -1.5, 0],
                        }
                      : mobileEffects
                      ? {
                          y: [0, -5, 0],
                        }
                      : {
                          y: 0,
                          rotateZ: 0,
                        }
                  }
                  whileHover={
                    !isMobile && !reduceMotion
                      ? {
                          scale: 1.1,
                        }
                      : undefined
                  }
                  transition={{
                    y: {
                      duration: isMobile ? 6 : 5,
                      repeat:
                        animateEffects || mobileEffects
                          ? Infinity
                          : 0,
                      ease: "easeInOut",
                    },
                    rotateZ: {
                      duration: 8,
                      repeat: animateEffects ? Infinity : 0,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 0.55,
                      ease,
                    },
                  }}
                  className="
                    relative z-10
                    h-[290px] w-full
                    max-w-[590px]
                    object-contain
                    sm:h-[410px]
                    lg:h-[550px]
                    lg:drop-shadow-[0_25px_28px_rgba(63,62,28,0.16)]
                  "
                />
              </motion.div>
            </motion.div>

            {/* DECORATIVE DOT */}
            <div className="pointer-events-none absolute bottom-[12%] left-[8%] h-2.5 w-2.5 rounded-full bg-[#E9AC12]" />
          </div>

          {/* ======================================
              RIGHT CONTENT
          ====================================== */}

          <div className="relative w-full min-w-0 max-w-[700px]">

            {/* EYEBROW */}
            <motion.div
              {...reveal(0.15)}
              className="mb-4 flex items-center gap-3 lg:mb-5"
            >
              <span className="h-[2px] w-9 shrink-0 bg-[#E66A16]" />

              <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#E66A16]">
                WHO WE ARE
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              {...reveal(0.25)}
              className="
                text-[clamp(30px,5vw,52px)]
                font-extrabold leading-[1.15]
                tracking-[-1.2px]
                text-[#202A38]
                lg:text-[clamp(31px,3.6vw,52px)]
                lg:tracking-[-1.5px]
              "
            >
              Building Value Through

              <span className="block text-[#E66A16]">
                Agriculture & Quality Products.
              </span>
            </motion.h2>

            {/* PARAGRAPH 1 */}
            <motion.p
              {...reveal(0.35)}
              className="mt-5 text-[14px] leading-[1.85] text-[#596674] sm:text-[15px] lg:mt-6 lg:leading-[1.9]"
            >
              Crunch & Crisp India LLP is an India-based company
              engaged in corn processing products, agricultural
              commodities, Indian spices and premium Basmati Rice
              for commercial and industrial requirements.
            </motion.p>

            {/* PARAGRAPH 2 */}
            <motion.p
              {...reveal(0.45)}
              className="mt-4 text-[14px] leading-[1.85] text-[#596674] sm:text-[15px] lg:leading-[1.9]"
            >
              Our product portfolio includes Corn Grits, Corn Cob,
              Corn Germ, Yellow Crushed Maize, Fine Corn Powder,
              Premium Basmati Rice and Indian Spices, with a
              special focus on Turmeric and Turmeric Powder.
            </motion.p>

            {/* PARAGRAPH 3 */}
            <motion.p
              {...reveal(0.55)}
              className="mt-4 text-[14px] leading-[1.85] text-[#596674] sm:text-[15px] lg:leading-[1.9]"
            >
              We focus on understanding bulk procurement needs,
              product quality expectations and customer specifications,
              providing agricultural and food product solutions
              for businesses across different sectors.
            </motion.p>

            {/* ======================================
                HIGHLIGHTS
            ====================================== */}

            <motion.div
              {...reveal(0.65)}
              className="
                mt-7 grid grid-cols-3
                gap-2 rounded-[18px]
                bg-[#FFF5E8]
                px-2 py-5
                sm:gap-4 sm:px-5
                lg:mt-8
              "
              style={{
                perspective: isMobile ? "none" : "1000px",
              }}
            >
              {highlights.map((item, index) => (
                <HighlightItem
                  key={item.title}
                  item={item}
                  index={index}
                  animateEffects={animateEffects}
                  reduceMotion={reduceMotion}
                  isMobile={isMobile}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
