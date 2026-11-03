
import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link, NavLink, useLocation } from "react-router-dom";

/* ============================================
   CRUNCH & CRISP INDIA LLP
   PREMIUM RESPONSIVE NAVBAR
   TAILWIND CSS ONLY
============================================ */

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Products", path: "/products" },
  { name: "Industries", path: "/industries" },
  { name: "Quality", path: "/quality" },
  { name: "Contact Us", path: "/contact" },
];

const PHONE = "+918983973799";

const WHATSAPP_URL =
  "https://wa.me/918983973799?text=" +
  encodeURIComponent(
    "Hello Crunch & Crisp India LLP, I would like to enquire about your products and bulk supply requirements."
  );

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

/* ============================================
   SOCIAL ICON COMPONENT
============================================ */

function SocialIcons({ mobile = false }) {
  return (
    <div
      className={`flex items-center ${
        mobile ? "gap-4" : "gap-2.5"
      }`}
    >
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;

        const iconContent = (
          <span
            className={`
              flex shrink-0 items-center justify-center
              rounded-full bg-white
              transition-all duration-300
              hover:-translate-y-0.5
              ${
                mobile
                  ? "h-[40px] w-[40px] border border-[#FFE4CE]"
                  : "h-[29px] w-[29px]"
              }
            `}
            style={{ color: social.color }}
          >
            <Icon size={mobile ? 18 : 15} />
          </span>
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
    </div>
  );
}

/* ============================================
   MAIN NAVBAR COMPONENT
============================================ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const closeButtonRef = useRef(null);
  const menuButtonRef = useRef(null);

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* CLOSE ON ROUTE CHANGE */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* BODY SCROLL LOCK */
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* ESC KEY */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const desktopLinkClass = ({ isActive }) => `
    relative flex h-full items-center
    whitespace-nowrap
    text-[15px] font-bold
    tracking-[-0.15px]
    transition-colors duration-300

    after:absolute
    after:bottom-[19px]
    after:left-0
    after:h-[3px]
    after:rounded-full
    after:bg-[#E66A16]
    after:transition-all
    after:duration-300

    ${
      isActive
        ? "text-[#E66A16] after:w-full"
        : "text-[#202A38] after:w-0 hover:text-[#E66A16] hover:after:w-full"
    }
  `;

  return (
    <>
      {/* ============================================
          HEADER
      ============================================ */}
      <header
        className={`
          sticky top-0 z-[1000] w-full bg-white
          transition-shadow duration-300
          ${
            scrolled
              ? "shadow-[0_8px_30px_rgba(32,42,56,0.10)]"
              : ""
          }
        `}
      >
        {/* ============================================
            TOP BAR - CHARCOAL GRAY
        ============================================ */}
        <div className="w-full bg-[#41454B] text-white">
          <div
            className="
              mx-auto flex min-h-[42px]
              w-[calc(100%-32px)] max-w-[1440px]
              items-center justify-between gap-4
              sm:w-[calc(100%-48px)]
            "
          >
            {/* PHONE */}
            <div className="flex items-center gap-5">
              <a
                href={`tel:${PHONE}`}
                className="
                  flex items-center gap-2
                  text-[12px] font-semibold text-white
                  transition-colors hover:text-[#FFD15A]
                "
              >
                <Phone size={14} />
                +91 8983973799
              </a>

              <span className="hidden h-4 w-px bg-white/30 md:block" />

              <span
                className="
                  hidden text-[12px] font-medium
                  text-white/85 md:block
                "
              >
                Agricultural Products & Bulk Supply Solutions
              </span>
            </div>

            {/* SOCIAL */}
            <SocialIcons />
          </div>
        </div>

        {/* ============================================
            MAIN NAVBAR
        ============================================ */}
        <div className="border-b border-[#FFE8D5] bg-white">
          <div
            className={`
              mx-auto flex
              w-[calc(100%-32px)] max-w-[1440px]
              items-center justify-between gap-5
              transition-[height] duration-300
              sm:w-[calc(100%-48px)]
              ${
                scrolled
                  ? "h-[72px] xl:h-[78px]"
                  : "h-[82px] xl:h-[92px]"
              }
            `}
          >
            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMobile}
              className="flex shrink-0 items-center"
            >
              <img
                src="/logo.jpeg"
                alt="Crunch & Crisp India LLP"
                className="
                  h-[58px] w-auto max-w-[190px]
                  object-contain
                  sm:h-[70px] sm:max-w-[225px]
                "
              />
            </Link>

            {/* DESKTOP MENU */}
            <nav
              aria-label="Main navigation"
              className="
                ml-auto hidden h-full items-center
                gap-5 xl:flex 2xl:gap-8
              "
            >
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={desktopLinkClass}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex shrink-0 items-center gap-3">
              {/* DESKTOP BUTTON */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group hidden h-[49px]
                  items-center justify-center gap-2.5
                  rounded-full
                  bg-gradient-to-r
                  from-[#E66A16] to-[#F28C18]
                  px-6
                  text-[13px] font-extrabold text-white
                  shadow-[0_7px_20px_rgba(230,106,22,0.23)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:from-[#D95B0C] hover:to-[#E9AC12]
                  hover:shadow-[0_10px_28px_rgba(230,106,22,0.33)]
                  xl:flex
                "
              >
                Get Bulk Quote
                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>

              {/* MOBILE MENU TOGGLE */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-controls="cc-mobile-menu"
                aria-expanded={mobileOpen}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#E66A16] to-[#E9AC12]
                  text-white
                  shadow-[0_4px_14px_rgba(230,106,22,0.24)]
                  transition-all duration-300
                  hover:scale-105 xl:hidden
                "
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
          MOBILE BACKDROP
      ============================================ */}
      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={`
          fixed inset-0 z-[1090]
          bg-[#202A38]/60 backdrop-blur-[4px]
          transition-all duration-500 ease-in-out
          xl:hidden
          ${
            mobileOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* ============================================
          PREMIUM MOBILE DRAWER
      ============================================ */}
      <aside
        id="cc-mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`
          fixed top-0 right-0 bottom-0 z-[1100]
          flex w-[min(390px,90vw)] flex-col
          bg-white
          shadow-[-20px_0_60px_rgba(0,0,0,0.16)]
          transition-[transform,visibility]
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          xl:hidden
          ${
            mobileOpen
              ? "visible translate-x-0"
              : "invisible translate-x-full"
          }
        `}
      >
        {/* MOBILE HEADER */}
        <div
          className="
            flex items-center justify-between
            border-b border-[#FFE8D5]
            px-5 py-5
          "
        >
          <img
            src="/logo.jpeg"
            alt="Crunch & Crisp India LLP"
            className="h-[60px] w-auto max-w-[195px] object-contain"
          />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-[#FFF0E1] text-[#E66A16]
              transition-all duration-300
              hover:rotate-90 hover:bg-[#FFE1C4]
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <nav className="flex flex-col">
            {NAV_LINKS.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMobile}
                style={{
                  transitionDelay: mobileOpen
                    ? `${index * 50}ms`
                    : "0ms",
                }}
                className={({ isActive }) => `
                  group flex min-h-[66px]
                  items-center justify-between
                  border-b border-[#FFE8D5]
                  text-[18px] font-bold
                  transition-all duration-500
                  ${
                    mobileOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-6 opacity-0"
                  }
                  ${
                    isActive
                      ? "text-[#E66A16]"
                      : "text-[#202A38]"
                  }
                `}
              >
                <span>{item.name}</span>

                <ArrowUpRight
                  size={19}
                  className="
                    text-[#E66A16]
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* MOBILE FOOTER */}
        <div
          className="
            border-t border-[#FFE8D5]
            bg-[#FFF9F2]
            px-6 py-6
          "
        >
          {/* QUOTE BUTTON */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="
              flex h-[52px] w-full
              items-center justify-center gap-3
              rounded-full
              bg-gradient-to-r
              from-[#E66A16] to-[#F28C18]
              text-[14px] font-bold text-white
              shadow-[0_6px_20px_rgba(230,106,22,0.23)]
              transition-all duration-300
              hover:-translate-y-0.5
            "
          >
            <MessageCircle size={19} />
            Get Bulk Quote
            <ArrowUpRight size={17} />
          </a>

          {/* PHONE */}
          <a
            href={`tel:${PHONE}`}
            className="
              mt-5 flex items-center justify-center gap-2
              text-[13px] font-bold text-[#202A38]
            "
          >
            <Phone size={16} className="text-[#E66A16]" />
            +91 8983973799
          </a>

          {/* SOCIAL ICONS */}
          <div className="mt-5 flex justify-center">
            <SocialIcons mobile />
          </div>
        </div>
      </aside>
    </>
  );
}
