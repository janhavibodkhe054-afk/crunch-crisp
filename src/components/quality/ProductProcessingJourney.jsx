
import React from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Sprout,
  Settings2,
  ClipboardCheck,
  Package,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";

/* =========================================
   PRODUCT PROCESSING STEPS
========================================= */

const steps = [
  {
    no: "01",
    title: "Raw Material Selection",
    description:
      "Understanding the required agricultural raw material.",
    image: "/pr1.png",
    icon: Sprout,
    tag: "AGRICULTURAL SOURCING",
  },
  {
    no: "02",
    title: "Processing & Preparation",
    description:
      "Preparing products according to the relevant product category.",
    image: "/pr2.png",
    icon: Settings2,
    tag: "PRODUCT PREPARATION",
  },
  {
    no: "03",
    title: "Quality Review",
    description:
      "Reviewing applicable product specifications and customer requirements.",
    image: "/pr3.png",
    icon: ClipboardCheck,
    tag: "PRODUCT SPECIFICATIONS",
  },
  {
    no: "04",
    title: "Packaging",
    description:
      "Discussing suitable packaging for product handling and supply.",
    image: "/pr4.png",
    icon: Package,
    tag: "PACKAGING NEEDS",
  },
  {
    no: "05",
    title: "Order Coordination",
    description:
      "Coordinating confirmed commercial requirements.",
    image: "/pr5.png",
    icon: ClipboardList,
    tag: "COMMERCIAL COORDINATION",
  },
];

const ease = [0.22, 1, 0.36, 1];

/* =========================================
   PREMIUM HOVER IMAGE COMPONENT
========================================= */

