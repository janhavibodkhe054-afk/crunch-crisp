
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  ArrowUpRight,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Building2,
  Package,
  Send,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Headphones,
  MoveUpRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "918983973799";

// Replace these with verified company details.
const COMPANY_ADDRESS = "";
const COMPANY_EMAIL = "";

const EASE = [0.22, 1, 0.36, 1];

const phoneNumbers = [
  {
    number: "+91 9172088244",
    href: "tel:+919172088244",
  },
  {
    number: "+91 9527020687",
    href: "tel:+919527020687",
  },
  {
    number: "+91 8983973799",
    href: "tel:+918983973799",
  },
];

const products = [
  "Premium Corn Grits",
  "Yellow Crushed Maize",
  "Fine Corn Powder",
  "Yellow Maize Seeds",
  "Whole Yellow Corn Germ",
  "Corn Cob",
  "Agricultural Commodities",
  "Frozen Food Products",
  "Other",
];

const initialForm = {
  name: "",
  mobile: "",
  company: "",
  email: "",
  product: "",
  quantity: "",
  location: "",
  message: "",
};

const inputClass =
  "h-[48px] w-full rounded-xl border border-[#E3E8ED] bg-[#F8FAFC] px-4 text-[13px] font-medium text-[#202A38] outline-none transition-all duration-300 placeholder:text-[#9DA8B5] focus:border-[#E9AC12] focus:bg-white focus:ring-[3px] focus:ring-[#E9AC12]/15";

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  ...rest
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={`enquiry-${name}`}
        className="mb-2 block text-[12px] font-bold text-[#344253]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#E66A16]">*</span>
        )}
      </label>

      <input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
        {...rest}
      />
    </div>
  );
}

