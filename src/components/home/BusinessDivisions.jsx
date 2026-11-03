
import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";

import {
  Wheat,
  Sprout,
  Snowflake,
  ArrowUpRight,
} from "lucide-react";

/* ======================================
   DIVISION DATA
====================================== */

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

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

/* ======================================
   DIVISION CARD
====================================== */

function DivisionCard({
  division,
  index,
  disableHeavyAnimations,
  reduceMotion,
}) {
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

  const goldenLight = useMotionTemplate`
    radial-gradient(
      circle at ${lightX}% ${lightY}%,
      rgba(233,172,18,0.23),
      transparent 55%
    )
  `;

  const Icon = division.icon;

  /* ======================================
     DESKTOP MOUSE MOVEMENT
  ====================================== */

  const handlePointerMove = (event) => {
    if (
      disableHeavyAnimations ||
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

  /* ======================================
     CARD REVEAL ANIMATION
  ====================================== */

  const cardInitial = reduceMotion
    ? false
    : disableHeavyAnimations
    ? {
        opacity: 0,
        y: 18,
      }
    : {
        opacity: 0,
        y: 65,
        rotateY: index === 0 ? -20 : index === 2 ? 20 : 0,
        scale: 0.94,
      };

  const cardAnimate = {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={cardInitial}
      whileInView={cardAnimate}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: disableHeavyAnimations ? 0.45 : 0.85,
        delay: disableHeavyAnimations ? 0 : index * 0.12,
        ease,
      }}
      className="h-full w-full"
      style={{
        perspective: disableHeavyAnimations
          ? "none"
          : "1200px",
      }}
    >
      <motion.article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={(event) => {
          if (
            !disableHeavyAnimations &&
            event.pointerType === "mouse"
          ) {
            setHovered(true);
          }
        }}
        onPointerLeave={resetCard}
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
          group relative isolate flex
          min-h-[365px] w-full
          flex-col justify-between
          overflow-hidden
          rounded-[20px]
          border border-white/20
          bg-[#142131]
          p-6 text-white
          shadow-[0_10px_28px_rgba(0,0,0,0.15)]
          sm:min-h-[390px] sm:p-7
          lg:min-h-[460px]
          lg:overflow-visible
          lg:rounded-[22px]
          lg:p-8
          lg:shadow-[0_20px_45px_rgba(0,0,0,0.2)]
          lg:transition-[border-color,box-shadow]
          lg:duration-500
          lg:hover:border-[#E9AC12]/60
          lg:hover:shadow-[0_30px_65px_rgba(0,0,0,0.3)]
        "
      >
        {/* ======================================
            BACKGROUND IMAGE
        ====================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px] lg:rounded-[22px]">
          <motion.img
            src={division.image}
            alt={division.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            animate={
              disableHeavyAnimations
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

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#101B29]/60 via-[#152131]/75 to-[#0D1725]/95" />
        </div>

        {/* ======================================
            GOLDEN MOUSE LIGHT - DESKTOP ONLY
        ====================================== */}

        {!disableHeavyAnimations && (
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]"
            style={{
              background: hovered
                ? goldenLight
                : "transparent",
            }}
          />
        )}

        {/* EDGE BORDER */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-white/10 lg:rounded-[22px] lg:transition-colors lg:duration-500 lg:group-hover:border-[#E9AC12]/40" />

        {/* ======================================
            TOP CONTENT
        ====================================== */}

        <div
          className="relative flex items-start justify-between gap-4"
          style={{
            transform: disableHeavyAnimations
              ? "none"
              : "translateZ(48px)",
          }}
        >
          {/* ICON */}
          <motion.div
            animate={
              hovered && !disableHeavyAnimations
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
              repeat:
                hovered && !disableHeavyAnimations
                  ? Infinity
                  : 0,
              ease: "easeInOut",
            }}
            className="
              flex h-[56px] w-[56px]
              items-center justify-center
              rounded-[15px]
              border border-[#E9AC12]/30
              bg-white/10
              text-[#F5BC47]
              sm:h-[60px] sm:w-[60px]
              lg:h-[64px] lg:w-[64px]
              lg:rounded-[17px]
              lg:backdrop-blur-md
              lg:transition-colors
              lg:duration-500
              lg:group-hover:bg-[#E66A16]
              lg:group-hover:text-white
            "
          >
            <Icon size={29} strokeWidth={1.6} />
          </motion.div>

          {/* NUMBER */}
          <span
            className="
              text-[58px] font-black
              leading-none tracking-[-4px]
              text-white/20
              sm:text-[64px]
              lg:text-[70px]
              lg:transition-colors
              lg:duration-500
              lg:group-hover:text-[#F4B51C]/45
            "
          >
            {division.number}
          </span>
        </div>

        {/* ======================================
            BOTTOM CONTENT
        ====================================== */}

        <div
          className="
            relative mt-12 flex
            flex-1 flex-col justify-end
            sm:mt-14
          "
          style={{
            transform: disableHeavyAnimations
              ? "none"
              : "translateZ(35px)",
          }}
        >
          {/* TAG */}
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#F4B51C]">
            {division.tag}
          </span>

          {/* TITLE */}
          <h3
            className="
              mt-3 max-w-[310px]
              text-[23px] font-extrabold
              leading-[1.25]
              tracking-[-0.7px]
              sm:text-[26px]
              lg:text-[clamp(23px,2.2vw,29px)]
            "
          >
            {division.title}
          </h3>

          {/* ACCENT LINE */}
          <div className="mt-5 h-[2px] w-12 bg-[#E66A16] lg:transition-all lg:duration-500 lg:group-hover:w-24 lg:group-hover:bg-[#F4B51C]" />

          {/* DESCRIPTION */}
          <p
            className="
              mt-5 max-w-[330px]
              text-[13px] leading-[1.75]
              text-[#E1E6EC]
              sm:text-[14px]
              lg:leading-[1.85]
            "
          >
            {division.description}
          </p>

          {/* EXPLORE LABEL */}
          <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1px] text-[#F4B51C]">
            <span>Explore Division</span>

            <ArrowUpRight
              size={17}
              className="lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:group-hover:-translate-y-1"
            />
          </div>
        </div>

        {/* BOTTOM ACCENT */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-b-[22px] bg-gradient-to-r from-[#E66A16] to-[#F4B51C] transition-transform duration-500 lg:group-hover:scale-x-100" />
      </motion.article>
    </motion.div>
  );
}

/* ======================================
   BUSINESS DIVISIONS SECTION
====================================== */

export default function BusinessDivisions() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const disableHeavyAnimations = isMobile || reduceMotion;

  return (
    <section
      id="business-divisions"
      className="
        relative isolate
        overflow-hidden
        py-12
        sm:py-16
        lg:py-24
      "
    >
      {/* ======================================
          FIXED BACKGROUND
          DESKTOP ONLY
      ====================================== */}

      <div
        className="
          absolute inset-0 -z-20
          bg-cover bg-center bg-no-repeat
          lg:bg-fixed
        "
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      />

      {/* NAVY OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-[#142131]/90" />

      {/* BACKGROUND GLOWS - DESKTOP ONLY */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 hidden h-[450px] w-[450px] rounded-full bg-[#E66A16]/10 blur-[110px] lg:block" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 -z-10 hidden h-[450px] w-[450px] rounded-full bg-[#E9AC12]/10 blur-[110px] lg:block" />

      {/* TOP GOLD LINE */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E9AC12]/60 to-transparent" />

      {/* ======================================
          DIVISION GRID
      ====================================== */}

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div
          className="
            grid grid-cols-1
            items-stretch gap-5
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-7
          "
        >
          {divisions.map((division, index) => (
            <DivisionCard
              key={division.number}
              division={division}
              index={index}
              reduceMotion={reduceMotion}
              disableHeavyAnimations={disableHeavyAnimations}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM GOLD LINE */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E9AC12]/50 to-transparent" />
    </section>
  );
}
