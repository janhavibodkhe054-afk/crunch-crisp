
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";

const BG_IMAGE = "/quality-cta-bg.jpg";
const WHATSAPP_NUMBER = "918983973799";

const message = `Hello Crunch & Crisp India LLP,

I would like to enquire about bulk product requirements.

Product Name:
Product Specifications:
Required Quantity:
Business Name:
Location:

Please share the relevant product and supply details.`;

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  message
)}`;

const ease = [0.22, 1, 0.36, 1];

export default function QualityCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="quality-cta"
      className="relative isolate overflow-hidden bg-[#111923] text-white"
    >
      {/* BACKGROUND IMAGE */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url("${BG_IMAGE}")` }}
        />

        {/* NAVY + CHARCOAL OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1420]/95 via-[#202A38]/90 to-[#343C47]/85" />

        {/* ANIMATED ORANGE GLOW */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 70, 0],
                  opacity: [0.3, 0.55, 0.3],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-36 -left-28 h-[340px] w-[430px] rounded-full bg-[#E66A16]/25 blur-[100px]"
        />

        {/* ANIMATED GOLD GLOW */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -55, 0],
                  opacity: [0.2, 0.45, 0.2],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-28 -top-40 h-[370px] w-[430px] rounded-full bg-[#E9AC12]/20 blur-[110px]"
        />

        {/* SUBTLE GRID */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* TOP ACCENT LINE */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9AC12] to-transparent" />

      {/* MAIN CONTENT */}
      <div className="relative mx-auto flex max-w-[1350px] flex-col items-start justify-between gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:min-h-[230px] lg:flex-row lg:items-center lg:gap-14 lg:px-12 lg:py-12">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : -35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-[780px]"
        >
          {/* EYEBROW */}
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={15} className="text-[#F4B51C]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[2.3px] text-[#F4C76A]">
              BULK PRODUCT ENQUIRY
            </span>
          </div>

          {/* HEADING */}
          <h2 className="text-[clamp(25px,2.7vw,38px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
            Looking for Quality-Focused
            <span className="block text-[#F4B51C]">
              Products for Your Business?
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-[700px] text-[13px] leading-[1.85] text-[#D5DCE4] sm:text-[14px]">
            Share your product specifications, required quantities
            and business requirements with our team. Let's discuss
            suitable corn-based products and agricultural commodity
            solutions.
          </p>
        </motion.div>

        {/* RIGHT CTA */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease,
          }}
          className="w-full shrink-0 sm:w-auto"
        >
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -4,
                    scale: 1.03,
                  }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.97 }
            }
            className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#E66A16] px-7 py-4 text-[13px] font-extrabold text-white shadow-[0_10px_35px_rgba(230,106,22,0.3)] transition-colors duration-300 hover:bg-[#F4B51C] hover:text-[#202A38] sm:w-auto"
          >
            <MessageCircle size={18} />

            Get a Bulk Quote

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>

          <p className="mt-3 text-center text-[10px] tracking-[0.4px] text-[#B8C2CC]">
            Share your requirements with our team
          </p>
        </motion.div>
      </div>

      {/* BOTTOM GLOW LINE */}
      <motion.div
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.3,
          ease,
        }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#E66A16] via-[#F4B51C] to-[#E66A16] shadow-[0_0_18px_rgba(244,181,28,0.45)]"
      />
    </section>
  );
}
