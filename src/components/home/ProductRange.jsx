
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Yellow Crushed Maize",
    image: "/p2.png",
  },
  {
    id: 2,
    name: "Premium Corn Grits",
    image: "/p1.png",
  },
  {
    id: 3,
    name: "Fine Corn Powder",
    image: "/p3.png",
  },
  {
    id: 4,
    name: "Yellow Maize Seeds",
    image: "/p4.png",
  },
  {
    id: 5,
    name: "Whole Yellow Corn Germ",
    image: "/p5.png",
  },
  {
    id: 6,
    name: "Corn Cob",
    image: "/p6.png",
  },
];

const wrap = (index) =>
  ((index % products.length) + products.length) %
  products.length;

const ease = [0.22, 1, 0.36, 1];

// UPDATED SPEED SETTINGS
const AUTO_SCROLL_SPEED = 1800;
const DESKTOP_ANIMATION_SPEED = 0.5;
const MOBILE_ANIMATION_SPEED = 0.4;

export default function ProductRange() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => wrap(prev + 1));
  };

  const previous = () => {
    setDirection(-1);
    setActiveIndex((prev) => wrap(prev - 1));
  };

  const goTo = (index) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // FASTER AUTO SCROLL
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => wrap(prev + 1));
    }, AUTO_SCROLL_SPEED);

    return () => clearInterval(timer);
  }, [paused]);

  const activeProduct = products[activeIndex];

  // KEEP ALL DESKTOP PRODUCTS MOUNTED
  const getOffset = (index) => {
    let offset = index - activeIndex;

    if (offset > products.length / 2) {
      offset -= products.length;
    }

    if (offset < -products.length / 2) {
      offset += products.length;
    }

    return offset;
  };

  // ORIGINAL 3D POSITIONS
  const getDesktopPosition = (offset) => {
    const positions = {
      "-3": {
        x: -610,
        scale: 0.55,
        rotateY: 40,
        opacity: 0,
        zIndex: 0,
      },
      "-2": {
        x: -470,
        scale: 0.72,
        rotateY: 28,
        opacity: 0.65,
        zIndex: 1,
      },
      "-1": {
        x: -260,
        scale: 0.88,
        rotateY: 15,
        opacity: 0.9,
        zIndex: 3,
      },
      "0": {
        x: 0,
        scale: 1.12,
        rotateY: 0,
        opacity: 1,
        zIndex: 10,
      },
      "1": {
        x: 260,
        scale: 0.88,
        rotateY: -15,
        opacity: 0.9,
        zIndex: 3,
      },
      "2": {
        x: 470,
        scale: 0.72,
        rotateY: -28,
        opacity: 0.65,
        zIndex: 1,
      },
      "3": {
        x: 610,
        scale: 0.55,
        rotateY: -40,
        opacity: 0,
        zIndex: 0,
      },
    };

    return positions[String(offset)] || positions["3"];
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#F8F9FA] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#FFFFFF_0%,#F8F9FA_65%,#F1F2F4_100%)]" />

      {/* DECORATIVE ELEMENTS */}
      <div className="pointer-events-none absolute left-[6%] top-[20%] h-[180px] w-[180px] opacity-20 [background-image:radial-gradient(#E9AC12_2px,transparent_2px)] [background-size:16px_16px]" />

      <div className="pointer-events-none absolute bottom-[12%] right-[6%] h-[150px] w-[150px] opacity-15 [background-image:radial-gradient(#E66A16_2px,transparent_2px)] [background-size:16px_16px]" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">

        {/* SIMPLE HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-5 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <span className="h-[2px] w-9 bg-[#E66A16]" />

            <span className="text-[13px] font-extrabold uppercase tracking-[3px] text-[#E66A16]">
              OUR PRODUCTS
            </span>

            <span className="h-[2px] w-9 bg-[#E66A16]" />
          </div>
        </motion.div>

        {/* CAROUSEL WRAPPER */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          {/* DESKTOP 3D CAROUSEL */}
          <div
            className="relative mx-auto hidden h-[470px] max-w-[1500px] items-center justify-center lg:flex"
            style={{ perspective: "1200px" }}
          >
            {products.map((product, index) => {
              const offset = getOffset(index);
              const position = getDesktopPosition(offset);

              return (
                <motion.button
                  key={product.id}
                  type="button"
                  aria-label={`Show ${product.name}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => goTo(index)}
                  initial={false}
                  animate={position}
                  transition={{
                    duration: DESKTOP_ANIMATION_SPEED,
                    ease,
                  }}
                  style={{
                    position: "absolute",
                    transformStyle: "preserve-3d",
                  }}
                  className="flex h-[420px] w-[340px] cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-[#E66A16]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    draggable={false}
                    className="max-h-[390px] w-full select-none object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.15)]"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* MOBILE / TABLET CAROUSEL */}
          <div className="relative flex h-[350px] items-center justify-center overflow-hidden sm:h-[410px] lg:hidden">
            <AnimatePresence
              mode="wait"
              initial={false}
              custom={direction}
            >
              <motion.img
                key={activeProduct.id}
                src={activeProduct.image}
                alt={activeProduct.name}
                custom={direction}
                initial={(dir) => ({
                  x: dir > 0 ? 160 : -160,
                  opacity: 0,
                  rotate: dir > 0 ? 12 : -12,
                  scale: 0.78,
                })}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={(dir) => ({
                  x: dir > 0 ? -160 : 160,
                  opacity: 0,
                  rotate: dir > 0 ? -12 : 12,
                  scale: 0.78,
                })}
                transition={{
                  duration: MOBILE_ANIMATION_SPEED,
                  ease,
                }}
                draggable={false}
                className="h-[325px] w-[82%] max-w-[410px] object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.14)] sm:h-[390px]"
              />
            </AnimatePresence>
          </div>

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous product"
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E4E8] bg-white text-[#202A38] shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#E66A16] hover:bg-[#E66A16] hover:text-white sm:left-3 lg:left-0"
          >
            <ChevronLeft size={24} />
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E4E8] bg-white text-[#202A38] shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#E66A16] hover:bg-[#E66A16] hover:text-white sm:right-3 lg:right-0"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* ACTIVE PRODUCT INFORMATION */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 text-center"
          >
            <h3 className="text-[23px] font-extrabold tracking-[-0.5px] text-[#202A38] sm:text-[27px]">
              {activeProduct.name}
            </h3>

            <Link
              to="/products"
              className="group mt-5 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-8 text-[13px] font-extrabold text-white shadow-[0_10px_24px_rgba(230,106,22,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              View Product

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION DOTS */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${product.name}`}
              aria-current={
                index === activeIndex ? "true" : undefined
              }
              className={`h-[8px] rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-9 bg-[#E66A16]"
                  : "w-[8px] bg-[#D2D6DC] hover:bg-[#E9AC12]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
