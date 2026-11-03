import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Package, Boxes, ClipboardList, ArrowUpRight } from "lucide-react";

const MAIN_IMAGE = "/img1.webp";
const SECONDARY_IMAGE = "/logo.jpeg";

const WHATSAPP_NUMBER = "918983973799";

const whatsappMessage = `Hello Crunch & Crisp India LLP,

I would like to discuss packaging requirements.

Product Name:
Required Quantity:
Packaging Preference:
Business Name:
Location:`;

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

const considerations = [
  {
    icon: Package,
    title: "Product Type",
    text: "Packaging considerations based on the product category.",
  },
  {
    icon: Boxes,
    title: "Order Quantity",
    text: "Understanding bulk and commercial quantity requirements.",
  },
  {
    icon: ClipboardList,
    title: "Customer Specifications",
    text: "Discussing packaging preferences for handling and supply.",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function PackagingBulkSupply() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="packaging-bulk-supply"
      className="relative isolate overflow-hidden bg-[#F5F6F8] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#E9AC12]/10 blur-[110px]" />

        <div className="absolute -bottom-48 -right-36 h-[450px] w-[450px] rounded-full bg-[#E66A16]/10 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#202A38 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1350px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* LEFT IMAGE SHOWCASE */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : -45,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease,
          }}
          className="relative mx-auto w-full max-w-[570px] pb-12 pr-8 sm:pb-14 sm:pr-12"
        >
          {/* BACK FRAME */}
          <div className="absolute left-5 top-5 h-[82%] w-[88%] rounded-[24px] border border-[#E9AC12]/60" />

          {/* MAIN IMAGE */}
          <div className="group relative h-[310px] overflow-hidden rounded-[22px] bg-[#DDE1E5] shadow-[0_20px_55px_rgba(32,42,56,0.13)] sm:h-[390px] lg:h-[420px]">
            <motion.img
              src={MAIN_IMAGE}
              alt="Agricultural commodity packaging"
              loading="lazy"
              whileHover={reduceMotion ? undefined : { scale: 1.07 }}
              transition={{ duration: 0.7, ease }}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#202A38]/55 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#F4C76A]">
                PACKAGING & BULK SUPPLY
              </span>

              <p className="mt-2 text-[20px] font-extrabold text-white sm:text-[23px]">
                Commercial Product Supply
              </p>
            </div>
          </div>

          {/* SECONDARY IMAGE — MOBILE FIX */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
    absolute bottom-0 right-0
    w-[48%] sm:w-[43%]
    overflow-hidden
    rounded-[17px]
    border-[4px] sm:border-[5px]
    border-[#F5F6F8]
    bg-white
    shadow-[0_15px_40px_rgba(32,42,56,0.2)]
  "
          >
            <img
              src={SECONDARY_IMAGE}
              alt="Crunch & Crisp India LLP Logo"
              loading="lazy"
              decoding="async"
              className="
      h-[115px] w-full
      object-contain
      p-2
      sm:h-[165px]
      sm:p-0
      sm:object-cover
    "
            />
          </motion.div>

          {/* SMALL FLOATING LABEL */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-1 top-7 flex items-center gap-2 rounded-lg border border-[#E8EAEE] bg-white px-4 py-3 shadow-lg sm:-left-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF1DF] text-[#E66A16]">
              <Package size={19} />
            </span>

            <span className="text-[11px] font-extrabold text-[#202A38]">
              Bulk Supply
              <span className="block text-[10px] font-medium text-[#87919C]">
                Business Requirements
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease,
          }}
        >
          {/* EYEBROW */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-9 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.3px] text-[#C88B2C]">
              PACKAGING & BULK SUPPLY
            </span>
          </div>

          {/* HEADING */}
          <h2 className="max-w-[600px] text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Packaging Solutions
            <span className="block text-[#E66A16]">
              for Commercial Requirements.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[550px] text-[14px] leading-[1.95] text-[#73808D] sm:text-[15px]">
            Packaging requirements may vary according to product type, order
            quantity and customer specifications.
          </p>

          {/* CONSIDERATIONS */}
          <div className="mt-8 space-y-4">
            {considerations.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.12,
                    ease,
                  }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl border border-[#F2E1CA] bg-[#FFF3E5] text-[#E66A16] transition-all duration-300 group-hover:border-[#E66A16] group-hover:bg-[#E66A16] group-hover:text-white">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <div className="border-b border-[#E5E8EB] pb-4">
                    <h3 className="text-[15px] font-extrabold text-[#202A38]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[12px] leading-[1.8] text-[#7C8792] sm:text-[13px]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-[#E66A16] px-7 py-4 text-[12px] font-extrabold text-white shadow-[0_10px_30px_rgba(230,106,22,0.2)] transition-colors duration-300 hover:bg-[#202A38]"
          >
            Discuss Packaging Requirements
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
