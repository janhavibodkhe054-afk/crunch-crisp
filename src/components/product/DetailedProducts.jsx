
import React, { useRef } from "react";

import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "918983973799";

const ease = [0.22, 1, 0.36, 1];

const products = [
  {
    name: "Yellow Crushed Maize",
    image: "/product1.png",
    description:
      "High-energy corn material for cattle and poultry feed.",
  },
  {
    name: "Premium Corn Grits",
    image: "/product2.jpg",
    description:
      "Quality corn grits for snacks, food processing and breweries.",
  },
  {
    name: "Fine Corn Powder",
    image: "/product3.jpg",
    description:
      "Finely milled corn powder for food and industrial applications.",
  },
  {
    name: "Yellow Maize Seeds",
    image: "/product4.jpeg",
    description:
      "Maize seeds for agricultural sourcing and cultivation.",
  },
  {
    name: "Whole Yellow Corn Germ",
    image: "/product5.webp",
    description:
      "Corn germ for oil extraction and animal feed manufacturing.",
  },
  {
    name: "Corn Cob",
    image: "/product6.jpg",
    description:
      "Corn cob raw material for agricultural and industrial uses.",
  },
];

/* ==========================================
   INTERACTIVE 3D PRODUCT CARD
========================================== */

function ProductCard({
  product,
  index,
  reduceMotion,
  onEnquiry,
}) {
  const cardRef = useRef(null);

  const inView = useInView(cardRef, {
    once: true,
    amount: 0.15,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 110,
    damping: 22,
    mass: 0.7,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 110,
    damping: 22,
    mass: 0.7,
  });

  const handleMouseMove = (event) => {
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

    mouseX.set(x * 12);
    mouseY.set(-y * 9);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onPointerLeave={resetTilt}
      initial={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              y: 65,
              scale: 0.9,
              rotateX: 12,
            }
      }
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
            }
          : undefined
      }
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.12,
        ease,
      }}
      className="group relative"
      style={{
        perspective: "1200px",
      }}
    >
      {/* MOUSE RESPONSIVE 3D CARD */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* ======================================
            PRODUCT IMAGE
        ====================================== */}

        <div className="relative h-[190px] overflow-hidden rounded-[13px] bg-[#EFE9DE] sm:h-[205px] lg:h-[215px]">
          {/* IMAGE ZOOM */}
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            draggable={false}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.13,
                  }
            }
            transition={{
              duration: 0.8,
              ease,
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* DARK IMAGE GRADIENT */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202A38]/15 to-transparent" />

          {/* MOVING GOLDEN LIGHT */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              animate={{
                x: ["-150%", "250%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-[30%] rotate-[20deg] bg-gradient-to-r from-transparent via-[#FFE39B]/25 to-transparent blur-[15px]"
            />
          )}

          {/* PRODUCT NUMBER */}
          <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-[#202A38]/70 text-[12px] font-extrabold text-white backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* ======================================
            OVERLAPPING WHITE PRODUCT CARD
        ====================================== */}

        <motion.div
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -8,
                  scale: 1.025,
                }
          }
          transition={{
            duration: 0.4,
            ease,
          }}
          className="relative z-10 mx-auto -mt-10 flex min-h-[185px] w-[88%] flex-col items-center rounded-[14px] border border-[#ECECEC] bg-white px-5 py-6 text-center shadow-[0_10px_28px_rgba(32,42,56,0.10)] transition-shadow duration-500 group-hover:shadow-[0_20px_45px_rgba(32,42,56,0.17)]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* TOP GOLDEN ACCENT */}
          <motion.div
            initial={{
              width: 30,
            }}
            whileHover={{
              width: 65,
            }}
            transition={{
              duration: 0.35,
            }}
            className="mb-3 h-[3px] rounded-full bg-gradient-to-r from-[#E66A16] to-[#E9AC12]"
          />

          {/* PRODUCT NAME - BIGGER */}
          <h3 className="text-[17px] font-extrabold leading-[1.4] text-[#202A38] sm:text-[18px] lg:text-[19px]">
            {product.name}
          </h3>

          {/* DESCRIPTION - BIGGER */}
          <p className="mt-3 max-w-[290px] text-[13px] leading-[1.75] text-[#66717E] sm:text-[14px]">
            {product.description}
          </p>

          {/* WHATSAPP ENQUIRY BUTTON */}
          <motion.button
            type="button"
            onClick={() => onEnquiry(product.name)}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -3,
                    scale: 1.06,
                  }
            }
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-6 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.7px] text-white shadow-[0_5px_15px_rgba(230,106,22,0.18)] hover:shadow-[0_10px_25px_rgba(230,106,22,0.3)]"
          >
            Enquire Now

            <ArrowUpRight size={15} />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

/* ==========================================
   MAIN PRODUCTS SECTION
========================================== */

export default function DetailedProducts() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const handleEnquiry = (productName) => {
    const message =
      `Hello Crunch & Crisp India LLP,\n\n` +
      `I am interested in ${productName}.\n` +
      `Please share product details and bulk quotation.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      ref={sectionRef}
      id="product-range"
      className="relative isolate overflow-hidden bg-[#F8F8F6] py-16 sm:py-20"
    >
      {/* ======================================
          ANIMATED BACKGROUND GLOWS
      ====================================== */}

      <motion.div
        aria-hidden="true"
        animate={
          inView && !reduceMotion
            ? {
                x: [-30, 40, -30],
                y: [0, 25, 0],
                scale: [1, 1.15, 1],
              }
            : undefined
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[450px] w-[450px] rounded-full bg-[#F5D8A5]/20 blur-[110px]"
      />

      <motion.div
        aria-hidden="true"
        animate={
          inView && !reduceMotion
            ? {
                x: [30, -35, 30],
                y: [0, -20, 0],
                scale: [1, 1.12, 1],
              }
            : undefined
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-[#E9AC12]/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1350px] px-5 sm:px-8 lg:px-12">

        {/* ======================================
            SECTION HEADING
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 35,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.8,
            ease,
          }}
          className="mb-12 text-center"
        >
          <span className="text-[12px] font-bold uppercase tracking-[3px] text-[#D38A24]">
            OUR COLLECTION
          </span>

          <h2 className="mt-3 text-[clamp(32px,3.5vw,46px)] font-extrabold tracking-[-1px] text-[#202A38]">
            Our{" "}

            <span className="text-[#E66A16]">
              Products
            </span>
          </h2>

          {/* ANIMATED GOLDEN UNDERLINE */}
          <motion.div
            initial={{
              width: 0,
            }}
            animate={
              inView
                ? {
                    width: 75,
                  }
                : undefined
            }
            transition={{
              duration: 1,
              delay: 0.25,
              ease,
            }}
            className="mx-auto mt-5 h-[3px] rounded-full bg-gradient-to-r from-[#E66A16] to-[#E9AC12]"
          />
        </motion.div>

        {/* ======================================
            3D PRODUCT GRID
        ====================================== */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
              reduceMotion={reduceMotion}
              onEnquiry={handleEnquiry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
