
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const industries = [
  {
    number: "01",
    title: "Food Processing Industry",
    description:
      "Quality corn-based ingredients supporting food processing, production and commercial manufacturing requirements.",
    image: "/i1.png",
  },
  {
    number: "02",
    title: "Snack Manufacturing",
    description:
      "Corn grits and maize-based products suitable for snack production and food manufacturing applications.",
    image: "/i2.png",
  },
  {
    number: "03",
    title: "Animal Feed Industry",
    description:
      "Corn-derived products supporting raw material sourcing requirements for animal feed manufacturers.",
    image: "/i3.png",
  },
  {
    number: "04",
    title: "Poultry Feed Industry",
    description:
      "Maize-based agricultural products for poultry feed production and bulk procurement needs.",
    image: "/i4.png",
  },
  {
    number: "05",
    title: "Oil Extraction Industry",
    description:
      "Corn germ and related agricultural raw materials for oil extraction and processing applications.",
    image: "/i5.png",
  },
  {
    number: "06",
    title: "Agricultural Businesses",
    description:
      "Agricultural commodity supply solutions for traders, buyers and commercial agricultural operations.",
    image: "/i6.png",
  },
  {
    number: "07",
    title: "Food Distributors",
    description:
      "A diverse range of agricultural and corn-based products supporting wholesale and distribution businesses.",
    image: "/i7.png",
  },
  {
    number: "08",
    title: "Frozen Food Businesses",
    description:
      "Frozen food supply solutions for distributors, food businesses and commercial buyers.",
    image: "/i8.png",
  },
];

const ease = [0.22, 1, 0.36, 1];

function IndustryCard({ industry, index, reduceMotion }) {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(mouseX, {
    stiffness: 140,
    damping: 22,
  });

  const rotateX = useSpring(mouseY, {
    stiffness: 140,
    damping: 22,
  });

  const handlePointerMove = (event) => {
    if (
      reduceMotion ||
      event.pointerType !== "mouse" ||
      !cardRef.current
    ) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 10);
    mouseY.set(-y * 8);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative"
      style={{
        perspective: "1100px",
      }}
    >
      {/* SCROLL ENTRY ANIMATION */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 55,
                rotateX: 18,
                scale: 0.94,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.15,
          margin: "0px 0px -5% 0px",
        }}
        transition={{
          duration: 0.75,
          delay: (index % 2) * 0.12,
          ease,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* MOUSE 3D TILT */}
        <motion.article
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative flex min-h-[175px] items-center gap-4 rounded-[18px] border border-[#F0E9E1] bg-white p-3 shadow-[0_5px_20px_rgba(32,42,56,0.025)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#E9C89F] hover:bg-[#FFFDF9] hover:shadow-[0_18px_38px_rgba(32,42,56,0.09)] sm:gap-5 sm:p-4"
        >
          {/* HOVER ACCENT */}
          <div className="pointer-events-none absolute bottom-5 left-0 top-5 w-[3px] origin-center scale-y-0 rounded-full bg-gradient-to-b from-[#E66A16] to-[#E9AC12] transition-transform duration-500 group-hover:scale-y-100" />

          {/* 3D IMAGE */}
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={{
              duration: 5 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.25,
            }}
            className="relative h-[125px] w-[115px] shrink-0 sm:h-[145px] sm:w-[145px]"
            style={{
              transformStyle: "preserve-3d",
              z: 28,
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-[#F3F3F3] shadow-[0_10px_20px_rgba(32,42,56,0.12)] transition-transform duration-500 group-hover:scale-[1.04]">
              <img
                src={industry.image}
                alt={industry.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/20 to-transparent" />
            </div>
          </motion.div>

          {/* CONTENT */}
          <div
            className="relative min-w-0 flex-1 py-1"
            style={{
              transform: "translateZ(16px)",
            }}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-[11px] font-extrabold tracking-[1.5px] text-[#E66A16]">
                {industry.number}
              </span>

              <ArrowUpRight
                size={17}
                className="text-[#C4C8CD] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#E66A16]"
              />
            </div>

            <h3 className="text-[16px] font-extrabold leading-[1.3] tracking-[-0.4px] text-[#202A38] transition-colors duration-300 group-hover:text-[#E66A16] sm:text-[19px]">
              {industry.title}
            </h3>

            <p className="mt-2 text-[12px] leading-[1.7] text-[#6B7280] sm:text-[13px]">
              {industry.description}
            </p>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}

export default function IndustriesWeServe() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="industries"
      className="relative isolate overflow-hidden bg-[#FFFEFC] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[350px] w-[350px] rounded-full bg-[#E9AC12]/[0.05] blur-[90px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[400px] w-[400px] rounded-full bg-[#E66A16]/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 30 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="mx-auto mb-12 max-w-[800px] text-center sm:mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-7 bg-[#E66A16]" />

            <p className="text-[12px] font-extrabold uppercase tracking-[2.5px] text-[#E66A16]">
              INDUSTRIES WE SERVE
            </p>

            <span className="h-[2px] w-7 bg-[#E66A16]" />
          </div>

          <h2 className="text-[clamp(30px,3.5vw,49px)] font-extrabold leading-[1.15] tracking-[-1.2px] text-[#202A38]">
            Supporting Businesses Across
            <span className="block text-[#E66A16]">
              Multiple Industries.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-[1.85] text-[#68717D] sm:text-[16px]">
            Our product range serves diverse commercial applications
            and industry requirements.
          </p>
        </motion.div>

        {/* 3D INDUSTRY CARDS */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2 lg:gap-x-14">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.number}
              industry={industry}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
