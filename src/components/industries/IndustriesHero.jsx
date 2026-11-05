
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Factory,
  Wheat,
  PackageCheck,
  ArrowDown,
} from "lucide-react";

const HERO_IMAGE = "/industries.jpg";

const ease = [0.22, 1, 0.36, 1];

const industries = [
  "Food Processing",
  "Snack Manufacturing",
  "Animal & Poultry Feed",
  "Agricultural Businesses",
  "Rice & Grain Distribution",
  "Spice Processing",
  "Frozen Food Businesses",
];

export default function IndustriesHero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 30,
        },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.85,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="industries-hero"
      className="relative isolate overflow-hidden bg-[#172435] text-white"
    >
      {/* ======================================
          BACKGROUND DETAILS
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_55%,rgba(233,172,18,0.08),transparent_55%)]" />

        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute -left-28 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[#E66A16]/10 blur-[100px]" />
      </div>

      {/* ======================================
          MAIN GRID
      ====================================== */}

      <div className="mx-auto grid min-h-[550px] max-w-[1450px] grid-cols-1 items-center gap-12 px-5 pb-14 pt-16 sm:px-8 lg:min-h-[620px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-12 lg:pb-16 lg:pt-20">

        {/* ======================================
            LEFT CONTENT
        ====================================== */}

        <div className="relative z-10">
          {/* EYEBROW */}
          <motion.div
            {...reveal(0.1)}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-[2px] w-9 bg-[#E9AC12]" />

            <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#E9AC12] sm:text-[11px]">
              INDUSTRIES WE SERVE
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            {...reveal(0.2)}
            className="max-w-[770px] text-[clamp(34px,4.2vw,60px)] font-black leading-[1.12] tracking-[-1.5px]"
          >
            Quality Products.
            <span className="block text-[#E9AC12]">
              Diverse Industries.
            </span>

            <span className="relative mt-2 inline-block">
              Trusted Supply.
              <span className="absolute -bottom-2 left-0 h-[4px] w-full origin-left rounded-full bg-[#E66A16]" />
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            {...reveal(0.35)}
            className="mt-9 max-w-[590px] border-l-[3px] border-[#E9AC12] pl-5 text-[14px] leading-[1.9] text-[#CDD6E0] sm:text-[15px]"
          >
            From corn processing and agricultural commodities
            to Premium Basmati Rice, Turmeric, Indian Spices
            and Frozen Foods, our diverse product portfolio
            supports the sourcing and supply requirements
            of businesses across multiple industries.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            {...reveal(0.5)}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a
              href="#industries-list"
              className="group inline-flex items-center gap-4 rounded-lg bg-[#E66A16] px-7 py-4 text-[13px] font-extrabold transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9AC12] hover:text-[#172435]"
            >
              Explore Industries

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#industries-list"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#D8E0E8] transition-colors hover:text-[#E9AC12]"
            >
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />

              Discover Our Reach
            </a>
          </motion.div>
        </div>

        {/* ======================================
            RIGHT VISUAL
        ====================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 60,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.1,
            delay: reduceMotion ? 0 : 0.25,
            ease,
          }}
          className="relative mx-auto w-full max-w-[550px] lg:ml-auto"
        >
          {/* GOLD OFFSET FRAME */}
          <div className="absolute -right-3 -top-3 h-full w-full rounded-[28px] border border-[#E9AC12]/50 sm:-right-5 sm:-top-5" />

          {/* MAIN IMAGE */}
          <div className="group relative h-[310px] overflow-hidden rounded-[24px] bg-[#26384A] sm:h-[400px] lg:h-[465px]">
            <motion.img
              src={HERO_IMAGE}
              alt="Agricultural products, grains and spices supporting commercial industries"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
              initial={{
                scale: reduceMotion ? 1 : 1.12,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 1.7,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.06,
                    }
              }
            />

            {/* IMAGE OVERLAY */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101B2C]/80 via-transparent to-[#101B2C]/10" />

            {/* IMAGE BOTTOM TEXT */}
            <div className="absolute bottom-7 left-7 right-7">
              <span className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#F4C76A]">
                CRUNCH & CRISP INDIA LLP
              </span>

              <p className="mt-2 text-[20px] font-bold leading-[1.3] text-white sm:text-[24px]">
                Connecting Quality Products
                <br />
                with Diverse Industries.
              </p>
            </div>
          </div>

          {/* ======================================
              FLOATING INDUSTRY BADGE
          ====================================== */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -9, 0],
                  }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-2 top-[14%] flex items-center gap-3 rounded-xl border border-white/15 bg-white px-3 py-3 text-[#202A38] shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:-left-10 sm:px-5 sm:py-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF3DF] text-[#E66A16]">
              <Factory size={21} />
            </span>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[1px] text-[#8B929A]">
                INDUSTRY FOCUSED
              </span>

              <span className="block text-[12px] font-extrabold sm:text-[13px]">
                B2B Supply Solutions
              </span>
            </div>
          </motion.div>

          {/* ======================================
              SMALL CORNER BADGE
          ====================================== */}

          <div className="absolute -bottom-5 right-5 flex h-[85px] w-[85px] flex-col items-center justify-center rounded-full border-[5px] border-[#172435] bg-[#E9AC12] text-[#172435] shadow-xl sm:h-[100px] sm:w-[100px]">
            <Wheat size={25} strokeWidth={1.8} />

            <span className="mt-1 text-[9px] font-black uppercase tracking-[0.5px]">
              QUALITY
            </span>

            <span className="text-[9px] font-black uppercase tracking-[0.5px]">
              PRODUCTS
            </span>
          </div>
        </motion.div>
      </div>

      {/* ======================================
          BOTTOM INDUSTRY STRIP
      ====================================== */}

      <div className="relative border-t border-white/10 bg-[#111D2B]">
        <div className="mx-auto flex max-w-[1450px] items-center gap-6 overflow-x-auto px-5 py-5 sm:px-8 lg:px-12">
          <span className="flex shrink-0 items-center gap-2 border-r border-white/20 pr-6 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#E9AC12]">
            <PackageCheck size={17} />
            OUR REACH
          </span>

          <div className="flex items-center gap-8">
            {industries.map((industry) => (
              <span
                key={industry}
                className="flex shrink-0 items-center gap-3 text-[11px] font-semibold text-[#CBD5DF]"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-[#E9AC12]" />

                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
