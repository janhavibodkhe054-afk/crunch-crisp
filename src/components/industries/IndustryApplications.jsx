
import React, { useEffect } from "react";
import {
  Factory,
  UtensilsCrossed,
  Beef,
  Bird,
  Droplets,
  Sprout,
  Cog,
  Snowflake,
  ArrowUpRight,
  Package,
  CheckCircle2,
  Wheat,
  CookingPot,
  Hotel,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

/* ==========================================
   INDUSTRIES DATA
========================================== */

const industries = [
  {
    no: "01",
    title: "Snack Manufacturing",
    icon: UtensilsCrossed,
    description:
      "Corn-based ingredients play an important role in snack manufacturing. Our Premium Corn Grits support businesses producing corn-based snacks and processed food products.",
    applications: [
      "Corn-based snack production",
      "Extruded snack processing",
      "Commercial food manufacturing",
    ],
    products: ["Premium Corn Grits"],
  },
  {
    no: "02",
    title: "Food Processing",
    icon: Factory,
    description:
      "Food processing businesses require suitable ingredients for different manufacturing applications. Our Corn Grits, Fine Corn Powder and selected agricultural products cater to commercial food processing requirements.",
    applications: [
      "Food ingredient preparation",
      "Corn-based food formulations",
      "Commercial food processing",
    ],
    products: [
      "Premium Corn Grits",
      "Fine Corn Powder",
    ],
  },
  {
    no: "03",
    title: "Cattle Feed",
    icon: Beef,
    description:
      "Corn-based agricultural ingredients are widely used in cattle feed formulations. We cater to feed manufacturers and agricultural businesses seeking Yellow Crushed Maize and Corn Germ for their production requirements.",
    applications: [
      "Cattle feed manufacturing",
      "Feed ingredient sourcing",
      "Livestock feed formulations",
    ],
    products: [
      "Yellow Crushed Maize",
      "Whole Yellow Corn Germ",
    ],
  },
  {
    no: "04",
    title: "Poultry Feed",
    icon: Bird,
    description:
      "Yellow Crushed Maize is an important raw material in many poultry feed formulations. We support poultry feed manufacturers and commercial buyers with corn-based ingredient sourcing requirements.",
    applications: [
      "Poultry feed production",
      "Commercial feed formulations",
      "Bulk maize ingredient sourcing",
    ],
    products: ["Yellow Crushed Maize"],
  },
  {
    no: "05",
    title: "Oil Extraction",
    icon: Droplets,
    description:
      "Whole Yellow Corn Germ is used as a raw material in corn oil extraction processes. Our product offering caters to businesses involved in edible oil processing and related industrial operations.",
    applications: [
      "Corn oil extraction",
      "Oil processing operations",
      "Industrial raw material sourcing",
    ],
    products: ["Whole Yellow Corn Germ"],
  },
  {
    no: "06",
    title: "Agricultural Businesses",
    icon: Sprout,
    description:
      "Agricultural businesses and commodity distributors require access to suitable products for their commercial activities. We cater to requirements involving Yellow Maize Seeds and other corn-related agricultural commodities.",
    applications: [
      "Agricultural commodity sourcing",
      "Commercial distribution",
      "Agricultural business procurement",
    ],
    products: [
      "Yellow Maize Seeds",
      "Agricultural Commodities",
    ],
  },
  {
    no: "07",
    title: "Industrial Processing",
    icon: Cog,
    description:
      "Corn Cob can be utilized in selected industrial and agricultural processing applications. We cater to commercial buyers seeking corn cob material for specific processing and raw material requirements.",
    applications: [
      "Selected industrial applications",
      "Agricultural material processing",
      "Commercial raw material sourcing",
    ],
    products: ["Corn Cob"],
  },
  {
    no: "08",
    title: "Frozen Food Distribution",
    icon: Snowflake,
    description:
      "Frozen food businesses and distributors require product solutions that align with their commercial procurement needs. Our Frozen Food division caters to buyers exploring frozen food sourcing and distribution opportunities.",
    applications: [
      "Frozen food distribution",
      "Commercial food procurement",
      "Food business sourcing",
    ],
    products: ["Frozen Food Range"],
  },

  /* ==========================================
     NEW INDUSTRIES
  ========================================== */

  {
    no: "09",
    title: "Rice & Grain Distribution",
    icon: Wheat,
    description:
      "Rice wholesalers, grain traders and food distributors require suitable products for their commercial supply operations. Our Premium Basmati Rice offering supports bulk sourcing and distribution requirements.",
    applications: [
      "Wholesale rice distribution",
      "Bulk grain procurement",
      "Retail and commercial supply",
    ],
    products: ["Premium Basmati Rice"],
  },
  {
    no: "10",
    title: "Spice Processing & Distribution",
    icon: CookingPot,
    description:
      "Our Indian Spices portfolio focuses especially on Turmeric and Turmeric Powder. We cater to spice traders, food processors and wholesale distributors seeking products for commercial and bulk procurement.",
    applications: [
      "Turmeric sourcing and distribution",
      "Turmeric Powder procurement",
      "Spice trading and food processing",
    ],
    products: [
      "Turmeric",
      "Turmeric Powder",
      "Indian Spices",
    ],
  },
  
];

/* ==========================================
   MAIN COMPONENT
========================================== */

export default function IndustryApplications() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });

    AOS.refresh();
  }, []);

  return (
    <section
      id="industries-list"
      className="relative overflow-hidden bg-[#F8F9F7] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-[#F6EAD5]/40 blur-[100px]" />

      <div className="relative mx-auto max-w-[1350px] px-5 sm:px-8 lg:px-12">

        {/* ======================================
            SECTION HEADING
        ====================================== */}

        <div
          data-aos="fade-up"
          className="mx-auto mb-12 max-w-[780px] text-center lg:mb-14"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-[3px] text-[#D38A24]">
            INDUSTRY APPLICATIONS
          </span>

          <h2 className="mt-4 text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.2] tracking-[-1px] text-[#202A38]">
            Supporting Industries with{" "}
            <span className="text-[#E66A16]">
              the Right Products.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[14px] leading-[1.9] text-[#74808C] sm:text-[15px]">
            From corn processing and agricultural commodities
            to Premium Basmati Rice, Turmeric, Indian Spices
            and Frozen Foods, our product portfolio supports
            the sourcing needs of food manufacturers,
            distributors, agricultural businesses and
            commercial buyers across multiple industries.
          </p>
        </div>

        {/* ======================================
            INDUSTRY CARDS
        ====================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <article
                key={industry.no}
                data-aos="fade-up"
                data-aos-delay={(index % 2) * 100}
                className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E9ECEB] bg-white p-6 shadow-[0_10px_35px_rgba(32,42,56,0.045)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F0D5B5] hover:shadow-[0_20px_50px_rgba(32,42,56,0.10)] sm:p-8"
              >
                {/* TOP ACCENT */}
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#E66A16] to-[#E9AC12] transition-transform duration-500 group-hover:scale-x-100" />

                {/* ======================================
                    CARD HEADER
                ====================================== */}

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[15px] bg-[#FFF3E4] text-[#E66A16] transition-colors duration-300 group-hover:bg-[#E66A16] group-hover:text-white">
                      <Icon size={27} strokeWidth={1.7} />
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#C79A60]">
                        INDUSTRY {industry.no}
                      </span>

                      <h3 className="mt-1 text-[19px] font-extrabold leading-[1.3] text-[#202A38] sm:text-[21px]">
                        {industry.title}
                      </h3>
                    </div>
                  </div>

                  <span className="hidden text-[38px] font-black leading-none text-[#F0F1EF] sm:block">
                    {industry.no}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-[13px] leading-[1.95] text-[#6E7A86] sm:text-[14px]">
                  {industry.description}
                </p>

                {/* ======================================
                    APPLICATIONS
                ====================================== */}

                <div className="mt-7">
                  <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[1.7px] text-[#202A38]">
                    Industry Applications
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {industry.applications.map((application) => (
                      <div
                        key={application}
                        className="flex items-start gap-2.5 text-[12px] leading-[1.6] text-[#73808D]"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-[2px] shrink-0 text-[#E66A16]"
                        />

                        <span>{application}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ======================================
                    RELEVANT PRODUCTS
                ====================================== */}

                <div className="mt-auto pt-7">
                  <div className="border-t border-[#E9ECEF] pt-5">
                    <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[1.7px] text-[#202A38]">
                      Relevant Products
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {industry.products.map((product) => (
                        <span
                          key={product}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#F1E2CE] bg-[#FFF8EF] px-3.5 py-2.5 text-[12px] font-bold text-[#A66522]"
                        >
                          <Package size={14} />
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ======================================
            BOTTOM CTA
        ====================================== */}

        <div
          data-aos="fade-up"
          className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[16px] bg-[#202A38] px-6 py-7 text-white sm:px-9 lg:flex-row lg:items-center"
        >
          <div>
            <h3 className="text-[20px] font-extrabold sm:text-[23px]">
              Have Specific Industry Requirements?
            </h3>

            <p className="mt-2 max-w-[650px] text-[13px] leading-[1.8] text-[#D2D9E0]">
              Connect with our team to discuss corn processing
              products, agricultural commodities, Premium
              Basmati Rice, Turmeric, Indian Spices, Frozen
              Foods and bulk procurement requirements
              for your business.
            </p>
          </div>

          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#E66A16] px-6 py-3.5 text-[12px] font-extrabold transition-all duration-300 hover:bg-[#E9AC12] hover:text-[#202A38]"
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
