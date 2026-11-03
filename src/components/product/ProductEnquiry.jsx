
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "918983973799";

export default function ProductEnquiry() {
  const reduceMotion = useReducedMotion();

  const handleEnquiry = () => {
    const message =
      "Hello Crunch & Crisp India LLP,\n\n" +
      "I would like to request a product quotation.\n\n" +
      "Product Name: \n" +
      "Required Quantity: \n" +
      "Business / Company Name: \n" +
      "Location: ";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="product-enquiry"
      className="relative overflow-hidden bg-[#202A38] py-10 text-white sm:py-12 lg:py-14"
    >
      {/* SUBTLE BACKGROUND ACCENT */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[250px] w-[250px] -translate-y-1/2 rounded-full bg-[#E9AC12]/10 blur-[80px]" />

      <div className="relative mx-auto flex max-w-[1350px] flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        {/* CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 18,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-[800px]"
        >
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[2.5px] text-[#E9AC12]">
            PRODUCT ENQUIRY
          </span>

          <h2 className="text-[25px] font-extrabold leading-[1.25] tracking-[-0.6px] sm:text-[30px] lg:text-[34px]">
            Need a Specific Product{" "}
            <span className="text-[#E9AC12]">
              or Bulk Quantity?
            </span>
          </h2>

          <p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-[#CBD4DE] sm:text-[14px]">
            Share your product name, required quantity and
            business details. Our team will connect with you
            regarding your requirements.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          type="button"
          onClick={handleEnquiry}
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 20,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          whileHover={
            reduceMotion ? undefined : { y: -3 }
          }
          className="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#E66A16] px-6 py-3.5 text-[12px] font-extrabold text-white transition-all duration-300 hover:bg-[#E9AC12] hover:text-[#202A38] hover:shadow-[0_12px_30px_rgba(230,106,22,0.2)]"
        >
          Request Product Quote

          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.button>
      </div>
    </section>
  );
}
