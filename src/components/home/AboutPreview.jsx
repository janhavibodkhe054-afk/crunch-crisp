
import React, { useRef } from "react";
import { Link } from "react-router-dom";

import {
  motion,
  useInView,
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

export default function AboutPreview() {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  // Animation starts only when section enters viewport.
  // once:false allows replay when user scrolls away and returns.
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
    margin: "0px 0px -5% 0px",
  });

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

  const handleMouseMove = (event) => {
    if (reduceMotion || !sceneRef.current) return;
    if (event.pointerType !== "mouse") return;

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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden bg-[#FCFCFB] py-14 sm:py-16 lg:py-20"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_45%,#FFF5E9_0%,#FCFCFB_48%,#FFFFFF_100%)]" />

      {/* GRID TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(#D9DDE1 1px, transparent 1px), linear-gradient(90deg, #D9DDE1 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage:
            "linear-gradient(to right, black, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">

          {/* LEFT 3D IMAGE COMPOSITION */}
          <div
            ref={sceneRef}
            onPointerMove={handleMouseMove}
            onPointerLeave={resetMouse}
            className="relative mx-auto h-[370px] w-full max-w-[660px] sm:h-[470px] lg:h-[540px]"
            style={{ perspective: "1200px" }}
          >
            {/* MOUSE 3D STAGE */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0"
            >
              {/* BACK PANEL */}
              <motion.div
                initial={false}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                      }
                    : {
                        opacity: reduceMotion ? 1 : 0,
                        scale: reduceMotion ? 1 : 0.85,
                        rotateY: reduceMotion ? 0 : -25,
                      }
                }
                transition={{
                  duration: 0.8,
                  ease,
                }}
                className="absolute left-[18%] top-[12%] h-[76%] w-[69%] rounded-[28px] border border-[#E9AC12]/20 bg-gradient-to-br from-[#F8E9D6] to-[#FFF5E7]"
                style={{ z: -70 }}
              />

              {/* DECORATIVE LINES */}
              <div
                className="pointer-events-none absolute left-[25%] top-[18%] h-[60%] w-[60%] rounded-[22px] opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0px, transparent 17px, #E5BC8C 18px, transparent 19px, transparent 36px)",
                  transform: "translateZ(-50px)",
                }}
              />

              {/* IMAGE 01 — SCROLL ENTRY */}
              <motion.div
                initial={false}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        scale: 1,
                      }
                    : {
                        opacity: reduceMotion ? 1 : 0,
                        x: reduceMotion ? 0 : -140,
                        rotateY: reduceMotion ? 0 : -45,
                        scale: reduceMotion ? 1 : 0.85,
                      }
                }
                transition={{
                  duration: 1,
                  delay: isInView ? 0.12 : 0,
                  ease,
                }}
                className="absolute left-[2%] top-[2%] z-10 h-[66%] w-[65%]"
              >
                {/* CONTINUOUS FLOAT + 3D ROTATION */}
                <motion.div
                  animate={
                    isInView && !reduceMotion
                      ? {
                          y: [0, -12, 0],
                          rotateY: [0, 4, -3, 0],
                          rotateX: [0, -2, 2, 0],
                        }
                      : {
                          y: 0,
                          rotateY: 0,
                          rotateX: 0,
                        }
                  }
                  transition={{
                    duration: 7,
                    repeat:
                      isInView && !reduceMotion
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    z: 65,
                  }}
                >
                  <div className="group relative h-full w-full overflow-hidden rounded-[22px] border-[6px] border-white bg-[#F1E6D7] shadow-[0_24px_55px_rgba(32,42,56,0.18)]">
                    <img
                      src="/corn.jpg"
                      alt="Corn agriculture and agricultural production"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/20 to-transparent" />
                  </div>

                  {/* FLOATING LABEL */}
                  <div className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-[12px] border border-[#F0E3D0] bg-white px-3 py-2 shadow-[0_10px_25px_rgba(32,42,56,0.12)]">
                    <Wheat size={17} className="text-[#E66A16]" />

                    <span className="text-[10px] font-extrabold text-[#202A38]">
                      AGRICULTURE
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* IMAGE 02 — SCROLL ENTRY */}
              <motion.div
                initial={false}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        rotateZ: 0,
                        scale: 1,
                      }
                    : {
                        opacity: reduceMotion ? 1 : 0,
                        y: reduceMotion ? 0 : 140,
                        rotateX: reduceMotion ? 0 : 35,
                        rotateZ: reduceMotion ? 0 : -8,
                        scale: reduceMotion ? 1 : 0.85,
                      }
                }
                transition={{
                  duration: 1,
                  delay: isInView ? 0.3 : 0,
                  ease,
                }}
                className="absolute bottom-[1%] right-[1%] z-20 h-[56%] w-[63%]"
              >
                {/* CONTINUOUS FLOAT + 3D ROTATION */}
                <motion.div
                  animate={
                    isInView && !reduceMotion
                      ? {
                          y: [0, 10, 0],
                          rotateY: [0, -5, 3, 0],
                          rotateX: [0, 3, -2, 0],
                        }
                      : {
                          y: 0,
                          rotateY: 0,
                          rotateX: 0,
                        }
                  }
                  transition={{
                    duration: 8,
                    repeat:
                      isInView && !reduceMotion
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    z: 110,
                  }}
                >
                  <div className="group relative h-full w-full overflow-hidden rounded-[22px] border-[6px] border-white bg-[#F1E6D7] shadow-[0_28px_60px_rgba(32,42,56,0.22)]">
                    <img
                      src="/about1.jpg"
                      alt="Corn products and agricultural supply"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/20 to-transparent" />
                  </div>

                  {/* FLOATING LABEL */}
                  <div className="absolute -bottom-4 right-3 flex items-center gap-2 rounded-[12px] border border-[#F0E3D0] bg-white px-3 py-2 shadow-[0_10px_25px_rgba(32,42,56,0.12)]">
                    <PackageCheck
                      size={17}
                      className="text-[#E66A16]"
                    />

                    <span className="text-[10px] font-extrabold text-[#202A38]">
                      INDUSTRIAL SUPPLY
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* CONTINUOUS ROTATING ORBIT */}
              <motion.div
                aria-hidden="true"
                animate={
                  isInView && !reduceMotion
                    ? { rotate: 360 }
                    : { rotate: 0 }
                }
                transition={{
                  duration: 30,
                  repeat:
                    isInView && !reduceMotion
                      ? Infinity
                      : 0,
                  ease: "linear",
                }}
                className="pointer-events-none absolute -bottom-2 left-[7%] h-[110px] w-[110px] rounded-full border-2 border-dashed border-[#E9AC12]/50"
              />

              {/* FLOATING SPARKLE */}
              <motion.div
                animate={
                  isInView && !reduceMotion
                    ? {
                        y: [0, -12, 0],
                        rotate: [0, 20, 0],
                      }
                    : {
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 5,
                  repeat:
                    isInView && !reduceMotion
                      ? Infinity
                      : 0,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute right-[5%] top-[4%] text-[#E9AC12]"
              >
                <Sparkles size={26} />
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={false}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : {
                    opacity: reduceMotion ? 1 : 0,
                    x: reduceMotion ? 0 : 55,
                  }
            }
            transition={{
              duration: 0.85,
              delay: isInView ? 0.2 : 0,
              ease,
            }}
            className="w-full max-w-[690px]"
          >
            {/* EYEBROW */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#E66A16]" />

              <span className="text-[12px] font-extrabold uppercase tracking-[2.5px] text-[#E66A16]">
                WHO WE ARE
              </span>
            </div>

            {/* HEADING */}
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-extrabold leading-[1.13] tracking-[-1.5px] text-[#202A38]">
              Connecting Agriculture
              <span className="block text-[#E66A16]">
                with Industry.
              </span>
            </h2>

            {/* PARAGRAPH 1 */}
            <p className="mt-6 text-[14px] leading-[1.85] text-[#5B6470] sm:text-[15px]">
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
            <p className="mt-4 text-[14px] leading-[1.85] text-[#5B6470] sm:text-[15px]">
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
              className="group mt-8 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[10px] bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-7 text-[13px] font-extrabold text-white shadow-[0_10px_25px_rgba(230,106,22,0.18)] transition-transform duration-300 hover:-translate-y-1"
            >
              More About Us

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
