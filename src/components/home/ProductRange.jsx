
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { Link } from "react-router-dom";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

/* ======================================
   PRODUCT DATA
====================================== */


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
  {
    id: 7,
    name: "Premium Basmati Rice",
    image: "/p7.png",
  },
  {
    id: 8,
    name: "Turmeric Powder",
    image: "/p8.png",
  },
  {
    id: 9,
    name: "Indian Spices",
    image: "/p9.png",
  },
];


const ease = [0.22, 1, 0.36, 1];

const wrap = (index) =>
  ((index % products.length) + products.length) %
  products.length;

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
   DESKTOP CAROUSEL POSITIONS
====================================== */

const desktopPositions = {
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

/* ======================================
   MOBILE PRODUCT SLIDE
====================================== */

function MobileProductSlide({
  product,
  offset,
  reducedMotion,
  onClick,
}) {
  const isActive = offset === 0;

  return (
    <motion.button
      type="button"
      aria-label={`Show ${product.name}`}
      aria-pressed={isActive}
      onClick={onClick}
      initial={false}
      animate={{
        x: `${offset * 77}%`,
        scale: isActive ? 1 : 0.68,
        opacity: isActive ? 1 : 0.48,
        rotateY: reducedMotion ? 0 : offset * -17,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.48,
        ease,
      }}
      style={{
        zIndex: isActive ? 10 : 2,
        transformStyle: "preserve-3d",
        pointerEvents: isActive ? "none" : "auto",
      }}
      className="
        absolute flex
        h-[260px] w-[76%]
        max-w-[360px]
        items-center justify-center
        sm:h-[340px]
        focus-visible:outline-2
        focus-visible:outline-[#E66A16]
      "
    >
      <img
        src={product.image}
        alt={product.name}
        loading={isActive ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="
          max-h-full w-full
          select-none object-contain
          drop-shadow-[0_12px_15px_rgba(0,0,0,0.12)]
        "
      />
    </motion.button>
  );
}

/* ======================================
   MAIN PRODUCT RANGE
====================================== */

export default function ProductRange() {
  const sectionRef = useRef(null);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    amount: 0.15,
  });

  const [activeIndex, setActiveIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const [direction, setDirection] = useState(1);

  const activeProduct = products[activeIndex];

  /* ======================================
     NAVIGATION
  ====================================== */

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => wrap(prev + 1));
  }, []);

  const previous = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => wrap(prev - 1));
  }, []);

  const goTo = useCallback(
    (index) => {
      setDirection(index >= activeIndex ? 1 : -1);
      setActiveIndex(wrap(index));
    },
    [activeIndex]
  );

  /* ======================================
     PAGE VISIBILITY
  ====================================== */

  useEffect(() => {
    const updateVisibility = () => {
      setPageVisible(!document.hidden);
    };

    updateVisibility();

    document.addEventListener(
      "visibilitychange",
      updateVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateVisibility
      );
    };
  }, []);

  /* ======================================
     IMAGE PRELOADING
  ====================================== */

  useEffect(() => {
    if (!isInView) return;

    const nearby = [
      products[activeIndex],
      products[wrap(activeIndex + 1)],
      products[wrap(activeIndex - 1)],
    ];

    nearby.forEach((product) => {
      const img = new Image();
      img.src = product.image;
    });
  }, [activeIndex, isInView]);

  /* ======================================
     AUTOPLAY — EVERY 2 SECONDS
  ====================================== */

  useEffect(() => {
    if (
      paused ||
      !pageVisible ||
      !isInView ||
      reducedMotion
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => wrap(prev + 1));
    }, 2000);

    return () => {
      window.clearInterval(timer);
    };
  }, [paused, pageVisible, isInView, reducedMotion]);

  /* ======================================
     TOUCH SWIPE
  ====================================== */

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const differenceX = touchStartX.current - endX;
    const differenceY = touchStartY.current - endY;

    if (
      Math.abs(differenceX) > 45 &&
      Math.abs(differenceX) > Math.abs(differenceY)
    ) {
      if (differenceX > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  /* ======================================
     DESKTOP OFFSET
  ====================================== */

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

  /* ======================================
     MOBILE VISIBLE PRODUCTS
  ====================================== */

  const mobileProducts = [
    {
      product: products[wrap(activeIndex - 1)],
      index: wrap(activeIndex - 1),
      offset: -1,
    },
    {
      product: products[activeIndex],
      index: activeIndex,
      offset: 0,
    },
    {
      product: products[wrap(activeIndex + 1)],
      index: wrap(activeIndex + 1),
      offset: 1,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="products"
      className="
        relative overflow-hidden
        bg-[#F8F9FA]
        py-12 sm:py-16 lg:py-24
      "
    >
      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#FFFFFF_0%,#F8F9FA_65%,#F1F2F4_100%)]" />

      {/* DESKTOP DECORATION */}
      <div className="pointer-events-none absolute left-[6%] top-[20%] hidden h-[180px] w-[180px] opacity-20 [background-image:radial-gradient(#E9AC12_2px,transparent_2px)] [background-size:16px_16px] lg:block" />

      <div className="pointer-events-none absolute bottom-[12%] right-[6%] hidden h-[150px] w-[150px] opacity-15 [background-image:radial-gradient(#E66A16_2px,transparent_2px)] [background-size:16px_16px] lg:block" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">

        {/* ======================================
            HEADING
        ====================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="mb-5 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <span className="h-[2px] w-7 bg-[#E66A16] sm:w-9" />

            <span className="text-[12px] font-extrabold uppercase tracking-[2px] text-[#E66A16] sm:text-[13px] sm:tracking-[3px]">
              OUR PRODUCTS
            </span>

            <span className="h-[2px] w-7 bg-[#E66A16] sm:w-9" />
          </div>
        </motion.div>

        {/* ======================================
            CAROUSEL WRAPPER
        ====================================== */}

        <div
          className="relative"
          onMouseEnter={(event) => {
            if (event.pointerType !== "touch") {
              setPaused(true);
            }
          }}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setPaused(false);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ======================================
              DESKTOP 3D CAROUSEL
          ====================================== */}

          {!isMobile && (
            <div
              className="
                relative mx-auto flex
                h-[470px] max-w-[1500px]
                items-center justify-center
              "
              style={{
                perspective: "1200px",
              }}
            >
              {products.map((product, index) => {
                const offset = getOffset(index);

                const position =
                  desktopPositions[String(offset)] ||
                  desktopPositions["3"];

                return (
                  <motion.button
                    key={product.id}
                    type="button"
                    aria-label={`Show ${product.name}`}
                    aria-pressed={index === activeIndex}
                    onClick={() => goTo(index)}
                    initial={false}
                    animate={
                      reducedMotion
                        ? {
                            ...position,
                            rotateY: 0,
                          }
                        : position
                    }
                    transition={{
                      duration: reducedMotion ? 0 : 0.5,
                      ease,
                    }}
                    style={{
                      position: "absolute",
                      transformStyle: "preserve-3d",
                      pointerEvents:
                        Math.abs(offset) > 2
                          ? "none"
                          : "auto",
                    }}
                    className="
                      flex h-[420px] w-[340px]
                      cursor-pointer
                      items-center justify-center
                      focus-visible:outline-2
                      focus-visible:outline-[#E66A16]
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="
                        max-h-[390px] w-full
                        select-none object-contain
                        drop-shadow-[0_20px_28px_rgba(0,0,0,0.15)]
                      "
                    />
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* ======================================
              MOBILE 3D CAROUSEL
          ====================================== */}

          {isMobile && (
            <div
              className="
                relative flex h-[285px]
                items-center justify-center
                overflow-hidden
                sm:h-[370px]
              "
              style={{
                perspective: "900px",
              }}
            >
              {mobileProducts.map(({ product, index, offset }) => (
                <MobileProductSlide
                  key={product.id}
                  product={product}
                  offset={offset}
                  reducedMotion={reducedMotion}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          )}

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous product"
            className="
              absolute left-0 top-1/2 z-20
              flex h-10 w-10
              -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[#E2E4E8]
              bg-white text-[#202A38]
              shadow-[0_5px_15px_rgba(0,0,0,0.08)]
              transition-colors duration-200
              active:bg-[#E66A16]
              active:text-white
              sm:left-3 sm:h-12 sm:w-12
              lg:left-0
              lg:hover:border-[#E66A16]
              lg:hover:bg-[#E66A16]
              lg:hover:text-white
            "
          >
            <ChevronLeft size={22} />
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className="
              absolute right-0 top-1/2 z-20
              flex h-10 w-10
              -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[#E2E4E8]
              bg-white text-[#202A38]
              shadow-[0_5px_15px_rgba(0,0,0,0.08)]
              transition-colors duration-200
              active:bg-[#E66A16]
              active:text-white
              sm:right-3 sm:h-12 sm:w-12
              lg:right-0
              lg:hover:border-[#E66A16]
              lg:hover:bg-[#E66A16]
              lg:hover:text-white
            "
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ======================================
            ACTIVE PRODUCT INFO
        ====================================== */}

        <div className="mx-auto mt-4 text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h3
              key={activeProduct.id}
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: direction * 10,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: -direction * 10,
                    }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.2,
              }}
              className="
                min-h-[34px]
                text-[20px] font-extrabold
                tracking-[-0.5px]
                text-[#202A38]
                sm:text-[27px]
              "
            >
              {activeProduct.name}
            </motion.h3>
          </AnimatePresence>

          <Link
            to="/products"
            className="
              group mt-5 inline-flex
              min-h-[48px] items-center
              justify-center gap-3
              rounded-full
              bg-gradient-to-r
              from-[#E66A16] to-[#E9AC12]
              px-7 text-[13px]
              font-extrabold text-white
              shadow-[0_6px_16px_rgba(230,106,22,0.18)]
              transition-transform duration-200
              active:scale-[0.98]
              lg:hover:-translate-y-1
            "
          >
            View Product

            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* ======================================
            PAGINATION DOTS
        ====================================== */}

        <div className="mt-7 flex items-center justify-center gap-2.5">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${product.name}`}
              aria-current={
                index === activeIndex
                  ? "true"
                  : undefined
              }
              className={`
                h-[8px] rounded-full
                transition-[width,background-color]
                duration-200
                ${
                  index === activeIndex
                    ? "w-9 bg-[#E66A16]"
                    : "w-[8px] bg-[#D2D6DC] hover:bg-[#E9AC12]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