export default function ContactInformation() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    });

    AOS.refresh();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "mobile"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.product) return;

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    const message = [
      "*NEW BUSINESS ENQUIRY*",
      "*Crunch & Crisp India LLP*",
      "",
      `*Name:* ${form.name.trim()}`,
      `*Mobile Number:* +91 ${form.mobile}`,
      `*Company Name:* ${form.company.trim() || "Not provided"}`,
      `*Email:* ${form.email.trim() || "Not provided"}`,
      `*Product Required:* ${form.product}`,
      `*Required Quantity:* ${form.quantity.trim() || "Not specified"}`,
      `*Location:* ${form.location.trim() || "Not provided"}`,
      `*Message:* ${form.message.trim() || "Not provided"}`,
      "",
      "Please share the product information and quotation.",
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(
      "Hello Crunch & Crisp India LLP, I would like to enquire about your products."
    );

  return (
    <section
      id="contact-information"
      className="relative isolate overflow-hidden bg-[#202A38] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_20%,rgba(233,172,18,0.09),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_80%,rgba(230,106,22,0.07),transparent_42%)]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",
            backgroundSize: "65px 65px",
          }}
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, 35, 0], y: [0, -25, 0] }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#E9AC12]/5 blur-[110px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div
          data-aos="fade-up"
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#E9AC12]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[2.8px] text-[#F0BE70]">
              GET IN TOUCH
            </span>

            <span className="h-px w-9 bg-[#E9AC12]" />
          </div>

          <h2 className="text-[clamp(29px,3.2vw,44px)] font-extrabold leading-[1.2] tracking-[-1px]">
            Let's Start a{" "}
            <span className="text-[#E9AC12]">
              Conversation.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[600px] text-[14px] leading-[1.9] text-[#B9C5D1]">
            Connect with Crunch & Crisp India LLP for corn
            products, agricultural commodities, frozen foods
            and bulk business requirements.
          </p>
        </div>

        {/* CONTACT DETAILS + FORM */}
        <div className="grid items-start gap-9 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12">

          {/* LEFT CONTACT INFORMATION */}
          <div data-aos="fade-right" className="lg:pt-5">
            <div className="mb-7">
              <span className="text-[10px] font-extrabold uppercase tracking-[2.3px] text-[#E9AC12]">
                CONTACT DETAILS
              </span>

              <h3 className="mt-3 text-[clamp(24px,2.5vw,34px)] font-extrabold leading-[1.25] tracking-[-0.7px]">
                We're Here for
                <span className="block text-[#F0BF73]">
                  Your Business.
                </span>
              </h3>

              <p className="mt-4 max-w-[400px] text-[13px] leading-[1.9] text-[#B6C3D0]">
                Have a product requirement or bulk supply
                enquiry? Reach out through phone, email or
                WhatsApp.
              </p>
            </div>

            {/* PHONE NUMBERS */}
            <div className="group overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.055] transition-all duration-300 hover:border-[#E9AC12]/40 hover:bg-white/[0.075]">
              <div className="flex items-center gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E9AC12]/25 bg-[#E9AC12]/10 text-[#E9AC12]">
                  <PhoneCall size={22} />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#E9AC12]">
                    CALL US
                  </span>

                  <h4 className="mt-1 text-[15px] font-extrabold text-white">
                    Contact Numbers
                  </h4>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {phoneNumbers.map((item, index) => (
                  <a
                    key={item.number}
                    href={item.href}
                    className="group/phone flex items-center justify-between px-5 py-4 transition-colors duration-300 hover:bg-[#E9AC12]/10 sm:px-6"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-[#E9AC12]/65">
                        0{index + 1}
                      </span>

                      <span className="text-[15px] font-semibold tracking-[0.2px] text-white">
                        {item.number}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-[#E9AC12] transition-transform duration-300 group-hover/phone:translate-x-1 group-hover/phone:-translate-y-1"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* EMAIL */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-4"
            >
              {COMPANY_EMAIL ? (
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="group flex items-center gap-4 rounded-[16px] border border-white/15 bg-white/[0.055] px-5 py-5 transition-all duration-300 hover:border-[#E9AC12]/40 hover:bg-white/[0.075] sm:px-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E9AC12]/25 bg-[#E9AC12]/10 text-[#E9AC12]">
                    <Mail size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#E9AC12]">
                      EMAIL US
                    </span>

                    <p className="mt-1 break-all text-[13px] font-semibold text-white">
                      {COMPANY_EMAIL}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[#E9AC12] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-[16px] border border-white/15 bg-white/[0.055] px-5 py-5 sm:px-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E9AC12]/25 bg-[#E9AC12]/10 text-[#E9AC12]">
                    <Mail size={21} />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#E9AC12]">
                      EMAIL US
                    </span>

                    <p className="mt-1 text-[13px] text-[#C2CDD8]">
                      Add official email address
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ADDRESS */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="mt-4"
            >
              <div className="flex items-start gap-4 rounded-[16px] border border-white/15 bg-white/[0.055] px-5 py-5 transition-all duration-300 hover:border-[#E9AC12]/40 hover:bg-white/[0.075] sm:px-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E9AC12]/25 bg-[#E9AC12]/10 text-[#E9AC12]">
                  <MapPin size={21} />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#E9AC12]">
                    OUR ADDRESS
                  </span>

                  <p className="mt-1 text-[13px] leading-[1.8] text-[#E1E7EE]">
                    {COMPANY_ADDRESS || "Add official company address"}
                  </p>
                </div>
              </div>
            </div>

            {/* WHATSAPP ACTION */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center justify-between rounded-xl border border-[#E9AC12]/35 bg-[#E9AC12]/10 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9AC12]/20"
            >
              <span className="flex items-center gap-3 text-[13px] font-bold text-[#F0BF73]">
                <MessageCircle size={20} />
                Connect on WhatsApp
              </span>

              <ArrowUpRight
                size={18}
                className="text-[#E9AC12] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* RIGHT ENQUIRY FORM */}
          <motion.div
            id="contact-form"
            data-aos="fade-left"
            className="scroll-mt-28 overflow-hidden rounded-[24px] border border-white/20 bg-white text-[#202A38] shadow-[0_30px_90px_rgba(0,0,0,0.22)]"
          >
            {/* GOLD TOP LINE */}
            <div className="h-[4px] w-full bg-gradient-to-r from-[#E66A16] via-[#E9AC12] to-[#F2D28C]" />

            <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-10">
              {/* FORM HEADER */}
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#D28C35]">
                    BUSINESS ENQUIRY
                  </span>

                  <h3 className="mt-2 text-[clamp(23px,2.4vw,31px)] font-extrabold leading-[1.25] tracking-[-0.7px] text-[#202A38]">
                    Request a{" "}
                    <span className="text-[#E66A16]">
                      Bulk Quote.
                    </span>
                  </h3>

                  <p className="mt-2 max-w-[400px] text-[12px] leading-[1.8] text-[#83909D]">
                    Fill in your requirements and connect
                    directly with our team.
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0DE] text-[#E66A16]">
                  <Send size={21} />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                  <InputField
                    label="Name"
                    name="name"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={form.mobile}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    title="Enter a valid 10-digit Indian mobile number"
                  />

                  <InputField
                    label="Company Name"
                    name="company"
                    placeholder="Company / Business name"
                    value={form.company}
                    onChange={handleChange}
                    autoComplete="organization"
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="yourname@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />

                  {/* PRODUCT */}
                  <div>
                    <label
                      htmlFor="enquiry-product"
                      className="mb-2 block text-[12px] font-bold text-[#344253]"
                    >
                      Product Required
                      <span className="ml-1 text-[#E66A16]">*</span>
                    </label>

                    <div className="relative">
                      <select
                        id="enquiry-product"
                        name="product"
                        required
                        value={form.product}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none pr-10 ${
                          form.product ? "" : "text-[#9DA8B5]"
                        }`}
                      >
                        <option value="" disabled>
                          Select product
                        </option>

                        {products.map((product) => (
                          <option
                            key={product}
                            value={product}
                            className="text-[#202A38]"
                          >
                            {product}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9DA8B5]"
                      />
                    </div>
                  </div>

                  <InputField
                    label="Required Quantity"
                    name="quantity"
                    placeholder="e.g. 5 MT / 1000 kg"
                    value={form.quantity}
                    onChange={handleChange}
                  />

                  <div className="sm:col-span-2">
                    <InputField
                      label="Location"
                      name="location"
                      placeholder="City / State / Delivery location"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="enquiry-message"
                      className="mb-2 block text-[12px] font-bold text-[#344253]"
                    >
                      Message
                    </label>

                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us more about your product requirements..."
                      value={form.message}
                      onChange={handleChange}
                      className="min-h-[110px] w-full resize-y rounded-xl border border-[#E3E8ED] bg-[#F8FAFC] px-4 py-3.5 text-[13px] font-medium leading-[1.7] text-[#202A38] outline-none transition-all duration-300 placeholder:text-[#9DA8B5] focus:border-[#E9AC12] focus:bg-white focus:ring-[3px] focus:ring-[#E9AC12]/15"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-6 py-4 text-[13px] font-extrabold text-white shadow-[0_12px_30px_rgba(230,106,22,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(230,106,22,0.3)]"
                >
                  <MessageCircle size={19} />
                  Send Enquiry on WhatsApp

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>

                <div className="mt-4 flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#D99A3B]"
                  />

                  <p className="text-[11px] leading-[1.8] text-[#8B97A3]">
                    Opens WhatsApp with your enquiry details.
                    You can review and send the message there.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BRAND LINE */}
        <div
          data-aos="fade-up"
          className="mt-14 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-7 text-center"
        >
          <Building2 size={17} className="text-[#E9AC12]" />

          <span className="text-[12px] font-semibold text-[#C4CFD9]">
            Crunch & Crisp India LLP
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#E9AC12] sm:block" />

          <span className="text-[11px] text-[#9FAFBE]">
            Corn Processing • Agricultural Commodities • Frozen Foods
          </span>
        </div>
      </div>
    </section>
  );
}
