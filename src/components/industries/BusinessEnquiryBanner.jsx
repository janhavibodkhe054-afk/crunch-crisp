
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "918983973799";
const BG_IMAGE = "/business-enquiry-bg.jpg";

export default function BusinessEnquiryBanner() {
  const reduceMotion = useReducedMotion();

  const handleEnquiry = () => {
    const message =
      "Hello Crunch & Crisp India LLP,\n\n" +
      "I would like to discuss product solutions for my business.\n\n" +
      "Industry: \n" +
      "Product Requirement: \n" +
      "Required Quantity: \n" +
      "Business Name: \n" +
      "Location: ";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="business-enquiry"
      className="group relative isolate overflow-hidden bg-[#202A38] py-14 text-white sm:py-16 lg:py-[70px]"
    >
      {/* BACKGROUND IMAGE */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          style={{
            backgroundImage: `url("${BG_IMAGE}")`,
          }}
        />

        {/* DARK NAVY OVERLAY */}
        <div className="absolute inset-0 bg-[#142132]/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#101C2B]/95 via-[#142132]/85 to-[#142132]/50" />

        {/* GOLD GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_50%,rgba(233,172,18,0.12),transparent_55%)]" />
      </div>

      {/* TOP GOLD LINE */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-transparent" />

      {/* CONTENT */}
      <div className="relative mx-auto flex max-w-[1350px] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-12">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[850px]"
        >
          {/* EYEBROW */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-9 bg-[#E9AC12]" />

            <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#F1C77E]">
              BUSINESS ENQUIRY
            </span>
          </div>

          {/* HEADING */}
          <h2 className="text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.25] tracking-[-0.8px]">
            Your Industry. Your Requirements.
            <span className="block text-[#E9AC12]">
              Our Product Solutions.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-[650px] text-[13px] leading-[1.85] text-[#E0E6EC] sm:text-[14px]">
            Connect with our team to discuss agricultural products,
            corn-based ingredients and bulk supply requirements
            for your business.
          </p>
        </motion.div>

        {/* RIGHT CTA */}
        <motion.button
          type="button"
          onClick={handleEnquiry}
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 25,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          whileHover={
            reduceMotion ? undefined : { y: -4 }
          }
          className="group/btn inline-flex shrink-0 items-center gap-4 rounded-xl bg-[#E66A16] px-7 py-4 text-[12px] font-extrabold text-white shadow-[0_12px_30px_rgba(230,106,22,0.25)] transition-all duration-300 hover:bg-[#E9AC12] hover:text-[#202A38]"
        >
          Discuss Your Requirements

          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
          />
        </motion.button>
      </div>

      {/* BOTTOM GOLD LINE */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-transparent" />
    </section>
  );
}
