
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  ArrowUpRight,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  Wheat,
  Package,
  Snowflake,
  MoveUpRight,
} from "lucide-react";

const BACKGROUND_IMAGE = "/corn.jpg";

const EASE = [0.22, 1, 0.36, 1];

const whatsappUrl =
  "https://wa.me/918983973799?text=" +
  encodeURIComponent(
    "Hello Crunch & Crisp India LLP, I would like to enquire about your products."
  );

const categories = [
  {
    no: "01",
    icon: Wheat,
    title: "Corn Processing",
    subtitle: "Quality Corn Products",
  },
  {
    no: "02",
    icon: Package,
    title: "Agri Commodities",
    subtitle: "Agricultural Supply",
  },
  {
    no: "03",
    icon: Snowflake,
    title: "Frozen Foods",
    subtitle: "Frozen Food Solutions",
  },
];

export default function ContactHero() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    });

    AOS.refresh();

    return () => {
      AOS.refresh();
    };
  }, []);

  const reveal = (delay = 0, y = 25) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : y,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.9,
      delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="contact-hero"
      className="group/hero relative isolate overflow-hidden bg-[#172331] text-white"
    >
      {/* ==================================
          CINEMATIC IMAGE BACKGROUND
      ================================== */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* MAIN IMAGE */}
        <motion.div
          initial={{
            scale: reduceMotion ? 1 : 1.13,
            opacity: 0.6,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            ease: EASE,
          }}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-out group-hover/hero:scale-[1.035]"
          style={{
            backgroundImage: `url("${BACKGROUND_IMAGE}")`,
            backgroundPosition: "center 45%",
          }}
        />

        {/* DARK NAVY OVERLAY */}
        <div className="absolute inset-0 bg-[#14202D]/55" />

        {/* LEFT CONTENT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101C2B]/95 via-[#142132]/85 to-[#142132]/25" />

        {/* BOTTOM GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101C2B]/80 via-transparent to-[#101C2B]/20" />

        {/* WARM GOLD LIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_83%_42%,rgba(233,172,18,0.13),transparent_48%)]" />

        {/* SUBTLE TEXTURE */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* MOVING LIGHT */}
        {!reduceMotion && (
          <motion.div
            animate={{
              x: ["-20%", "25%", "-20%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-40 top-0 h-full w-[340px] rotate-[18deg] bg-gradient-to-r from-transparent via-[#E9AC12]/10 to-transparent blur-[60px]"
          />
        )}
      </div>

      {/* TOP ACCENT */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E9AC12]/60 to-transparent" />

      {/* ==================================
          MAIN HERO CONTENT
      ================================== */}
      <div className="relative mx-auto flex min-h-[490px] max-w-[1450px] flex-col justify-center px-5 pb-36 pt-16 sm:min-h-[530px] sm:px-8 sm:pb-38 lg:min-h-[570px] lg:px-12 lg:pb-40 lg:pt-20">

        <div className="relative z-10 max-w-[820px]">

          {/* EYEBROW */}
          <motion.div
            {...reveal(0.1, 15)}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-10 bg-[#E9AC12]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[3px] text-[#F1C77E] sm:text-[11px]">
              CONTACT CRUNCH & CRISP
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            {...reveal(0.2, 30)}
            className="text-[clamp(31px,4vw,58px)] font-extrabold leading-[1.14] tracking-[-1.7px] text-white"
          >
            <span className="block">
              Let's Connect for
            </span>

            <span className="mt-2 block bg-gradient-to-r from-[#F6D99E] via-[#E9AC12] to-[#E7A04D] bg-clip-text text-transparent">
              Your Business Requirements.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            {...reveal(0.35, 25)}
            className="mt-6 max-w-[590px] border-l-2 border-[#E9AC12]/80 pl-5 text-[14px] leading-[1.95] text-[#E0E6EB] sm:text-[15px]"
          >
            Looking for corn products, agricultural commodities
            or frozen foods? Get in touch with our team for
            product information and business enquiries.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            {...reveal(0.5, 25)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact-form"
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-6 py-3.5 text-[13px] font-extrabold text-white shadow-[0_12px_30px_rgba(230,106,22,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(230,106,22,0.38)]"
            >
              Send an Enquiry

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="tel:+918983973799"
              className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/35 bg-white/10 px-6 py-3.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AC12] hover:bg-[#E9AC12]/15"
            >
              <PhoneCall
                size={17}
                className="text-[#F1C77E]"
              />

              Call Our Team
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Crunch and Crisp on WhatsApp"
              className="group flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366]"
            >
              <MessageCircle size={20} />
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE DECORATIVE TEXT */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: EASE,
          }}
          className="pointer-events-none absolute bottom-[160px] right-12 hidden items-end gap-3 xl:flex"
        >
          <span className="h-px w-14 bg-[#E9AC12]/70" />

          <span className="text-[10px] font-bold uppercase tracking-[3px] text-white/65 [writing-mode:vertical-rl]">
            AGRICULTURE • INDUSTRY • SUPPLY
          </span>
        </motion.div>
      </div>

      {/* ==================================
          BOTTOM FLOATING CATEGORY STRIP
      ================================== */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#172331]/75 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1450px] grid-cols-3 px-3 sm:px-8 lg:px-12">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.no}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 25,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.75 + index * 0.12,
                  ease: EASE,
                }}
                className={`group/item relative flex min-w-0 items-center gap-2 px-2 py-5 transition-colors duration-300 hover:bg-white/[0.07] sm:gap-4 sm:px-5 lg:py-6 ${
                  index !== 0 ? "border-l border-white/10" : ""
                }`}
              >
                {/* HOVER LINE */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#E9AC12] transition-transform duration-500 group-hover/item:scale-x-100" />

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E9AC12]/30 bg-[#E9AC12]/10 text-[#E9AC12] transition-all duration-300 group-hover/item:bg-[#E9AC12] group-hover/item:text-[#172331] sm:h-11 sm:w-11">
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <span className="mb-1 hidden text-[9px] font-bold tracking-[1.5px] text-[#E9AC12] sm:block">
                    {item.no}
                  </span>

                  <h3 className="text-[10px] font-extrabold leading-[1.4] text-white sm:text-[13px]">
                    {item.title}
                  </h3>

                  <p className="mt-1 hidden text-[11px] text-[#B8C5D2] sm:block">
                    {item.subtitle}
                  </p>
                </div>

                <MoveUpRight
                  size={15}
                  className="ml-auto hidden text-[#E9AC12] opacity-0 transition-all duration-300 group-hover/item:-translate-y-1 group-hover/item:translate-x-1 group-hover/item:opacity-100 lg:block"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM GOLD EDGE */}
      <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-transparent opacity-70" />
    </section>
  );
}
