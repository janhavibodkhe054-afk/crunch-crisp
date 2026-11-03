
import React, { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const HERO_IMAGE = "/quality-hero.jpg";

const ease = [0.22, 1, 0.36, 1];

const particles = [
  { left: "8%", top: "20%", delay: 0, duration: 7 },
  { left: "18%", top: "75%", delay: 1, duration: 8 },
  { left: "38%", top: "15%", delay: 2, duration: 6 },
  { left: "55%", top: "80%", delay: 0.5, duration: 9 },
  { left: "72%", top: "18%", delay: 1.5, duration: 7 },
  { left: "90%", top: "65%", delay: 2.5, duration: 8 },
];

export default function QualityHero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  /* ======================================
     MOUSE PARALLAX
  ====================================== */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 65,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 65,
    damping: 25,
  });

  const imageRotateY = useTransform(
    smoothX,
    [-1, 1],
    [-5, 5]
  );

  const imageRotateX = useTransform(
    smoothY,
    [-1, 1],
    [4, -4]
  );

  const imageX = useTransform(
    smoothX,
    [-1, 1],
    [-8, 8]
  );

  const imageY = useTransform(
    smoothY,
    [-1, 1],
    [-6, 6]
  );

  const handleMouseMove = (event) => {
    if (
      reduceMotion ||
      event.pointerType === "touch" ||
      !sectionRef.current
    ) {
      return;
    }

    const rect =
      sectionRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const reveal = (delay = 0, x = 0, y = 24) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          x,
          y,
        },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
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
      id="quality-hero"
      onPointerMove={handleMouseMove}
      onPointerLeave={resetMouse}
      className="relative isolate overflow-hidden bg-[#172333] text-white"
    >
      {/* ======================================
          PREMIUM BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* BASE NAVY GRADIENT */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#111C2B_0%,#202A38_55%,#2C3947_100%)]" />

        {/* SOFT RIGHT SIDE LIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_45%,rgba(233,172,18,0.12),transparent_48%)]" />

        {/* SUBTLE GRID */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* DIAGONAL ACCENT */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(125deg,transparent 0px,transparent 125px,rgba(233,172,18,0.5) 126px,transparent 127px)",
          }}
        />

        {/* MOVING GOLDEN LIGHT */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            animate={{
              x: ["-110vw", "150vw"],
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-[60%] left-0 h-[220%] w-[25%] rotate-[22deg] bg-gradient-to-r from-transparent via-[#E9AC12]/10 to-transparent blur-[45px]"
          />
        )}

        {/* LEFT ORANGE GLOW */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 45, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-44 -left-32 h-[390px] w-[440px] rounded-full bg-[#E66A16]/15 blur-[105px]"
        />

        {/* RIGHT GOLD GLOW */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -35, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-28 -top-36 h-[400px] w-[450px] rounded-full bg-[#E9AC12]/15 blur-[110px]"
        />

        {/* DECORATIVE CIRCULAR RINGS */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-36 -top-44 h-[490px] w-[490px] rounded-full border border-[#E9AC12]/15"
        />

        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : { rotate: -360 }
          }
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-16 -top-24 h-[330px] w-[330px] rounded-full border border-dashed border-white/10"
        />

        {/* FLOATING PARTICLES */}
        {!reduceMotion &&
          particles.map((particle, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              className="absolute h-[3px] w-[3px] rounded-full bg-[#F4BD43] shadow-[0_0_10px_rgba(244,189,67,0.65)]"
              animate={{
                y: [0, -22, 0],
                x: [0, 10, 0],
                opacity: [0.15, 0.65, 0.15],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[470px] lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-14">

        {/* ======================================
            LEFT CONTENT
        ====================================== */}

        <div className="relative z-10">

          {/* EYEBROW */}
          <motion.div
            {...reveal(0.1, -25, 0)}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 38 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease,
              }}
              className="h-[2px] bg-[#E9AC12]"
            />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#F1C76D]">
              QUALITY & MANUFACTURING
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            {...reveal(0.2, 0, 35)}
            className="max-w-[650px] text-[clamp(34px,3.7vw,52px)] font-extrabold leading-[1.15] tracking-[-1.2px]"
          >
            Quality at the

            <span className="block bg-gradient-to-r from-[#F4B51C] via-[#FFD978] to-[#E9AC12] bg-clip-text text-transparent">
              Heart of Every Product.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            {...reveal(0.35)}
            className="mt-6 max-w-[560px] text-[14px] leading-[1.9] text-[#D9E0E8] sm:text-[15px]"
          >
            Our focus is on supplying corn-based products
            and agricultural commodities that meet the
            practical requirements of business and
            industrial customers.
          </motion.p>

          {/* CTA */}
          <motion.div
            {...reveal(0.5)}
            className="mt-8"
          >
            <motion.a
              href="#quality-approach"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.035,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-7 py-3.5 text-[13px] font-extrabold text-white shadow-[0_10px_28px_rgba(230,106,22,0.25)] transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(230,106,22,0.38)]"
            >
              Explore Our Approach

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>
          </motion.div>

          {/* SMALL TRUST DETAIL */}
          <motion.div
            {...reveal(0.65)}
            className="mt-8 flex items-center gap-3"
          >
            <CheckCircle2
              size={17}
              className="shrink-0 text-[#E9AC12]"
            />

            <span className="text-[11px] font-semibold uppercase tracking-[1.4px] text-white/65">
              Product Quality • Business Supply
            </span>
          </motion.div>
        </div>

        {/* ======================================
            RIGHT IMAGE AREA
        ====================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 45,
                  scale: 0.94,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease,
          }}
          className="relative z-10 mx-auto w-full max-w-[570px]"
        >
          {/* 3D IMAGE WRAPPER */}
          <motion.div
            style={{
              rotateX: reduceMotion ? 0 : imageRotateX,
              rotateY: reduceMotion ? 0 : imageRotateY,
              x: reduceMotion ? 0 : imageX,
              y: reduceMotion ? 0 : imageY,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            {/* GOLD DECORATIVE FRAME */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.4, 0.8, 0.4],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-2 -top-2 h-full w-full rounded-[22px] border-2 border-[#E9AC12]/45"
            />

            {/* IMAGE */}
            <div className="group relative h-[300px] overflow-hidden rounded-[20px] bg-[#263442] shadow-[0_25px_65px_rgba(0,0,0,0.28)] sm:h-[350px] lg:h-[370px]">

              <motion.img
                src={HERO_IMAGE}
                alt="Quality-focused corn products"
                initial={{
                  scale: reduceMotion ? 1 : 1.08,
                }}
                animate={
                  reduceMotion
                    ? { scale: 1 }
                    : {
                        scale: [1.05, 1.11, 1.05],
                      }
                }
                transition={{
                  duration: 13,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.14]"
              />

              {/* IMAGE GRADIENT */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C1420]/85 via-[#0C1420]/10 to-transparent" />

              {/* IMAGE TOP LABEL */}
              <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#202A38]/60 px-4 py-2 backdrop-blur-md">
                <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#F4C76A]">
                  CRUNCH & CRISP INDIA LLP
                </span>
              </div>

              {/* IMAGE BOTTOM TITLE */}
              <div className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7">
                <p className="max-w-[250px] text-[20px] font-extrabold leading-[1.25] text-white sm:text-[23px]">
                  Quality-Focused
                  <span className="block">
                    Products
                  </span>
                </p>
              </div>
            </div>

            {/* ======================================
                QUALITY CARD - FULLY VISIBLE
            ====================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 25,
                      scale: 0.9,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease,
              }}
              className="absolute bottom-5 right-3 z-30 sm:bottom-6 sm:right-5"
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-3 rounded-xl border border-white/70 bg-white px-3 py-3 text-[#202A38] shadow-[0_12px_35px_rgba(0,0,0,0.25)] sm:px-4"
              >
                {/* ICON */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#E66A16] to-[#E9AC12] text-white">
                  <ShieldCheck size={21} />
                </span>

                {/* TEXT */}
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[1px] text-[#85909C]">
                    OUR APPROACH
                  </span>

                  <span className="block text-[12px] font-extrabold sm:text-[13px]">
                    Quality-Focused Supply
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ======================================
          ANIMATED BOTTOM GOLD BORDER
      ====================================== */}

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <motion.div
          initial={{
            scaleX: reduceMotion ? 1 : 0,
          }}
          animate={{
            scaleX: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            ease,
          }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#E66A16] via-[#F4B51C] to-[#E66A16]"
        />
      </div>
    </section>
  );
}
