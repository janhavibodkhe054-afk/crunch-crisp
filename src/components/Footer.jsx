
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageCircle,
  ChevronUp,
  PackageCheck,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

/* ======================================
   CRUNCH & CRISP INDIA LLP
   MOBILE OPTIMIZED FOOTER
====================================== */

const PHONE = "+918983973799";

const WHATSAPP_URL =
  "https://wa.me/918983973799?text=" +
  encodeURIComponent(
    "Hello Crunch & Crisp India LLP, I would like to enquire about your products and business requirements."
  );

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Products", path: "/products" },
  { name: "Industries We Serve", path: "/industries" },
  { name: "Quality & Manufacturing", path: "/quality" },
  { name: "Contact Us", path: "/contact" },
];

const PRODUCT_LINKS = [
  {
    name: "Premium Corn Grits",
    path: "/products/premium-corn-grits",
  },
  {
    name: "Fine Corn Powder",
    path: "/products/fine-corn-powder",
  },
  {
    name: "Yellow Crushed Maize",
    path: "/products/yellow-crushed-maize",
  },
  {
    name: "Yellow Maize Seeds",
    path: "/products/yellow-maize-seeds",
  },
  {
    name: "Whole Yellow Corn Germ",
    path: "/products/whole-yellow-corn-germ",
  },
  {
    name: "Corn Cob",
    path: "/products/corn-cob",
  },
  {
    name: "Agricultural Commodities",
    path: "/products/agricultural-commodities",
  },
  {
    name: "Frozen Foods",
    path: "/products/frozen-foods",
  },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "",
    icon: FaFacebookF,
    color: "#1877F2",
  },
  {
    name: "Instagram",
    url: "",
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    name: "LinkedIn",
    url: "",
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
];

