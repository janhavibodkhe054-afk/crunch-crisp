
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";

/* ==========================================
   CRUNCH & CRISP INDIA LLP
   PREMIUM 3D TESTIMONIALS CAROUSEL

   DEMO REVIEWS ONLY
   Replace with verified customer feedback
   before publishing.
========================================== */

const testimonials = [
  {
    id: 1,
    category: "CUSTOMER REVIEW",
    quote:
      "Very good quality products. We are happy with the product quality and overall service. Highly recommended!",
    name: "Rahul Patil",
    initials: "RP",
  },
  {
    id: 2,
    category: "CUSTOMER REVIEW",
    quote:
      "Excellent product quality and good communication. We had a very good experience with Crunch & Crisp India LLP.",
    name: "Amit Sharma",
    initials: "AS",
  },
  {
    id: 3,
    category: "CUSTOMER REVIEW",
    quote:
      "The corn products are really good. Quality is consistent and the team is very supportive. Good experience overall.",
    name: "Sachin Deshmukh",
    initials: "SD",
  },
  {
    id: 4,
    category: "CUSTOMER REVIEW",
    quote:
      "Good quality products at reasonable prices. The team understands customer requirements and provides proper information.",
    name: "Rajesh Jadhav",
    initials: "RJ",
  },
  {
    id: 5,
    category: "CUSTOMER REVIEW",
    quote:
      "We are satisfied with the products. Quality is good and the overall experience has been positive.",
    name: "Sandeep Gupta",
    initials: "SG",
  },
  {
    id: 6,
    category: "CUSTOMER REVIEW",
    quote:
      "Nice experience with Crunch & Crisp India LLP. Good products, helpful team and professional communication.",
    name: "Pravin Shinde",
    initials: "PS",
  },
  {
    id: 7,
    category: "CUSTOMER REVIEW",
    quote:
      "Very happy with the quality of corn products. The team is cooperative and responds properly to our requirements.",
    name: "Vikas Kulkarni",
    initials: "VK",
  },
  {
    id: 8,
    category: "CUSTOMER REVIEW",
    quote:
      "Good company with quality products. Our overall experience was smooth and satisfactory.",
    name: "Rohit Verma",
    initials: "RV",
  },
];

const AUTO_DELAY = 3200;
const ease = [0.22, 1, 0.36, 1];

/* ==========================================
   3D TESTIMONIAL CARD
========================================== */

