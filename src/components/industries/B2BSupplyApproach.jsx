
import React, { useEffect } from "react";
import {
  ClipboardList,
  Boxes,
  Factory,
  PackageCheck,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Product Specifications",
    description:
      "We begin by understanding the type of product your business requires, including relevant specifications, quality expectations and intended usage.",
  },
  {
    number: "02",
    icon: Boxes,
    title: "Required Quantities",
    description:
      "Every business has different procurement requirements. We discuss your expected order quantity and bulk purchasing needs to understand the scale of supply.",
  },
  {
    number: "03",
    icon: Factory,
    title: "Industry Applications",
    description:
      "We consider how the product will be used within your business, whether for food processing, feed manufacturing, agricultural operations or industrial applications.",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Packaging & Supply Needs",
    description:
      "We discuss packaging preferences and other supply-related requirements before exploring a suitable product and supply solution for your business.",
  },
];

export default function B2BSupplyApproach() {
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
      id="b2b-supply-approach"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND DETAILS */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-[#FFF4E4]/60 blur-[100px]" />

      <div className="relative mx-auto max-w-[1350px] px-5 sm:px-8 lg:px-12">
        {/* SECTION HEADING */}
        <div
          data-aos="fade-up"
          className="mx-auto mb-12 max-w-[780px] text-center lg:mb-16"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-[2.8px] text-[#C98A31]">
            OUR B2B SUPPLY APPROACH
          </span>

          <h2 className="mt-4 text-[clamp(29px,3.2vw,43px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Understanding Every{" "}
            <span className="text-[#E66A16]">
              Business Requirement.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[750px] text-[14px] leading-[1.9] text-[#72808D] sm:text-[15px]">
            Our approach focuses on understanding product
            specifications, required quantities, intended
            applications and packaging needs before discussing
            a suitable supply solution.
          </p>
        </div>

        {/* PROCESS STEPS */}
        <div className="relative">
          {/* CONNECTING LINE - DESKTOP */}
          <div className="absolute left-[12%] right-[12%] top-[37px] hidden h-[2px] bg-gradient-to-r from-[#F1D9B7] via-[#E9AC12] to-[#F1D9B7] lg:block" />

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group relative"
                >
                  {/* NUMBER CIRCLE */}
                  <div className="relative z-10 mb-7 flex items-center justify-between lg:justify-center">
                    <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border-[5px] border-white bg-[#202A38] text-[21px] font-black text-[#E9AC12] shadow-[0_8px_25px_rgba(32,42,56,0.14)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E66A16] group-hover:text-white">
                      {step.number}
                    </div>

                    {index !== steps.length - 1 && (
                      <ArrowRight
                        size={19}
                        className="text-[#D8A45A] lg:hidden"
                      />
                    )}
                  </div>

                  {/* STEP CONTENT */}
                  <div className="h-full rounded-[16px] border border-[#EAECEB] bg-[#FAFAF8] px-6 pb-8 pt-7 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-[#F1D5AE] group-hover:bg-white group-hover:shadow-[0_18px_45px_rgba(32,42,56,0.09)]">
                    {/* ICON */}
                    <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#FFF0DD] text-[#E66A16] transition-colors duration-300 group-hover:bg-[#E66A16] group-hover:text-white">
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-[17px] font-extrabold leading-[1.35] text-[#202A38]">
                      {step.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-3 text-[12px] leading-[1.9] text-[#75818D] sm:text-[13px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div
          data-aos="fade-up"
          className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[16px] border border-[#F0E4D3] bg-[#FFF9F0] px-6 py-7 sm:px-8 lg:flex-row lg:items-center"
        >
          <div>
            <h3 className="text-[19px] font-extrabold text-[#202A38] sm:text-[21px]">
              Have a Specific Supply Requirement?
            </h3>

            <p className="mt-2 max-w-[680px] text-[12px] leading-[1.8] text-[#75818D] sm:text-[13px]">
              Share your product details, required quantity and
              business needs. Our team will connect with you
              to discuss suitable supply options.
            </p>
          </div>

          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#E66A16] px-6 py-3.5 text-[12px] font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#202A38]"
          >
            Discuss Your Requirements

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
