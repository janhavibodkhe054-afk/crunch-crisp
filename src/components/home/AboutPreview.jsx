
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Wheat,
  PackageCheck,
  Sparkles,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

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

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/* ======================================
   MAIN COMPONENT
====================================== */

export default function AboutPreview() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const disableHeavyAnimations = isMobile || reduceMotion;

  const sceneRef = useRef(null);

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
      event.pointerType !== "mouse" ||
      !sceneRef.current
    ) {
      return;
    }

    const rect = sceneRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 13);
    mouseY.set(-y * 11);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* ======================================
     ANIMATION SETTINGS
  ====================================== */

  const imageReveal = (delay = 0) => ({
    initial: reduceMotion
      ? false
      : disableHeavyAnimations
      ? {
          opacity: 0,
          y: 16,
        }
      : {
          opacity: 0,
          y: 45,
          scale: 0.94,
        },

    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },

    viewport: {
      once: true,
      amount: 0.15,
    },

    transition: {
      duration: disableHeavyAnimations ? 0.45 : 0.85,
      delay: disableHeavyAnimations ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="about"
      className="
        relative isolate overflow-hidden
        bg-[#FCFCFB]
        py-12 sm:py-16 lg:py-20
      "
    >
      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_45%,#FFF5E9_0%,#FCFCFB_48%,#FFFFFF_100%)]" />

      {/* GRID TEXTURE - DESKTOP ONLY */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-[0.16] lg:block"
        style={{
          backgroundImage:
            "linear-gradient(#D9DDE1 1px, transparent 1px), linear-gradient(90deg, #D9DDE1 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage:
            "linear-gradient(to right, black, transparent 70%)",
        }}
      />

      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_1fr] lg:gap-14">

          {/* ======================================
              LEFT IMAGE COMPOSITION
          ====================================== */}

          <div
            ref={sceneRef}
            onPointerMove={handleMouseMove}
            onPointerLeave={resetMouse}
            className="
              relative mx-auto
              h-[310px] w-full max-w-[660px]
              min-w-0
              sm:h-[430px]
              lg:h-[540px]
            "
            style={{
              perspective: disableHeavyAnimations
                ? "none"
                : "1200px",
            }}
          >
            {/* 3D STAGE */}
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
              className="absolute inset-0"
            >
              {/* BACK PANEL */}
              <div
                className="
                  absolute left-[18%] top-[12%]
                  h-[76%] w-[69%]
                  rounded-[22px]
                  border border-[#E9AC12]/20
                  bg-gradient-to-br
                  from-[#F8E9D6] to-[#FFF5E7]
                  lg:rounded-[28px]
                "
              />

              {/* DECORATIVE LINES - DESKTOP ONLY */}
              <div
                className="pointer-events-none absolute left-[25%] top-[18%] hidden h-[60%] w-[60%] rounded-[22px] opacity-40 lg:block"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0px, transparent 17px, #E5BC8C 18px, transparent 19px, transparent 36px)",
                  transform: "translateZ(-50px)",
                }}
              />

              {/* ======================================
                  IMAGE 01
              ====================================== */}

              <motion.div
                {...imageReveal(0.12)}
                className="
                  absolute left-[2%] top-[2%]
                  z-10 h-[66%] w-[65%]
                "
              >
                <motion.div
                  animate={
                    disableHeavyAnimations
                      ? undefined
                      : {
                          y: [0, -12, 0],
                          rotateY: [0, 4, -3, 0],
                          rotateX: [0, -2, 2, 0],
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat: disableHeavyAnimations
                      ? 0
                      : Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-full w-full"
                  style={{
                    transformStyle: disableHeavyAnimations
                      ? "flat"
                      : "preserve-3d",
                  }}
                >
                  <div
                    className="
                      group relative h-full w-full
                      overflow-hidden rounded-[18px]
                      border-[4px] border-white
                      bg-[#F1E6D7]
                      shadow-[0_12px_30px_rgba(32,42,56,0.15)]
                      lg:rounded-[22px]
                      lg:border-[6px]
                      lg:shadow-[0_24px_55px_rgba(32,42,56,0.18)]
                    "
                  >
                    <img
                      src="/corn.jpg"
                      alt="Corn agriculture and agricultural production"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="
                        h-full w-full object-cover
                        lg:transition-transform
                        lg:duration-700
                        lg:group-hover:scale-110
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/20 to-transparent" />
                  </div>

                  {/* FLOATING LABEL */}
                  <div
                    className="
                      absolute -bottom-3 -left-2
                      flex items-center gap-2
                      rounded-[10px]
                      border border-[#F0E3D0]
                      bg-white px-2.5 py-2
                      shadow-[0_5px_15px_rgba(32,42,56,0.1)]
                      sm:px-3
                      lg:-bottom-4
                      lg:-left-3
                      lg:rounded-[12px]
                    "
                  >
                    <Wheat
                      size={16}
                      className="text-[#E66A16]"
                    />

                    <span className="text-[9px] font-extrabold text-[#202A38] sm:text-[10px]">
                      AGRICULTURE
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* ======================================
                  IMAGE 02
              ====================================== */}

              <motion.div
                {...imageReveal(0.3)}
                className="
                  absolute bottom-[1%] right-[1%]
                  z-20 h-[56%] w-[63%]
                "
              >
                <motion.div
                  animate={
                    disableHeavyAnimations
                      ? undefined
                      : {
                          y: [0, 10, 0],
                          rotateY: [0, -5, 3, 0],
                          rotateX: [0, 3, -2, 0],
                        }
                  }
                  transition={{
                    duration: 8,
                    repeat: disableHeavyAnimations
                      ? 0
                      : Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="relative h-full w-full"
                  style={{
                    transformStyle: disableHeavyAnimations
                      ? "flat"
                      : "preserve-3d",
                  }}
                >
                  <div
                    className="
                      group relative h-full w-full
                      overflow-hidden rounded-[18px]
                      border-[4px] border-white
                      bg-[#F1E6D7]
                      shadow-[0_12px_30px_rgba(32,42,56,0.16)]
                      lg:rounded-[22px]
                      lg:border-[6px]
                      lg:shadow-[0_28px_60px_rgba(32,42,56,0.22)]
                    "
                  >
                    <img
                      src="/basmati.jpg"
                      alt="Corn products and agricultural supply"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="
                        h-full w-full object-cover
                        lg:transition-transform
                        lg:duration-700
                        lg:group-hover:scale-110
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/20 to-transparent" />
                  </div>

                  {/* FLOATING LABEL */}
                  <div
                    className="
                      absolute -bottom-3 right-1
                      flex items-center gap-2
                      rounded-[10px]
                      border border-[#F0E3D0]
                      bg-white px-2.5 py-2
                      shadow-[0_5px_15px_rgba(32,42,56,0.1)]
                      sm:right-3 sm:px-3
                      lg:-bottom-4
                      lg:rounded-[12px]
                    "
                  >
                    <PackageCheck
                      size={16}
                      className="text-[#E66A16]"
                    />

                    <span className="whitespace-nowrap text-[9px] font-extrabold text-[#202A38] sm:text-[10px]">
                      INDUSTRIAL SUPPLY
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* ======================================
                  DESKTOP DECORATIVE ELEMENTS
              ====================================== */}

              {!disableHeavyAnimations && (
                <>
                  {/* ROTATING ORBIT */}
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none absolute
                      -bottom-2 left-[7%]
                      hidden h-[110px] w-[110px]
                      rounded-full
                      border-2 border-dashed
                      border-[#E9AC12]/50
                      lg:block
                    "
                  />

                  {/* SPARKLE */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 20, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none absolute
                      right-[5%] top-[4%]
                      hidden text-[#E9AC12]
                      lg:block
                    "
                  >
                    <Sparkles size={26} />
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>

          {/* ======================================
              RIGHT CONTENT
          ====================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: disableHeavyAnimations ? 0 : 55,
                    y: disableHeavyAnimations ? 14 : 0,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: disableHeavyAnimations ? 0.45 : 0.85,
              delay: disableHeavyAnimations ? 0 : 0.2,
              ease,
            }}
            className="w-full min-w-0 max-w-[690px]"
          >
            {/* EYEBROW */}
            <div className="mb-4 flex items-center gap-3 lg:mb-5">
              <span className="h-[2px] w-8 bg-[#E66A16] lg:w-9" />

              <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#E66A16] sm:text-[12px] sm:tracking-[2.5px]">
                WHO WE ARE
              </span>
            </div>

            {/* HEADING */}
            <h2
              className="
                text-[clamp(30px,6vw,52px)]
                font-extrabold leading-[1.13]
                tracking-[-1.2px]
                text-[#202A38]
                lg:text-[clamp(32px,3.5vw,52px)]
                lg:tracking-[-1.5px]
              "
            >
              Connecting Agriculture
              <span className="block text-[#E66A16]">
                with Industry.
              </span>
            </h2>

            {/* PARAGRAPH 1 */}
            <p className="mt-5 text-[13px] leading-[1.8] text-[#5B6470] sm:text-[15px] lg:mt-6 lg:leading-[1.85]">
              Crunch & Crisp India LLP is engaged in the
              manufacturing and supply of corn-based products,
              agricultural commodities and frozen foods, serving
              the diverse requirements of commercial and
              industrial businesses. Our product portfolio
              includes corn grits, crushed maize, corn powder,
              corn germ and corn cob, along with agricultural
              commodity and frozen food solutions. We cater to
              food processing businesses, snack manufacturers,
              animal and poultry feed manufacturers, agricultural
              buyers, distributors and other industries that
              require dependable product sourcing.
            </p>

            {/* PARAGRAPH 2 */}
            <p className="mt-4 text-[13px] leading-[1.8] text-[#5B6470] sm:text-[15px] lg:leading-[1.85]">
              With a strong focus on product quality, consistency
              and practical business requirements, we aim to
              provide suitable solutions for commercial and bulk
              procurement needs. We understand that every
              industry has different expectations when it comes
              to product specifications, quantities and supply
              requirements. By maintaining a customer-focused
              approach and clear business communication,
              Crunch & Crisp India LLP is committed to
              developing reliable, transparent and long-term
              relationships with its customers and business
              partners.
            </p>

            {/* CTA */}
            <Link
              to="/about"
              className="
                group mt-7 inline-flex
                min-h-[48px]
                items-center justify-center gap-3
                rounded-[10px]
                bg-gradient-to-r
                from-[#E66A16] to-[#E9AC12]
                px-6 text-[13px]
                font-extrabold text-white
                shadow-[0_6px_18px_rgba(230,106,22,0.16)]
                transition-transform duration-200
                active:scale-[0.98]
                sm:px-7
                lg:mt-8
                lg:hover:-translate-y-1
              "
            >
              More About Us

              <ArrowUpRight
                size={18}
                className="lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
