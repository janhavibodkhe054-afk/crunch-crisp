
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sprout } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WHATSAPP_NUMBER = "918983973799";
const IMAGE = "/indian.jpg";

export default function IndianSpices() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });

    AOS.refresh();
  }, []);

  const handleEnquiry = () => {
    const message =
      "Hello Crunch & Crisp India LLP,\n\n" +
      "I would like to enquire about Turmeric, Turmeric Powder " +
      "and Indian Spices for bulk commercial requirements.\n" +
      "Please share available products, specifications, " +
      "packaging options and bulk quotation.";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="indian-spices"
      className="relative overflow-hidden bg-[#FFFBF5] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#F8E7C9]/60 blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1350px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* ======================================
            LEFT IMAGE
        ====================================== */}

        <div
          data-aos="fade-right"
          className="group relative order-1"
        >
          <div className="relative h-[300px] overflow-hidden rounded-[20px] bg-[#F4E6CF] sm:h-[390px] lg:h-[430px]">
            <img
              src={IMAGE}
              alt="Indian spices with turmeric and turmeric powder"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#202A38]/35 to-transparent" />

            {/* IMAGE LABEL */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-lg border border-white/30 bg-white/90 px-5 py-3 backdrop-blur-md">
              <Sprout
                size={17}
                className="text-[#E66A16]"
              />

              <span className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#202A38]">
                Turmeric & Indian Spices
              </span>
            </div>
          </div>

          {/* DECORATIVE FRAME */}
          <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-[65%] w-[65%] rounded-[20px] border-[3px] border-[#E9AC12]/45" />
        </div>

        {/* ======================================
            RIGHT CONTENT
        ====================================== */}

        <div
          data-aos="fade-left"
          className="order-2"
        >
          {/* EYEBROW */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#C68A31]">
              INDIAN SPICES DIVISION
            </span>
          </div>

          {/* HEADING */}
          <h2 className="max-w-[600px] text-[clamp(30px,3.3vw,46px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Indian Spices
            <span className="block text-[#E66A16]">
              With Turmeric at the Heart.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[550px] text-[14px] leading-[1.95] text-[#6B7786] sm:text-[15px]">
            Discover our range of Indian Spices, with a
            special focus on Turmeric and Turmeric Powder.
            We support spice traders, food processors,
            wholesalers and distributors with sourcing
            solutions for bulk and commercial requirements.
          </p>

          {/* TURMERIC HIGHLIGHT */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Turmeric",
              "Turmeric Powder",
              "Indian Spices",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#E9AC12]/35 bg-[#FFF3DC] px-4 py-2 text-[11px] font-bold text-[#A76A13]"
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            onClick={handleEnquiry}
            whileHover={
              reduceMotion ? undefined : { y: -4 }
            }
            whileTap={
              reduceMotion ? undefined : { scale: 0.97 }
            }
            className="group mt-8 inline-flex items-center gap-4 rounded-xl bg-[#202A38] px-7 py-4 text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(32,42,56,0.12)] transition-colors duration-300 hover:bg-[#E66A16]"
          >
            Enquire About Indian Spices

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.button>

          {/* SMALL DETAIL */}
          <div className="mt-9 flex items-center gap-3 border-t border-[#EDE4D8] pt-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#E66A16] shadow-sm">
              <Sprout size={18} />
            </span>

            <span className="text-[11px] font-bold uppercase tracking-[1.3px] text-[#85909C]">
              Spice Traders • Food Processors • Bulk Buyers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
