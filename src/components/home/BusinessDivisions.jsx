
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Wheat,
  Sprout,
  Snowflake,
  ArrowUpRight,
} from "lucide-react";

const divisions = [
  {
    number: "01",
    title: "Corn Processing Products",
    description:
      "Corn Grits, Crushed Maize, Corn Powder, Corn Germ and Corn Cob for commercial and industrial applications.",
    icon: Wheat,
    image: "/corn.jpg",
    tag: "CORN PROCESSING",
  },
  {
    number: "02",
    title: "Agricultural Commodities",
    description:
      "Agricultural commodity solutions supporting bulk procurement and business supply requirements.",
    icon: Sprout,
    image: "/about1.jpg",
    tag: "AGRICULTURAL SUPPLY",
  },
  {
    number: "03",
    title: "Frozen Food Products",
    description:
      "Frozen food solutions for food businesses, distributors and commercial buyers.",
    icon: Snowflake,
    image: "/fresh.png",
    tag: "FROZEN FOODS",
  },
];

const ease = [0.22, 1, 0.36, 1];

function DivisionCard({ division, index, reduceMotion }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);

  const rotateY = useSpring(mouseX, {
    stiffness: 110,
    damping: 22,
    mass: 0.7,
  });

  const rotateX = useSpring(mouseY, {
    stiffness: 110,
    damping: 22,
    mass: 0.7,
  });

  const Icon = division.icon;

  const handlePointerMove = (event) => {
    if (
      reduceMotion ||
      event.pointerType !== "mouse" ||
      !cardRef.current
    ) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    mouseX.set((x - 0.5) * 16);
    mouseY.set((0.5 - y) * 13);

    lightX.set(x * 100);
    lightY.set(y * 100);
  };

  const resetCard = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    lightX.set(50);
    lightY.set(50);
  };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 65,
              rotateY: index === 0 ? -20 : index === 2 ? 20 : 0,
              scale: 0.94,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration: 0.85,
        delay: index * 0.12,
        ease,
      }}
      className="h-full w-full"
      style={{
        perspective: "1200px",
      }}
    >
      <motion.article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={resetCard}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative isolate flex h-full min-h-[430px] w-full flex-col justify-between rounded-[22px] border border-white/20 bg-[#142131] p-7 text-white shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow] duration-500 hover:border-[#E9AC12]/60 hover:shadow-[0_30px_65px_rgba(0,0,0,0.3)] sm:min-h-[460px] sm:p-8"
      >
        {/* IMAGE BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
          <motion.img
            src={division.image}
            alt={division.title}
            loading="lazy"
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: hovered ? 1.16 : 1.06,
                  }
            }
            transition={{
              duration: 0.8,
              ease,
            }}
            className="h-full w-full object-cover"
          />

          {/* DARK GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#101B29]/60 via-[#152131]/75 to-[#0D1725]/95" />
        </div>

        {/* INTERACTIVE GOLDEN LIGHT */}
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]"
          style={{
            background: useMotionValue(
              "radial-gradient(circle at 50% 50%, rgba(233,172,18,0.18), transparent 55%)"
            ),
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: hovered
                ? `radial-gradient(circle at ${lightX.get()}% ${lightY.get()}%, rgba(233,172,18,0.23), transparent 55%)`
                : "transparent",
            }}
          />
        </motion.div>

        {/* EDGE LIGHT */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/10 transition-colors duration-500 group-hover:border-[#E9AC12]/40" />

        {/* TOP 3D CONTENT */}
        <div
          className="relative flex items-start justify-between gap-4"
          style={{
            transform: "translateZ(48px)",
          }}
        >
          <motion.div
            animate={
              hovered && !reduceMotion
                ? {
                    rotateY: [0, 12, 0],
                    scale: [1, 1.08, 1],
                  }
                : {
                    rotateY: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: 2.5,
              repeat: hovered && !reduceMotion ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="flex h-[64px] w-[64px] items-center justify-center rounded-[17px] border border-[#E9AC12]/30 bg-white/10 text-[#F5BC47] backdrop-blur-md transition-colors duration-500 group-hover:bg-[#E66A16] group-hover:text-white"
          >
            <Icon size={31} strokeWidth={1.6} />
          </motion.div>

          <span className="text-[70px] font-black leading-none tracking-[-4px] text-white/20 transition-colors duration-500 group-hover:text-[#F4B51C]/45">
            {division.number}
          </span>
        </div>

        {/* BOTTOM 3D CONTENT */}
        <div
          className="relative mt-14 flex flex-1 flex-col justify-end"
          style={{
            transform: "translateZ(35px)",
          }}
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#F4B51C]">
            {division.tag}
          </span>

          <h3 className="mt-3 max-w-[310px] text-[clamp(23px,2.2vw,29px)] font-extrabold leading-[1.25] tracking-[-0.7px]">
            {division.title}
          </h3>

          <div className="mt-5 h-[2px] w-12 bg-[#E66A16] transition-all duration-500 group-hover:w-24 group-hover:bg-[#F4B51C]" />

          <p className="mt-5 max-w-[330px] text-[13px] leading-[1.85] text-[#E1E6EC] sm:text-[14px]">
            {division.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1px] text-[#F4B51C]">
            <span>Explore Division</span>

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>

        {/* BOTTOM ACCENT */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-b-[22px] bg-gradient-to-r from-[#E66A16] to-[#F4B51C] transition-transform duration-500 group-hover:scale-x-100" />
      </motion.article>
    </motion.div>
  );
}

export default function BusinessDivisions() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="business-divisions"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* FIXED BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      />

      {/* NAVY OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-[#142131]/90" />

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[450px] w-[450px] rounded-full bg-[#E66A16]/10 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-[450px] w-[450px] rounded-full bg-[#E9AC12]/10 blur-[110px]" />

      {/* TOP GOLD LINE */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E9AC12]/60 to-transparent" />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:gap-7">
          {divisions.map((division, index) => (
            <DivisionCard
              key={division.number}
              division={division}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM GOLD LINE */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E9AC12]/50 to-transparent" />
    </section>
  );
}
