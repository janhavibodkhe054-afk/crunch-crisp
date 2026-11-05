
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918983973799?text=" +
  encodeURIComponent(
    "Hello Crunch & Crisp India LLP, I would like to enquire about your products and bulk supply requirements."
  );

const ease = [0.22, 1, 0.36, 1];

const kernels = [
  { top: "18%", left: "63%", size: 12, delay: 0 },
  { top: "74%", left: "54%", size: 16, delay: 0.5 },
  { top: "26%", left: "94%", size: 13, delay: 1 },
  { top: "79%", left: "89%", size: 14, delay: 0.8 },
];

/* ======================================
   MOBILE DETECTION
====================================== */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(media.matches);

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/* ======================================
   MAIN HERO
====================================== */

export default function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const disableHeavyAnimations = isMobile || reducedMotion;

  const [landed, setLanded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(mouseX, {
    stiffness: 55,
    damping: 20,
  });

  const rotateX = useSpring(mouseY, {
    stiffness: 55,
    damping: 20,
  });

  /* ======================================
     DESKTOP MOUSE PARALLAX
  ====================================== */

  const handleMouseMove = (event) => {
    if (
      disableHeavyAnimations ||
      !landed ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 13);
    mouseY.set(-y * 9);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* ======================================
     CONTENT ANIMATION
  ====================================== */

  const contentReveal = (delay = 0) => ({
    initial: reducedMotion
      ? false
      : {
          opacity: 0,
          y: isMobile ? 12 : 25,
        },

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: {
      duration: isMobile ? 0.45 : 0.7,
      delay: isMobile ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      className="
        relative isolate
        overflow-hidden
        bg-[#171719]
        text-white
        lg:min-h-[590px]
        xl:min-h-[640px]
      "
    >
      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_70%_45%,#303033_0%,#1B1B1D_45%,#111113_100%)]" />

      {/* TEXTURE - DESKTOP ONLY */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          hidden opacity-[0.045]
          [background-image:repeating-linear-gradient(45deg,#ffffff_0px,#ffffff_1px,transparent_1px,transparent_5px)]
          lg:block
        "
      />

      {/* WATERMARK */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          bottom-3 left-[5%]
          select-none whitespace-nowrap
          text-[90px] font-black leading-none
          tracking-[-5px] text-white/[0.035]
          sm:text-[140px]
          lg:-bottom-8 lg:left-[8%]
          lg:text-[clamp(100px,18vw,280px)]
          lg:tracking-[-10px]
        "
      >
        CRUNCH
      </span>

      {/* DECORATIVE RING - DESKTOP ONLY */}
      {!disableHeavyAnimations && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none absolute
            right-[5%] top-[9%]
            hidden h-[76px] w-[76px]
            rounded-full
            border-[9px] border-[#E9AC12]/35
            lg:block
          "
        />
      )}

      {/* GOLDEN KERNELS - DESKTOP ONLY */}
      {!disableHeavyAnimations &&
        kernels.map((kernel, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="
              pointer-events-none absolute z-10
              hidden rounded-[40%]
              bg-gradient-to-br
              from-[#FFE27A]
              via-[#F2B523]
              to-[#C7780C]
              shadow-[0_5px_12px_rgba(0,0,0,0.3)]
              lg:block
            "
            style={{
              top: kernel.top,
              left: kernel.left,
              width: kernel.size,
              height: kernel.size * 1.3,
            }}
            animate={{
              y: [0, -18, 0],
              rotate: [-20, 18, -20],
            }}
            transition={{
              duration: 4 + index * 0.6,
              delay: kernel.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div
        className="
          relative mx-auto flex
          w-full max-w-[1400px]
          flex-col
          px-5 pb-12 pt-12
          sm:px-8 sm:pb-16 sm:pt-14
          lg:min-h-[590px]
          lg:justify-center
          lg:px-8 lg:py-14
          xl:min-h-[640px]
        "
      >
        {/* ======================================
            LEFT CONTENT
        ====================================== */}

        <div className="relative z-20 order-1 lg:pointer-events-none">

          {/* EYEBROW */}
          <motion.p
            {...contentReveal(0.15)}
            className="
              mb-4 max-w-[700px]
              text-[10px] font-extrabold
              uppercase tracking-[1.4px]
              text-[#E66A16]
              sm:text-[12px]
              lg:mb-5 lg:tracking-[1.8px]
            "
          >
            Agricultural Commodities • Corn Processing • Frozen Foods
          </motion.p>

          {/* HEADING */}
          <motion.h1
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: disableHeavyAnimations ? 0 : -70,
                    y: disableHeavyAnimations ? 12 : 0,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: disableHeavyAnimations ? 0.5 : 0.9,
              delay: disableHeavyAnimations ? 0 : 0.25,
              ease,
            }}
            className="
              relative z-30
              max-w-[1100px]
              text-[clamp(32px,8.5vw,70px)]
              font-black uppercase
              leading-[1.08]
              tracking-[-1.2px]
              text-white
              sm:tracking-[-2px]
              lg:text-[clamp(40px,5.6vw,70px)]
              lg:leading-[1.02]
              lg:tracking-[-2.5px]
            "
          >
            FROM NATURE'S
            <br />
            HARVEST TO
            <br />
            <span className="text-[#E9AC12]">
              INDUSTRIAL EXCELLENCE.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            {...contentReveal(0.45)}
            className="
              relative z-30
              mt-5 max-w-[570px]
              text-[13px] leading-[1.8]
              text-white/75
              sm:text-[15px]
              lg:mt-6
            "
          >
            Crunch & Crisp India LLP is a manufacturing and
            agricultural commodities company offering quality
            corn products, agricultural commodities and frozen
            food solutions for diverse business and industrial
            requirements.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            {...contentReveal(0.6)}
            className="
              pointer-events-auto relative z-30
              mt-7 flex flex-wrap
              items-center gap-3
              lg:mt-8
            "
          >
            <Link
              to="/products"
              className="
                group inline-flex min-h-[48px]
                items-center justify-center gap-2
                rounded-lg
                bg-gradient-to-r
                from-[#E66A16] to-[#E9AC12]
                px-5 text-[12px]
                font-extrabold text-white
                transition-transform duration-200
                active:scale-[0.98]
                sm:min-h-[51px]
                sm:px-6 sm:text-[13px]
                lg:hover:-translate-y-1
              "
            >
              Explore Our Products

              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 lg:group-hover:translate-x-1 lg:group-hover:-translate-y-1"
              />
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex min-h-[48px]
                items-center justify-center gap-2
                rounded-lg border border-[#E9AC12]
                bg-white/5 px-5
                text-[12px] font-extrabold
                text-white
                transition-colors duration-200
                active:scale-[0.98]
                sm:min-h-[51px]
                sm:px-6 sm:text-[13px]
                lg:hover:bg-[#E9AC12]
                lg:hover:text-[#202A38]
              "
            >
              Get a Bulk Quote
              <MessageCircle size={17} />
            </a>
          </motion.div>
        </div>

        {/* ======================================
            RIGHT HERO IMAGE
        ====================================== */}

        <div
          onPointerMove={handleMouseMove}
          onPointerLeave={resetMouse}
          className="
            relative order-2
            mt-5 flex h-[250px]
            items-center justify-center
            sm:h-[350px]
            lg:absolute lg:inset-y-0
            lg:right-[-5%]
            lg:order-none lg:mt-0
            lg:h-full lg:w-[63%]
          "
          style={{
            perspective: disableHeavyAnimations
              ? "none"
              : "1200px",
          }}
        >
          {/* BACK GLOW - DESKTOP ONLY */}
          <div
            className="
              pointer-events-none absolute
              hidden h-[380px] w-[380px]
              rounded-full bg-[#E9AC12]/12
              blur-[75px]
              lg:block lg:h-[480px] lg:w-[480px]
            "
          />

          {/* DESKTOP FALL ANIMATION */}
          <motion.div
            initial={
              disableHeavyAnimations
                ? false
                : {
                    y: -750,
                    rotateZ: -28,
                    rotateY: -30,
                    scale: 0.7,
                    opacity: 0,
                  }
            }
            animate={{
              y: 0,
              rotateZ: 0,
              rotateY: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={
              disableHeavyAnimations
                ? { duration: 0 }
                : {
                    y: {
                      type: "spring",
                      stiffness: 95,
                      damping: 13,
                      mass: 1.1,
                      delay: 0.15,
                    },
                    rotateZ: {
                      duration: 1.2,
                      ease,
                    },
                    rotateY: {
                      duration: 1.2,
                      ease,
                    },
                    scale: {
                      duration: 1.1,
                      ease,
                    },
                    opacity: {
                      duration: 0.25,
                    },
                  }
            }
            onAnimationComplete={() => setLanded(true)}
            className="
              relative flex h-full w-full
              items-center justify-center
            "
            style={{
              transformStyle: disableHeavyAnimations
                ? "flat"
                : "preserve-3d",
            }}
          >
            {/* MOUSE TILT */}
            <motion.div
              style={
                disableHeavyAnimations
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }
              }
              className="
                relative flex h-full w-full
                items-center justify-center
              "
            >
              {/* FLOATING IMAGE */}
              <motion.div
                animate={
                  landed && !disableHeavyAnimations
                    ? {
                        y: [0, -12, 0],
                        rotateZ: [0, 1.5, -1.5, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative flex h-full w-full
                  items-center justify-center
                "
              >
                <img
                  src="/hero.png"
                  alt="Premium golden corn products"
                  fetchPriority="high"
                  decoding="async"
                  className="
                    relative z-10
                    max-h-[200px] w-full
                    object-contain
                    sm:max-h-[360px]
                    lg:ml-40
                    lg:max-h-[620px]
                    lg:w-[110%]
                    lg:drop-shadow-[0_30px_35px_rgba(0,0,0,0.45)]
                  "
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* GOLDEN CORN TEXT */}
          <motion.span
            initial={
              disableHeavyAnimations
                ? false
                : {
                    opacity: 0,
                    scale: 0.7,
                    rotate: -25,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -12,
            }}
            transition={{
              duration: disableHeavyAnimations ? 0 : 0.8,
              delay: disableHeavyAnimations ? 0 : 1.2,
            }}
            className="
              pointer-events-none absolute
              bottom-[3%] right-[2%] z-20
              text-[clamp(23px,5vw,50px)]
              font-black italic
              tracking-[-1px]
              text-[#E9AC12]
              lg:bottom-[12%] lg:right-[3%]
              lg:tracking-[-2px]
            "
          >
            GOLDEN CORN
          </motion.span>
        </div>
      </div>

      {/* BOTTOM ACCENT */}
      <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-[#E66A16]" />
    </section>
  );
}