const particles = [
  { x: "6%", y: "18%", size: 4, delay: 0, duration: 5 },
  { x: "14%", y: "65%", size: 3, delay: 1.2, duration: 7 },
  { x: "25%", y: "35%", size: 5, delay: 2, duration: 6 },
  { x: "36%", y: "78%", size: 3, delay: 0.8, duration: 8 },
  { x: "47%", y: "20%", size: 4, delay: 1.8, duration: 6 },
  { x: "58%", y: "72%", size: 5, delay: 0.5, duration: 7 },
  { x: "69%", y: "28%", size: 3, delay: 2.4, duration: 5 },
  { x: "79%", y: "58%", size: 4, delay: 1, duration: 8 },
  { x: "88%", y: "16%", size: 5, delay: 2.1, duration: 6 },
  { x: "95%", y: "76%", size: 3, delay: 0.4, duration: 7 },
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

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/* ======================================
   ANIMATED BACKGROUND
====================================== */

function AnimatedBackground({ animateEffects }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* GRID TEXTURE - DESKTOP ONLY */}
      <div
        className="absolute inset-0 hidden opacity-[0.055] lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* STATIC MOBILE BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#202832] via-[#202A38] to-[#19212B] lg:hidden" />

      {animateEffects && (
        <>
          {/* GOLDEN LIGHT BEAM */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-[45%] left-0 h-[190%] w-[35%] rotate-[25deg] bg-gradient-to-r from-transparent via-[#E9AC12]/[0.10] to-transparent blur-[40px]"
            animate={{
              x: ["-120vw", "160vw"],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* SECOND LIGHT BEAM */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-[35%] left-0 h-[170%] w-[18%] rotate-[-20deg] bg-gradient-to-r from-transparent via-[#E66A16]/[0.08] to-transparent blur-[35px]"
            animate={{
              x: ["160vw", "-120vw"],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* ORANGE GLOW */}
          <motion.div
            aria-hidden="true"
            className="absolute -left-[140px] top-[5%] h-[370px] w-[370px] rounded-full bg-[#E66A16]/15 blur-[95px]"
            animate={{
              x: [0, 130, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* GOLDEN GLOW */}
          <motion.div
            aria-hidden="true"
            className="absolute -right-[150px] bottom-[-120px] h-[400px] w-[400px] rounded-full bg-[#E9AC12]/15 blur-[100px]"
            animate={{
              x: [0, -120, 0],
              y: [0, -50, 0],
              scale: [1, 1.25, 1],
              opacity: [0.45, 0.85, 0.45],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* FLOATING PARTICLES */}
          {particles.map((particle, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              className="absolute rounded-full bg-[#F4BD43]"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                boxShadow: "0 0 12px rgba(233,172,18,0.7)",
              }}
              animate={{
                y: [0, -38, 0],
                x: [0, 18, 0],
                opacity: [0.15, 0.8, 0.15],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

/* ======================================
   FOOTER HEADING
====================================== */

function FooterHeading({ children, animateEffects }) {
  return (
    <div className="mb-5">
      <h3 className="text-[18px] font-extrabold tracking-[-0.3px] text-white lg:text-[19px]">
        {children}
      </h3>

      <div className="mt-3 flex items-center gap-1.5">
        <motion.span
          className="h-[3px] w-9 rounded-full bg-[#E66A16]"
          animate={
            animateEffects
              ? { width: [36, 54, 36] }
              : undefined
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <span className="h-[3px] w-3 rounded-full bg-[#E9AC12]" />
      </div>
    </div>
  );
}

/* ======================================
   SOCIAL ICONS
====================================== */

function FooterSocials({ animateEffects }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;

        const iconContent = (
          <motion.span
            whileHover={
              animateEffects
                ? {
                    y: -5,
                    rotateY: 360,
                    scale: 1.1,
                  }
                : undefined
            }
            transition={{
              duration: 0.65,
              ease,
            }}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/10 bg-white shadow-[0_5px_14px_rgba(0,0,0,0.12)]"
            style={{
              color: social.color,
            }}
          >
            <Icon size={17} />
          </motion.span>
        );

        return social.url ? (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            {iconContent}
          </a>
        ) : (
          <span
            key={social.name}
            title={`${social.name} link coming soon`}
          >
            {iconContent}
          </span>
        );
      })}

      {/* WHATSAPP */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        whileHover={
          animateEffects
            ? {
                y: -5,
                rotateY: 360,
                scale: 1.1,
              }
            : undefined
        }
        transition={{
          duration: 0.65,
          ease,
        }}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/10 bg-white text-[#25D366] shadow-[0_5px_14px_rgba(0,0,0,0.12)]"
      >
        <FaWhatsapp size={21} />
      </motion.a>
    </div>
  );
}

/* ======================================
   FOOTER LINK
====================================== */

function FooterLink({ item }) {
  return (
    <li>
      <Link
        to={item.path}
        className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-white/75 transition-colors duration-200 hover:text-[#F4BD43] lg:hover:translate-x-1"
      >
        <ArrowRight
          size={14}
          className="shrink-0 text-[#E66A16]"
        />

        {item.name}
      </Link>
    </li>
  );
}

/* ======================================
   MAIN FOOTER
====================================== */

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const footerRef = React.useRef(null);

  const isInView = useInView(footerRef, {
    amount: 0.1,
  });

  const animateEffects =
    !isMobile && !reduceMotion && isInView;

  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const reveal = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const revealProps = {
    variants: reveal,
    initial: reduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      amount: 0.1,
    },
    transition: {
      duration: isMobile ? 0.4 : 0.65,
      ease,
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden bg-[#202832] text-white"
    >
      {/* BACKGROUND */}
      <AnimatedBackground animateEffects={animateEffects} />

      {/* TOP BORDER */}
      <div className="absolute inset-x-0 top-0 h-[3px] overflow-hidden bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-[#E66A16]">
        {animateEffects && (
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            animate={{
              x: ["-100%", "350%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative mx-auto w-[calc(100%-32px)] max-w-[1440px] pb-11 pt-12 sm:w-[calc(100%-60px)] sm:pb-12 sm:pt-14 lg:pb-14 lg:pt-16">
        <div className="grid grid-cols-1 gap-x-9 gap-y-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-9">

          {/* ======================================
              COMPANY
          ====================================== */}

          <motion.div
            {...revealProps}
            className="sm:col-span-2 lg:col-span-4"
          >
            {/* LOGO */}
            <Link to="/" className="inline-flex items-center">
              <motion.img
                src="/logo.jpeg"
                alt="Crunch & Crisp India LLP"
                loading="lazy"
                decoding="async"
                className="h-[105px] w-auto max-w-full object-contain object-left sm:h-[135px] lg:h-[155px]"
                animate={
                  animateEffects
                    ? {
                        y: [0, -6, 0],
                        rotateY: [0, 5, 0, -5, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Link>

            {/* DESCRIPTION */}
            <p className="mt-4 max-w-[370px] text-[14px] leading-[1.85] text-white/75">
              Crunch & Crisp India LLP delivers quality corn products,
              agricultural commodities and frozen food solutions to support
              diverse business and industrial requirements.
            </p>

            {/* QUALITY LINE */}
            <div className="mt-5 flex items-center gap-2.5 text-[12px] font-bold text-[#F4BD43]">
              <motion.span
                animate={
                  animateEffects
                    ? {
                        y: [0, -5, 0],
                        rotate: [0, 6, 0, -6, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <PackageCheck size={19} />
              </motion.span>

              Quality Products. Reliable Supply.
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-6">
              <FooterSocials animateEffects={animateEffects} />
            </div>
          </motion.div>

          {/* ======================================
              QUICK LINKS
          ====================================== */}

          <motion.div
            {...revealProps}
            className="lg:col-span-2"
          >
            <FooterHeading animateEffects={animateEffects}>
              Quick Links
            </FooterHeading>

            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}
            </ul>
          </motion.div>

          {/* ======================================
              PRODUCTS
          ====================================== */}

          <motion.div
            {...revealProps}
            className="lg:col-span-3"
          >
            <FooterHeading animateEffects={animateEffects}>
              Our Products
            </FooterHeading>

            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}
            </ul>
          </motion.div>

          {/* ======================================
              CONTACT
          ====================================== */}

          <motion.div
            {...revealProps}
            className="lg:col-span-3"
          >
            <FooterHeading animateEffects={animateEffects}>
              Get in Touch
            </FooterHeading>

            <p className="mb-5 text-[13.5px] leading-[1.75] text-white/75">
              Have a product enquiry or business requirement? Connect with our
              team for more information.
            </p>

            {/* PHONE */}
            <a
              href={`tel:${PHONE}`}
              className="group mb-5 flex items-start gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E66A16]/20 text-[#F4BD43] transition-colors duration-200 group-hover:bg-[#E66A16] group-hover:text-white">
                <Phone size={18} />
              </span>

              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[1px] text-white/50">
                  Call Us
                </span>

                <span className="mt-1 block text-[14px] font-bold text-white group-hover:text-[#F4BD43]">
                  +91 8983973799
                </span>
              </span>
            </a>

            {/* WHATSAPP */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-5 flex items-start gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E66A16]/20 text-[#F4BD43] transition-colors duration-200 group-hover:bg-[#E66A16] group-hover:text-white">
                <MessageCircle size={18} />
              </span>

              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[1px] text-white/50">
                  WhatsApp
                </span>

                <span className="mt-1 block text-[14px] font-bold text-white group-hover:text-[#F4BD43]">
                  Send an Enquiry
                </span>
              </span>
            </a>

            {/* CONTACT PAGE */}
            <Link
              to="/contact"
              className="group mt-2 inline-flex items-center gap-2 text-[13.5px] font-bold text-[#F4BD43] transition-colors duration-200 hover:text-white"
            >
              Visit Contact Page
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ======================================
          COPYRIGHT BAR
      ====================================== */}

      <div className="relative border-t border-white/10 bg-[#19212B]">
        <div className="mx-auto flex w-[calc(100%-32px)] max-w-[1440px] flex-col items-center justify-between gap-3 py-4 text-center sm:w-[calc(100%-60px)] lg:flex-row lg:text-left">

          <p className="text-[12px] leading-5 text-white/65">
            © {year} Crunch & Crisp India LLP. All Rights Reserved.
          </p>

          <p className="text-[12px] leading-5 text-white/65">
            Designed & Developed by{" "}
            <a
              href="https://hashgridtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-bold text-[#F4BD43] transition-colors duration-200 hover:text-white"
            >
              HashGrid Technologies Pvt. Ltd.

              <ArrowUpRight size={13} />
            </a>
          </p>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E66A16] to-[#E9AC12] text-white shadow-[0_5px_16px_rgba(230,106,22,0.25)] transition-transform duration-200 active:scale-95 lg:hover:-translate-y-1"
          >
            <ChevronUp size={21} />
          </button>
        </div>
      </div>
    </footer>
  );
}