function TestimonialCard({
  item,
  position,
  onClick,
  reducedMotion,
}) {
  const isActive = position === 0;
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, {
    stiffness: 130,
    damping: 24,
  });

  const smoothY = useSpring(rotateY, {
    stiffness: 130,
    damping: 24,
  });

  const handleMove = (event) => {
    if (
      !isActive ||
      reducedMotion ||
      !cardRef.current ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    rotateX.set(-y * 5);
    rotateY.set(x * 6);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const getPosition = () => {
    if (position === 0) {
      return {
        x: "0%",
        rotateY: 0,
        scale: 1,
        opacity: 1,
        z: 100,
      };
    }

    if (position === -1) {
      return {
        x: "-78%",
        rotateY: 32,
        scale: 0.79,
        opacity: 0.62,
        z: -130,
      };
    }

    if (position === 1) {
      return {
        x: "78%",
        rotateY: -32,
        scale: 0.79,
        opacity: 0.62,
        z: -130,
      };
    }

    return {
      x: position < 0 ? "-115%" : "115%",
      rotateY: position < 0 ? 45 : -45,
      scale: 0.62,
      opacity: 0,
      z: -250,
    };
  };

  const target = getPosition();

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      onClick={onClick}
      initial={false}
      animate={{
        x: target.x,
        rotateY: reducedMotion ? 0 : target.rotateY,
        scale: target.scale,
        opacity: target.opacity,
        z: reducedMotion ? 0 : target.z,
      }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.7,
        ease,
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "min(520px, 78vw)",
        height: "350px",
        marginLeft: "calc(min(520px, 78vw) / -2)",
        marginTop: "-175px",
        transformStyle: "preserve-3d",
        zIndex: isActive
          ? 20
          : 10 - Math.abs(position),
        pointerEvents:
          Math.abs(position) > 1 ? "none" : "auto",
        cursor: isActive ? "default" : "pointer",
      }}
      className="max-w-[520px]"
    >
      {/* INNER 3D CARD */}
      <motion.div
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          transformStyle: "preserve-3d",
        }}
        className={`relative flex h-[350px] flex-col justify-between overflow-hidden rounded-[22px] border bg-white p-6 transition-colors sm:p-8 ${
          isActive
            ? "border-[#F0D8BD] shadow-[0_20px_55px_rgba(32,42,56,0.13)]"
            : "border-[#EAE2D9] shadow-[0_12px_30px_rgba(32,42,56,0.07)]"
        }`}
      >
        {/* TOP GOLDEN ACCENT */}
        <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#E66A16] via-[#F4B51C] to-[#E9AC12]" />

        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-[180px] w-[180px] rounded-full bg-[#FFF5E9] blur-[45px]" />

        {/* REVIEW CONTENT */}
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <Quote
              size={36}
              strokeWidth={1.3}
              className="shrink-0 text-[#E9AC12]"
            />

            <span className="rounded-full bg-[#FFF3E5] px-3 py-1.5 text-[9px] font-extrabold tracking-[1px] text-[#D77D24]">
              {item.category}
            </span>
          </div>

          <blockquote className="mt-6 line-clamp-6 text-[clamp(14px,1.45vw,19px)] font-semibold leading-[1.8] text-[#344252]">
            “{item.quote}”
          </blockquote>
        </div>

        {/* CUSTOMER NAME - NO ROLE */}
        <div className="relative mt-6 flex items-center gap-3 border-t border-[#F1EBE4] pt-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E66A16] to-[#F4B51C] text-[12px] font-black text-white">
            {item.initials}
          </div>

          <div>
            <h4 className="text-[14px] font-extrabold text-[#202A38]">
              {item.name}
            </h4>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ==========================================
   MAIN TESTIMONIAL SECTION
========================================== */

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cycle, setCycle] = useState(0);

  const reducedMotion = useReducedMotion();

  const shouldPlay =
    playing && !hovered && !reducedMotion;

  useEffect(() => {
    if (!shouldPlay || testimonials.length <= 1) {
      return;
    }

    const timer = setTimeout(() => {
      setActive(
        (prev) => (prev + 1) % testimonials.length
      );

      setCycle((prev) => prev + 1);
    }, AUTO_DELAY);

    return () => clearTimeout(timer);
  }, [active, cycle, shouldPlay]);

  const goTo = (index) => {
    setActive(
      (index + testimonials.length) %
        testimonials.length
    );

    setCycle((prev) => prev + 1);
  };

  const next = () => goTo(active + 1);
  const previous = () => goTo(active - 1);

  const visibleCards = [-1, 0, 1].map((offset) => ({
    item:
      testimonials[
        (active + offset + testimonials.length) %
          testimonials.length
      ],
    position: offset,
  }));

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
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
            duration: 0.6,
            ease,
          }}
          className="mx-auto mb-8 max-w-[700px] text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[2px] w-7 bg-[#E66A16]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#C68A31]">
              CLIENT TESTIMONIALS
            </span>

            <span className="h-[2px] w-7 bg-[#E66A16]" />
          </div>

          <h2 className="text-[clamp(29px,3.4vw,44px)] font-extrabold tracking-[-1px] text-[#202A38]">
            What Our{" "}
            <span className="text-[#E66A16]">
              Clients Say.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-[600px] text-[13px] leading-[1.8] text-[#74818D] sm:text-[14px]">
            Perspectives on product quality,
            customer experience and business service.
          </p>
        </motion.div>

        {/* 3D CAROUSEL */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setHovered(false);
            }
          }}
          className="relative overflow-hidden rounded-[24px] border border-[#F1E8DD] bg-gradient-to-br from-[#FFFCF8] via-white to-[#FFF7EC] px-3 py-8 sm:px-6"
        >
          {/* TOP BAR */}
          <div className="relative z-30 mx-auto mb-5 flex max-w-[1000px] items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-2">
              <Sparkles
                size={15}
                className="text-[#E66A16]"
              />

              <span className="text-[10px] font-extrabold uppercase tracking-[1px] text-[#C58A34]">
                CRUNCH & CRISP INDIA LLP
              </span>
            </div>

            <span className="text-[12px] font-extrabold text-[#8B96A1]">
              {String(active + 1).padStart(2, "0")}

              <span className="mx-2 text-[#CCD2D8]">
                /
              </span>

              {String(testimonials.length).padStart(
                2,
                "0"
              )}
            </span>
          </div>

          {/* 3D STAGE */}
          <div
            className="relative mx-auto h-[380px] w-full max-w-[1100px]"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {visibleCards.map(({ item, position }) => (
              <TestimonialCard
                key={item.id}
                item={item}
                position={position}
                reducedMotion={reducedMotion}
                onClick={() => {
                  if (position === -1) previous();
                  if (position === 1) next();
                }}
              />
            ))}
          </div>

          {/* AUTOPLAY PROGRESS */}
          <div className="relative z-30 mx-auto mt-2 max-w-[600px]">
            <div className="h-[3px] overflow-hidden rounded-full bg-[#EFE3D4]">
              <motion.div
                key={`${active}-${cycle}-${shouldPlay}`}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: shouldPlay ? 1 : 0,
                }}
                transition={{
                  duration: shouldPlay
                    ? AUTO_DELAY / 1000
                    : 0,
                  ease: "linear",
                }}
                className="h-full origin-left bg-gradient-to-r from-[#E66A16] to-[#F4B51C]"
              />
            </div>
          </div>

          {/* CAROUSEL CONTROLS */}
          <div className="relative z-30 mx-auto mt-6 flex max-w-[1000px] flex-wrap items-center justify-between gap-4">

            {/* DOT NAVIGATION */}
            <div className="flex flex-wrap items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={
                    active === index
                      ? "true"
                      : undefined
                  }
                  onClick={() => goTo(index)}
                  className={`h-[7px] rounded-full transition-all duration-300 ${
                    active === index
                      ? "w-8 bg-[#E66A16]"
                      : "w-[7px] bg-[#D7DDE2] hover:bg-[#E9AC12]"
                  }`}
                />
              ))}
            </div>

            {/* PLAY / PAUSE / ARROWS */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setPlaying((prev) => !prev)
                }
                aria-label={
                  playing
                    ? "Pause autoplay"
                    : "Play autoplay"
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E1DC] bg-white text-[#202A38] transition-colors hover:border-[#E66A16] hover:text-[#E66A16]"
              >
                {playing ? (
                  <Pause size={16} />
                ) : (
                  <Play size={16} />
                )}
              </button>

              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E1DC] bg-white text-[#202A38] transition-colors hover:border-[#E66A16] hover:text-[#E66A16]"
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E66A16] text-white transition-colors hover:bg-[#F4B51C] hover:text-[#202A38]"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* DEMO CONTENT NOTICE */}
        <p className="mt-4 text-center text-[11px] text-[#9AA4AF]">
          Sample testimonials for design preview only.
        </p>
      </div>
    </section>
  );
}
