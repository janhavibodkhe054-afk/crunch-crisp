
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sprout } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WHATSAPP_NUMBER = "918983973799";
const IMAGE = "/commodity.webp";

export default function AgriculturalCommodities() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    AOS.init({
      duration: 850,
      once: true,
      easing: "ease-out-cubic",
    });

    AOS.refresh();
  }, []);

  const handleEnquiry = () => {
    const message =
      "Hello Crunch & Crisp India LLP,\n\n" +
      "I would like to enquire about Maize (Corn) and Corn-Based Agricultural Commodities.\n" +
      "Please share product availability and bulk supply details.";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="agricultural-commodities"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1350px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* LEFT IMAGE */}
        <div
          data-aos="fade-right"
          className="group relative"
        >
          <div className="relative h-[300px] overflow-hidden rounded-[20px] bg-[#F2E8D7] sm:h-[390px] lg:h-[430px]">
            <img
              src={IMAGE}
              alt="Maize and corn-based agricultural commodities"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#202A38]/30 to-transparent" />

            <div className="absolute bottom-6 left-6 rounded-lg border border-white/30 bg-white/90 px-5 py-3 backdrop-blur-md">
              <span className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#202A38]">
                Maize & Corn-Based Commodities
              </span>
            </div>
          </div>

          {/* DECORATIVE FRAME */}
          <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-[65%] w-[65%] rounded-[20px] border-[3px] border-[#E9AC12]/45" />
        </div>

        {/* RIGHT CONTENT */}
        <div data-aos="fade-left">

          {/* EYEBROW */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#C68A31]">
              CORN & AGRICULTURAL SUPPLY
            </span>
          </div>

          {/* HEADING */}
          <h2 className="max-w-[600px] text-[clamp(30px,3.3vw,46px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Quality Maize &
            <span className="block text-[#E66A16]">
              Corn-Based Commodities.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[550px] text-[14px] leading-[1.95] text-[#6B7786] sm:text-[15px]">
            Crunch & Crisp India LLP supplies maize (corn)
            and corn-based agricultural products to food
            processing industries, manufacturers, distributors
            and commercial buyers.
          </p>

          <p className="mt-4 max-w-[550px] text-[14px] leading-[1.95] text-[#6B7786] sm:text-[15px]">
            Our product range includes Yellow Maize Seeds,
            Corn Grits, Crushed Maize, Corn Germ, Corn Cob
            and Fine Corn Powder, supporting various
            industrial and business requirements.
          </p>

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
            Enquire for Bulk Corn Supply

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.button>

          {/* SMALL DETAIL */}
          <div className="mt-9 flex items-center gap-3 border-t border-[#E9EDF0] pt-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF5E7] text-[#E66A16]">
              <Sprout size={18} />
            </span>

            <span className="text-[11px] font-bold uppercase tracking-[1.3px] text-[#85909C]">
              Corn Processing • Industrial Supply • Bulk Orders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
