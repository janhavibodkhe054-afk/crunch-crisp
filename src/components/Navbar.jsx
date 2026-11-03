
import React, { useEffect, useRef, useState } from "react";

import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  MessageCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

/* ============================================
   NAVIGATION DATA
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
   SOCIAL ICONS
============================================ */

function SocialIcons({ mobile = false }) {
  return (
    <div className={`flex items-center ${mobile ? "gap-4" : "gap-2.5"}`}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;

        const iconContent = (
          <span
            className={`flex shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:-translate-y-0.5 ${
              mobile
                ? "h-10 w-10 border border-[#FFE4CE]"
                : "h-[29px] w-[29px]"
            }`}
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
   MAIN NAVBAR
============================================ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const closeButtonRef = useRef(null);
  const menuButtonRef = useRef(null);

  /* SCROLL SHADOW */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20;

      setScrolled((previous) =>
        previous === next ? previous : next
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* CLOSE MENU ON PAGE CHANGE */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* BODY SCROLL LOCK */
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus({
      preventScroll: true,
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* ESCAPE KEY */
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

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const openMobile = () => {
    setMobileOpen(true);
  };

  const desktopLinkClass = ({ isActive }) => `
    relative flex h-full items-center
    whitespace-nowrap text-[15px] font-bold
    tracking-[-0.15px] transition-colors duration-300

    after:absolute after:bottom-[19px]
    after:left-0 after:h-[3px]
    after:rounded-full after:bg-[#E66A16]
    after:transition-all after:duration-300

    ${
      isActive
        ? "text-[#E66A16] after:w-full"
        : "text-[#202A38] after:w-0 hover:text-[#E66A16] hover:after:w-full"
    }
  `;

  return (
    <>
      {/* ======================================
          HEADER
      ====================================== */}

      <header
        className={`sticky top-0 z-[1000] w-full bg-white transition-shadow duration-200 ${
          scrolled
            ? "shadow-[0_8px_30px_rgba(32,42,56,0.10)]"
            : ""
        }`}
      >
        {/* TOP BAR */}
        <div className="w-full bg-[#41454B] text-white">
          <div className="mx-auto flex min-h-[42px] w-[calc(100%-32px)] max-w-[1440px] items-center justify-between gap-4 sm:w-[calc(100%-48px)]">
            <div className="flex items-center gap-5">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-[12px] font-semibold text-white transition-colors hover:text-[#FFD15A]"
              >
                <Phone size={14} />
                +91 8983973799
              </a>

              <span className="hidden h-4 w-px bg-white/30 md:block" />

              <span className="hidden text-[12px] font-medium text-white/85 md:block">
                Agricultural Products & Bulk Supply Solutions
              </span>
            </div>

            <SocialIcons />
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div className="border-b border-[#FFE8D5] bg-white">
          <div
            className={`mx-auto flex w-[calc(100%-32px)] max-w-[1440px] items-center justify-between gap-5 sm:w-[calc(100%-48px)] ${
              scrolled
                ? "h-[72px] xl:h-[78px]"
                : "h-[82px] xl:h-[92px]"
            }`}
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
                width="225"
                height="80"
                fetchPriority="high"
                className="h-[58px] w-auto max-w-[190px] object-contain sm:h-[70px] sm:max-w-[225px]"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Main navigation"
              className="ml-auto hidden h-full items-center gap-5 xl:flex 2xl:gap-8"
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden h-[49px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#E66A16] to-[#F28C18] px-6 text-[13px] font-extrabold text-white shadow-[0_7px_20px_rgba(230,106,22,0.23)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#D95B0C] hover:to-[#E9AC12] xl:flex"
              >
                Get Bulk Quote
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* MOBILE MENU BUTTON */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={openMobile}
                aria-label="Open navigation menu"
                aria-controls="cc-mobile-menu"
                aria-expanded={mobileOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#E66A16] to-[#E9AC12] text-white shadow-[0_4px_14px_rgba(230,106,22,0.24)] active:scale-95 xl:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================
          MOBILE BACKDROP
      ====================================== */}

      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={`fixed inset-0 z-[1090] bg-[#202A38]/55 transition-opacity duration-300 ease-out xl:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      />

      {/* ======================================
          MOBILE DRAWER
      ====================================== */}

      <aside
        id="cc-mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`fixed inset-y-0 right-0 z-[1100] flex w-[min(390px,90vw)] flex-col bg-white shadow-[-15px_0_45px_rgba(0,0,0,0.15)] transition-[transform,visibility] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform xl:hidden ${
          mobileOpen
            ? "visible translate-x-0"
            : "invisible translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#FFE8D5] px-5 py-4">
          <Link to="/" onClick={closeMobile}>
            <img
              src="/logo.jpeg"
              alt="Crunch & Crisp India LLP"
              width="195"
              height="65"
              className="h-[55px] w-auto max-w-[190px] object-contain"
            />
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0E1] text-[#E66A16] active:scale-95"
          >
            <X size={22} />
          </button>
        </div>

        {/* SCROLLABLE MENU CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">

          {/* PAGE LINKS */}
          <nav
            aria-label="Mobile pages"
            className="flex flex-col"
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `group flex min-h-[54px] items-center justify-between border-b border-[#FFE8D5] px-2 text-[16px] font-bold transition-colors duration-200 ${
                    isActive
                      ? "text-[#E66A16]"
                      : "text-[#202A38]"
                  }`
                }
              >
                <span>{item.name}</span>

                <ArrowUpRight
                  size={17}
                  className="text-[#E66A16] transition-transform duration-200 group-active:translate-x-1"
                />
              </NavLink>
            ))}
          </nav>

          {/* ======================================
              QUOTE BUTTON IMMEDIATELY AFTER PAGES
          ====================================== */}

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#E66A16] to-[#F28C18] px-4 text-[14px] font-extrabold text-white shadow-[0_6px_18px_rgba(230,106,22,0.20)] transition-transform duration-200 active:scale-[0.98]"
          >
            <MessageCircle size={19} />
            Get Bulk Quote
            <ArrowUpRight size={17} />
          </a>

          {/* CONTACT NUMBER */}
          <a
            href={`tel:${PHONE}`}
            className="mt-6 flex items-center justify-center gap-2 text-[13px] font-bold text-[#202A38]"
          >
            <Phone size={16} className="text-[#E66A16]" />
            +91 8983973799
          </a>

          {/* SOCIAL ICONS */}
          <div className="mt-6 flex justify-center">
            <SocialIcons mobile />
          </div>

          {/* BOTTOM BRAND LINE */}
          <p className="mt-7 text-center text-[10px] font-semibold uppercase tracking-[1.2px] text-[#8A939E]">
            Agricultural Products & Bulk Supply
          </p>
        </div>
      </aside>
    </>
  );
}
