
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layers3,
  CircleDot,
  Droplets,
  Package,
  Boxes,
  ArrowUpRight,
  Check,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const qualityFactors = [
  {
    number: "01",
    title: "Material Quality",
    description:
      "Understanding the material characteristics and product expectations relevant to each business application.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Granule Size",
    description:
      "Considering particle and granule size requirements for different processing and manufacturing needs.",
    icon: CircleDot,
  },
  {
    number: "03",
    title: "Moisture Characteristics",
    description:
      "Discussing moisture-related product requirements based on intended applications and handling needs.",
    icon: Droplets,
  },
  {
    number: "04",
    title: "Packaging Requirements",
    description:
      "Understanding packaging preferences and quantity requirements for commercial procurement.",
    icon: Package,
  },
  {
    number: "05",
    title: "Product Handling",
    description:
      "Considering handling and supply-related needs to support suitable product discussions.",
    icon: Boxes,
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function QualityApproach() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });

    AOS.refresh();
  }, []);

  return (
    <section
      id="quality-approach"
      className="relative overflow-hidden bg-[#F8F9FA] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND ACCENTS */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#E9AC12]/5 blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1350px] grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12">

        {/* LEFT CONTENT */}
        <div data-aos="fade-right" className="lg:sticky lg:top-28">

          {/* EYEBROW */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-9 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#C68A31]">
              OUR QUALITY APPROACH
            </span>
          </div>

          {/* HEADING */}
          <h2 className="max-w-[540px] text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Product Consistency
            <span className="block text-[#E66A16]">
              Matters.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[510px] text-[14px] leading-[1.95] text-[#6F7C89] sm:text-[15px]">
            We understand the importance of material quality,
            granule size, moisture characteristics, packaging
            and handling in industrial applications.
          </p>

          <p className="mt-4 max-w-[510px] text-[14px] leading-[1.95] text-[#6F7C89] sm:text-[15px]">
            Our aim is to understand these parameters and work
            toward suitable product solutions for customer
            requirements.
          </p>

          {/* SMALL INFORMATION STRIP */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#EDE4D8] bg-white px-5 py-4 shadow-sm">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF2E1] text-[#E66A16]">
              <Check size={17} strokeWidth={2.5} />
            </span>

            <p className="text-[12px] leading-[1.8] text-[#65717D]">
              <strong className="text-[#202A38]">
                Requirement-Focused Approach.
              </strong>{" "}
              Every product discussion begins with understanding
              its intended commercial or industrial application.
            </p>
          </div>

          {/* CTA */}
          <motion.a
            href="/contact"
            whileHover={
              reduceMotion ? undefined : { y: -3 }
            }
            className="group mt-7 inline-flex items-center gap-3 rounded-lg bg-[#202A38] px-6 py-3.5 text-[12px] font-extrabold text-white transition-colors duration-300 hover:bg-[#E66A16]"
          >
            Discuss Product Requirements

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>
        </div>

        {/* RIGHT QUALITY PARAMETERS */}
        <div className="relative">
          {/* TOP LABEL */}
          <div
            data-aos="fade-up"
            className="mb-5 flex items-center justify-between gap-3"
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-[#8B96A1]">
              Key Product Considerations
            </span>

            <span className="rounded-full border border-[#E8DFD2] bg-white px-3 py-1 text-[10px] font-bold text-[#C68A31]">
              05 Parameters
            </span>
          </div>

          {/* PARAMETER CARDS */}
          <div className="space-y-3.5">
            {qualityFactors.map((factor, index) => {
              const Icon = factor.icon;

              return (
                <motion.div
                  key={factor.number}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 80}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { x: 5, y: -2 }
                  }
                  transition={{ duration: 0.3, ease }}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-[15px] border border-[#E7E9EC] bg-white px-5 py-5 shadow-[0_6px_25px_rgba(32,42,56,0.035)] transition-colors duration-300 hover:border-[#F0D4AE] sm:gap-5 sm:px-6"
                >
                  {/* HOVER ACCENT */}
                  <div className="absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-[#E66A16] transition-transform duration-300 group-hover:scale-y-100" />

                  {/* ICON */}
                  <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl bg-[#FFF3E6] text-[#E66A16] transition-colors duration-300 group-hover:bg-[#E66A16] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[16px] font-extrabold text-[#202A38] sm:text-[17px]">
                        {factor.title}
                      </h3>

                      <span className="text-[11px] font-black text-[#D2B18B]">
                        {factor.number}
                      </span>
                    </div>

                    <p className="mt-2 text-[12px] leading-[1.8] text-[#7A8692] sm:text-[13px]">
                      {factor.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* BOTTOM NOTE */}
          <div
            data-aos="fade-up"
            className="mt-5 rounded-xl bg-[#202A38] px-5 py-4 text-[12px] leading-[1.8] text-[#DCE3EA] sm:px-6"
          >
            Product requirements may vary depending on the
            industry, application and quantity involved.
          </div>
        </div>
      </div>
    </section>
  );
}
