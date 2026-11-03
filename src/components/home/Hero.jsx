
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918983973799?text=" +
  encodeURIComponent(
    "Hello Crunch & Crisp India LLP, I would like to enquire about your products and bulk supply requirements."
  );

const ease = [0.22, 1, 0.36, 1];

const kernels = [
  { top: "18%", left: "63%", size: 12, delay: 0 },
  { top: "74%", left: "54%", size: 16, delay: 0.5 },
  { top: "26%", left: "94%", size: 13, delay: 1 },
  { top: "79%", left: "89%", size: 14, delay: 0.8 },
];

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [landed, setLanded] = useState(false);

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
    if (!landed || reducedMotion) return;

    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 13);
    mouseY.set(-y * 9);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="
        relative isolate flex
        min-h-[610px] items-center
        overflow-hidden bg-[#171719]
        text-white
        sm:min-h-[640px]
        lg:min-h-[590px]
        xl:min-h-[640px]
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_70%_45%,#303033_0%,#1B1B1D_45%,#111113_100%)]" />

      {/* TEXTURE */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          opacity-[0.045]
          [background-image:repeating-linear-gradient(45deg,#ffffff_0px,#ffffff_1px,transparent_1px,transparent_5px)]
        "
      />

      {/* WATERMARK */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-8 left-[8%]
          whitespace-nowrap
          text-[clamp(100px,18vw,280px)]
          font-black leading-none
          tracking-[-10px]
          text-white/[0.035]
          select-none
        "
      >
        CRUNCH
      </span>

      {/* DECORATIVE RING */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { rotate: 360 }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none absolute
          right-[5%] top-[9%]
          h-[76px] w-[76px]
          rounded-full
          border-[9px] border-[#E9AC12]/35
        "
      />

      {/* GOLDEN KERNELS */}
      {kernels.map((kernel, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="
            pointer-events-none absolute z-10
            rounded-[40%]
            bg-gradient-to-br
            from-[#FFE27A]
            via-[#F2B523]
            to-[#C7780C]
            shadow-[0_5px_12px_rgba(0,0,0,0.3)]
          "
          style={{
            top: kernel.top,
            left: kernel.left,
            width: kernel.size,
            height: kernel.size * 1.3,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  rotate: [-20, 18, -20],
                }
          }
          transition={{
            duration: 4 + index * 0.6,
            delay: kernel.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* MAIN CONTAINER */}
      <div
        className="
          relative mx-auto flex
          w-[calc(100%-36px)]
          max-w-[1400px]
          flex-col justify-center py-16
          sm:w-[calc(100%-64px)]
          lg:min-h-[590px] lg:py-14
          xl:min-h-[640px]
        "
      >
        {/* RIGHT ORIGINAL IMAGE */}
        <div
          onPointerMove={handleMouseMove}
          onPointerLeave={resetMouse}
          className="
            relative order-2
            mt-4 flex h-[310px]
            items-center justify-center
            sm:h-[380px]
            lg:absolute lg:inset-y-0
            lg:right-[-5%]
            lg:order-none lg:mt-0
            lg:h-full lg:w-[63%]
          "
          style={{
            perspective: "1200px",
          }}
        >
          {/* BACK GLOW */}
          <div
            className="
              pointer-events-none absolute
              h-[260px] w-[260px]
              rounded-full bg-[#E9AC12]/12
              blur-[75px]
              sm:h-[380px] sm:w-[380px]
              lg:h-[480px] lg:w-[480px]
            "
          />

          {/* FALL FROM TOP */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    y: -750,
                    rotateZ: -28,
                    rotateY: -30,
                    scale: 0.7,
                    opacity: 0,
                  }
            }
            animate={{
              y: 0,
              rotateZ: 0,
              rotateY: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    y: {
                      type: "spring",
                      stiffness: 95,
                      damping: 13,
                      mass: 1.1,
                      delay: 0.15,
                    },
                    rotateZ: {
                      duration: 1.2,
                      ease,
                    },
                    rotateY: {
                      duration: 1.2,
                      ease,
                    },
                    scale: {
                      duration: 1.1,
                      ease,
                    },
                    opacity: {
                      duration: 0.25,
                    },
                  }
            }
            onAnimationComplete={() => setLanded(true)}
            className="
              relative flex h-full w-full
              items-center justify-center
            "
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* MOUSE 3D TILT */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="
                relative flex h-full w-full
                items-center justify-center
              "
            >
              {/* FLOAT AFTER LANDING */}
              <motion.div
                animate={
                  landed && !reducedMotion
                    ? {
                        y: [0, -12, 0],
                        rotateZ: [0, 1.5, -1.5, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative flex h-full w-full
                  items-center justify-center
                "
              >
                {/* ORIGINAL HERO IMAGE */}
                <img
                  src="/hero.png"
                  alt="Premium golden corn products"
                  fetchPriority="high"
                  className="
                    relative z-10
                    max-h-[360px] w-full
                    object-contain
                    drop-shadow-[0_30px_35px_rgba(0,0,0,0.45)]
                    sm:max-h-[440px]
                    lg:ml-40
                    lg:max-h-[620px]
                    lg:w-[110%]
                  "
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* GOLDEN CORN TEXT */}
          <motion.span
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.7,
                    rotate: -25,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -12,
            }}
            transition={{
              duration: 0.8,
              delay: 1.2,
            }}
            className="
              pointer-events-none absolute
              bottom-[12%] right-[3%] z-20
              text-[clamp(26px,3.5vw,50px)]
              font-black italic
              tracking-[-2px]
              text-[#E9AC12]
              drop-shadow-[0_5px_12px_rgba(0,0,0,0.35)]
            "
          >
            GOLDEN CORN
          </motion.span>
        </div>

        {/* LEFT CONTENT */}
        <div className="relative z-20 order-1 lg:order-none lg:pointer-events-none">
          {/* EYEBROW */}
          <motion.p
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.15,
            }}
            className="
              mb-5 max-w-[700px]
              text-[11px] font-extrabold
              uppercase tracking-[1.8px]
              text-[#E66A16]
              sm:text-[12px]
            "
          >
            Agricultural Commodities • Corn Processing • Frozen Foods
          </motion.p>

          {/* HEADING */}
          <motion.h1
            initial={
              reducedMotion
                ? false
                : { opacity: 0, x: -70 }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease,
            }}
            className="
              relative z-30
              max-w-[1100px]
              text-[clamp(40px,5.6vw,70px)]
              font-black uppercase
              leading-[1.02]
              tracking-[-2.5px]
              text-white
              sm:tracking-[-3px]
            "
          >
            FROM NATURE'S
            <br />
            HARVEST TO
            <br />
            <span className="text-[#E9AC12]">
              INDUSTRIAL EXCELLENCE.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 25 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
            className="
              relative z-30
              mt-6 max-w-[570px]
              text-[14px] leading-[1.8]
              text-white/75
              sm:text-[15px]
            "
          >
            Crunch & Crisp India LLP is a manufacturing and
            agricultural commodities company offering quality
            corn products, agricultural commodities and frozen
            food solutions for diverse business and industrial
            requirements.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 25 }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
            }}
            className="
              pointer-events-auto relative z-30
              mt-8 flex flex-wrap
              items-center gap-3
            "
          >
            <Link
              to="/products"
              className="
                group inline-flex min-h-[51px]
                items-center justify-center gap-3
                rounded-lg
                bg-gradient-to-r
                from-[#E66A16] to-[#E9AC12]
                px-6 text-[13px]
                font-extrabold text-white
                transition-transform duration-300
                hover:-translate-y-1
              "
            >
              Explore Our Products

              <ArrowUpRight
                size={18}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex min-h-[51px]
                items-center justify-center gap-3
                rounded-lg border border-[#E9AC12]
                bg-white/5 px-6
                text-[13px] font-extrabold
                text-white
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#E9AC12]
                hover:text-[#202A38]
              "
            >
              Get a Bulk Quote
              <MessageCircle size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ACCENT */}
      <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-[#E66A16]" />
    </section>
  );
}
