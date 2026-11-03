
import React, { useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  BadgeCheck,
  Layers3,
  PackageCheck,
  Factory,
  UsersRound,
  Handshake,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Quality-Focused Products",
    description:
      "Attention to product specifications, consistency and suitability for commercial requirements.",
    icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Diverse Product Portfolio",
    description:
      "A versatile range of corn processing products, agricultural commodities and frozen food solutions.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "B2B Supply Solutions",
    description:
      "Product sourcing and supply discussions tailored to commercial quantities and bulk requirements.",
    icon: PackageCheck,
  },
  {
    number: "04",
    title: "Industry-Oriented Approach",
    description:
      "Understanding the product needs of food processing, animal feed and agricultural businesses.",
    icon: Factory,
  },
  {
    number: "05",
    title: "Customer-Focused Service",
    description:
      "Clear communication and a practical approach to understanding individual business requirements.",
    icon: UsersRound,
  },
  {
    number: "06",
    title: "Long-Term Relationships",
    description:
      "Building lasting business connections through trust, transparency and consistent communication.",
    icon: Handshake,
  },
];

const ease = [0.22, 1, 0.36, 1];

function FeatureCard({ feature, index, reduceMotion }) {
  const [flipCount, setFlipCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [flipping, setFlipping] = useState(false);

  const Icon = feature.icon;

  const handleEnter = (event) => {
    if (event.pointerType !== "mouse") return;

    setHovered(true);

    if (!reduceMotion && !flipping) {
      setFlipping(true);
      setFlipCount((prev) => prev + 1);
    }
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
              scale: 0.95,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.08,
        ease,
      }}
      className="relative h-full"
      style={{
        perspective: "1100px",
      }}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {/* 360 DEGREE FLIP */}
      <motion.article
        animate={{
          rotateY: flipCount * 360,
        }}
        transition={{
          rotateY: {
            duration: 1.1,
            ease: [0.45, 0, 0.2, 1],
          },
        }}
        onAnimationComplete={() => setFlipping(false)}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="group relative flex h-full min-h-[245px] flex-col bg-white px-7 py-8 transition-[background-color,box-shadow] duration-300 hover:bg-[#FFFAF4] hover:shadow-[0_12px_35px_rgba(230,106,22,0.08)] sm:px-8"
      >
        {/* HOVER GOLDEN GLOW */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at 20% 15%, rgba(233,172,18,0.12), transparent 65%)",
          }}
        />

        {/* TOP ROW */}
        <div
          className="relative mb-7 flex items-center justify-between"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#FFF2E5] text-[#E66A16] transition-colors duration-300 group-hover:bg-[#E66A16] group-hover:text-white">
            <Icon size={26} strokeWidth={1.7} />
          </div>

          <span className="text-[34px] font-black leading-none tracking-[-2px] text-[#E8EBEF] transition-colors duration-300 group-hover:text-[#F3C78F]">
            {feature.number}
          </span>
        </div>

        {/* TITLE */}
        <h3
          className="relative text-[19px] font-extrabold leading-[1.35] tracking-[-0.4px] text-[#202A38]"
          style={{
            transform: "translateZ(18px)",
          }}
        >
          {feature.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="relative mt-3 max-w-[340px] text-[13.5px] leading-[1.8] text-[#687583]"
          style={{
            transform: "translateZ(14px)",
          }}
        >
          {feature.description}
        </p>

        {/* BOTTOM ACCENT */}
        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#E66A16] to-[#E9AC12] transition-[width] duration-500 group-hover:w-full" />

        {/* CORNER ARROW */}
        <ArrowUpRight
          size={17}
          className="absolute bottom-7 right-7 text-[#D1D6DC] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#E66A16]"
        />
      </motion.article>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FFFCF8] to-white" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="mx-auto mb-12 max-w-[760px] text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-[#E66A16]">
              WHY CHOOSE US
            </span>

            <span className="h-[2px] w-8 bg-[#E66A16]" />
          </div>

          <h2 className="text-[clamp(30px,3.5vw,46px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Focused on Quality.
            <span className="block text-[#E66A16] sm:inline">
              {" "}Built for Business.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-[1.85] text-[#74818D] sm:text-[15px]">
            Practical agricultural product solutions designed
            around the requirements of commercial buyers
            and industrial businesses.
          </p>
        </motion.div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 gap-px rounded-[20px] border border-[#E9EDEF] bg-[#E9EDEF] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* BOTTOM BRAND ACCENT */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#E9AC12]" />

          <span className="text-center text-[11px] font-bold uppercase tracking-[1.5px] text-[#9AA4AF]">
            Crunch & Crisp India LLP
          </span>

          <span className="h-px w-10 bg-[#E9AC12]" />
        </div>
      </div>
    </section>
  );
}