function ProcessingImage({
  step,
  reverse,
  reduceMotion,
}) {
  return (
    <motion.div
      initial="rest"
      whileHover={reduceMotion ? "rest" : "hover"}
      className="group relative"
      style={{
        perspective: "1200px",
      }}
    >
      {/* GOLDEN OUTER FRAME */}
      <motion.div
        aria-hidden="true"
        variants={{
          rest: {
            opacity: 0,
            scale: 0.97,
            rotate: 0,
          },
          hover: {
            opacity: 1,
            scale: 1.035,
            rotate: reverse ? -1 : 1,
          },
        }}
        transition={{
          duration: 0.45,
          ease,
        }}
        className="pointer-events-none absolute inset-0 rounded-[20px] border-2 border-[#E9AC12]"
      />

      {/* MAIN IMAGE CARD */}
      <motion.div
        variants={{
          rest: {
            rotateX: 0,
            rotateY: 0,
            y: 0,
          },
          hover: {
            rotateX: 3,
            rotateY: reverse ? -5 : 5,
            y: -7,
          },
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="relative h-[210px] overflow-hidden rounded-[18px] bg-[#DDE1E5] shadow-[0_14px_40px_rgba(32,42,56,0.10)] sm:h-[260px] lg:h-[245px]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* CINEMATIC IMAGE ZOOM */}
        <motion.img
          src={step.image}
          alt={step.title}
          loading="lazy"
          draggable={false}
          variants={{
            rest: {
              scale: 1,
              x: 0,
            },
            hover: {
              scale: 1.16,
              x: reverse ? -8 : 8,
            },
          }}
          transition={{
            duration: 0.85,
            ease,
          }}
          className="h-full w-full object-cover"
        />

        {/* DARK GRADIENT */}
        <motion.div
          variants={{
            rest: {
              opacity: 0.75,
            },
            hover: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.4,
          }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111923]/75 via-[#111923]/10 to-transparent"
        />

        {/* GOLDEN LIGHT SWEEP */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            variants={{
              rest: {
                x: "-180%",
                opacity: 0,
              },
              hover: {
                x: "420%",
                opacity: 0.85,
              },
            }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-[30%] rotate-[22deg] bg-gradient-to-r from-transparent via-[#FFE3A0]/45 to-transparent blur-[15px]"
          />
        )}

        {/* TOP LEFT GOLD CORNER */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: {
              opacity: 0,
              x: -10,
              y: -10,
            },
            hover: {
              opacity: 1,
              x: 0,
              y: 0,
            },
          }}
          transition={{
            duration: 0.4,
          }}
          className="pointer-events-none absolute left-4 top-4 h-9 w-9 rounded-tl-lg border-l-[3px] border-t-[3px] border-[#F4BD43]"
        />

        {/* BOTTOM RIGHT GOLD CORNER */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: {
              opacity: 0,
              x: 10,
              y: 10,
            },
            hover: {
              opacity: 1,
              x: 0,
              y: 0,
            },
          }}
          transition={{
            duration: 0.4,
          }}
          className="pointer-events-none absolute bottom-4 right-4 h-9 w-9 rounded-br-lg border-b-[3px] border-r-[3px] border-[#F4BD43]"
        />

        {/* IMAGE TAG */}
        <motion.div
          variants={{
            rest: {
              y: 0,
              scale: 1,
            },
            hover: {
              y: -5,
              scale: 1.04,
            },
          }}
          transition={{
            duration: 0.35,
          }}
          className="absolute bottom-5 left-5 z-10"
        >
          <span className="inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[9px] font-extrabold tracking-[1.4px] text-white backdrop-blur-md">
            {step.tag}
          </span>
        </motion.div>

        {/* FLOATING STEP NUMBER */}
        <motion.span
          variants={{
            rest: {
              y: 0,
              scale: 1,
              opacity: 0.35,
            },
            hover: {
              y: -8,
              scale: 1.15,
              opacity: 0.9,
            },
          }}
          transition={{
            duration: 0.45,
            ease,
          }}
          className="pointer-events-none absolute right-4 top-3 text-[54px] font-black leading-none text-white"
        >
          {step.no}
        </motion.span>

        {/* ANIMATED BOTTOM LINE */}
        <motion.div
          aria-hidden="true"
          variants={{
            rest: {
              scaleX: 0,
            },
            hover: {
              scaleX: 1,
            },
          }}
          transition={{
            duration: 0.6,
            ease,
          }}
          className="absolute bottom-0 left-0 h-[4px] w-full origin-left bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-[#E66A16]"
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function ProductProcessingJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="processing-journey"
      className="relative overflow-hidden bg-[#F6F7F8] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-[#E9AC12]/5 blur-[100px]" />

        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#E66A16]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">

        {/* ======================================
            SECTION HEADER
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="mx-auto mb-12 max-w-[800px] text-center lg:mb-16"
        >
          {/* EYEBROW */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#D08C24]">
              PRODUCT PROCESSING JOURNEY
            </span>

            <span className="h-[2px] w-8 bg-[#E66A16]" />
          </div>

          {/* HEADING */}
          <h2 className="text-[clamp(30px,3.6vw,48px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#202A38]">
            A Thoughtful Journey,

            <span className="block text-[#E66A16]">
              From Requirement to Supply.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-5 max-w-[650px] text-[14px] leading-[1.9] text-[#73808D] sm:text-[15px]">
            Understanding raw materials, product preparation,
            specifications, packaging and order coordination
            to support different commercial requirements.
          </p>
        </motion.div>

        {/* ======================================
            PROCESSING JOURNEY
        ====================================== */}

        <div className="relative">

          {/* DESKTOP TIMELINE BASE */}
          <div className="absolute bottom-16 left-1/2 top-12 hidden w-[2px] -translate-x-1/2 bg-[#E0E4E8] lg:block" />

          {/* ANIMATED TIMELINE */}
          <motion.div
            initial={{
              scaleY: reduceMotion ? 1 : 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 2,
              ease,
            }}
            className="absolute bottom-16 left-1/2 top-12 hidden w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-[#E66A16] via-[#E9AC12] to-[#E66A16] lg:block"
          />

          {/* ALL 5 STEPS */}
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const reverse = index % 2 === 1;

              return (
                <motion.div
                  key={step.no}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08,
                    ease,
                  }}
                  className="relative grid items-center gap-6 lg:grid-cols-[1fr_60px_1fr] lg:gap-5"
                >
                  {/* IMAGE SIDE */}
                  <div
                    className={
                      reverse
                        ? "lg:col-start-3 lg:row-start-1"
                        : "lg:col-start-1 lg:row-start-1"
                    }
                  >
                    <ProcessingImage
                      step={step}
                      reverse={reverse}
                      reduceMotion={reduceMotion}
                    />
                  </div>

                  {/* ======================================
                      CENTER TIMELINE ICON
                  ====================================== */}

                  <div className="relative z-10 hidden items-center justify-center lg:col-start-2 lg:row-start-1 lg:flex">
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              scale: 1.15,
                              rotate: 12,
                            }
                      }
                      transition={{
                        duration: 0.35,
                      }}
                      className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[5px] border-[#F6F7F8] bg-[#202A38] text-white shadow-md"
                    >
                      <Icon size={20} />
                    </motion.div>
                  </div>

                  {/* ======================================
                      CONTENT SIDE
                  ====================================== */}

                  <div
                    className={
                      reverse
                        ? "lg:col-start-1 lg:row-start-1 lg:text-right"
                        : "lg:col-start-3 lg:row-start-1"
                    }
                  >
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -5,
                            }
                      }
                      transition={{
                        duration: 0.35,
                      }}
                      className="relative rounded-[16px] border border-[#E8EAED] bg-white px-6 py-6 shadow-[0_10px_35px_rgba(32,42,56,0.04)] sm:px-8 sm:py-8"
                    >
                      {/* STEP LABEL */}
                      <span className="text-[11px] font-black uppercase tracking-[2px] text-[#E66A16]">
                        STEP {step.no}
                      </span>

                      {/* STEP TITLE */}
                      <h3 className="mt-3 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.3] text-[#202A38]">
                        {step.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-3 text-[13px] leading-[1.9] text-[#74818D] sm:text-[14px]">
                        {step.description}
                      </p>

                      {/* BOTTOM LABEL */}
                      <div
                        className={`mt-5 flex items-center gap-2 text-[11px] font-bold text-[#D08C24] ${
                          reverse
                            ? "lg:justify-end"
                            : ""
                        }`}
                      >
                        <span>
                          PROCESS STEP {step.no}
                        </span>

                        <ArrowUpRight size={14} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================
            BOTTOM CTA
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[18px] bg-[#202A38] px-7 py-7 sm:flex-row sm:items-center sm:px-9"
        >
          <div>
            <h3 className="text-[18px] font-extrabold text-white">
              Let's Discuss Your Product Requirements.
            </h3>

            <p className="mt-2 text-[12px] leading-[1.8] text-[#C9D2DC]">
              Share your product specifications, required
              quantity and business needs with our team.
            </p>
          </div>

          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#E66A16] px-6 py-3.5 text-[12px] font-extrabold text-white transition-all duration-300 hover:bg-[#E9AC12] hover:text-[#202A38]"
          >
            Enquire Now

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
