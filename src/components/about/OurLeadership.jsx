
import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";

const leaders = [
  {
    number: "01",
    name: "Mrs. Sushama Vishwas Shinde",
    role: "Chief Executive Officer (CEO)",
    phone: "+91 9172088244",
    phoneLink: "+919172088244",
    image: "/leadership/sushama.jpg",
    initials: "SS",
  },
  {
    number: "02",
    name: "Mrs. Mayuri Prashant Shevate",
    role: "Chief Executive Officer (CEO)",
    phone: "+91 9527020687",
    phoneLink: "+919527020687",
    image: "/leadership/mayuri.jpg",
    initials: "MS",
  },
  {
    number: "03",
    name: "Mr. Shekhar Shinde",
    role: "Marketing Chief",
    phone: "+91 8983973799",
    phoneLink: "+918983973799",
    image: "/leadership/shekhar.jpg",
    initials: "SS",
  },
];

const ease = [0.22, 1, 0.36, 1];

function LeaderCard({ leader, index, inView, reduceMotion }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 70,
      }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: reduceMotion ? 0 : 70 }
      }
      transition={{
        duration: 0.9,
        delay: 0.2 + index * 0.18,
        ease,
      }}
      className="group relative"
    >
      {/* PHOTO AREA */}
      <div className="relative overflow-hidden rounded-t-[190px] rounded-b-[18px] bg-[#F5EBDD] pt-5">

        {/* ARCH SHAPE */}
        <div className="pointer-events-none absolute inset-x-5 top-5 bottom-0 rounded-t-[180px] border border-[#E9AC12]/30" />

        {/* INNER GLOW */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[270px] w-[270px] -translate-x-1/2 rounded-full bg-[#F6C86D]/20 blur-[65px]" />

        {/* PHOTO */}
        <div className="relative h-[330px] overflow-hidden rounded-t-[180px] sm:h-[380px] lg:h-[390px] xl:h-[430px]">
          {!imageError ? (
            <img
              src={leader.image}
              alt={leader.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="select-none text-[95px] font-extrabold tracking-[-6px] text-[#D8B983]/60 sm:text-[120px]">
                {leader.initials}
              </span>
            </div>
          )}
        </div>

        {/* NUMBER */}
        <div className="absolute bottom-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[12px] font-extrabold text-[#E66A16] backdrop-blur-md">
          {leader.number}
        </div>

        {/* HOVER BORDER */}
        <div className="pointer-events-none absolute inset-0 rounded-t-[190px] rounded-b-[18px] border-2 border-transparent transition-colors duration-500 group-hover:border-[#E9AC12]/60" />
      </div>

      {/* DETAILS */}
      <div className="px-2 pb-4 pt-7">
        <div className="mb-4 h-[3px] w-10 rounded-full bg-gradient-to-r from-[#E66A16] to-[#E9AC12] transition-all duration-500 group-hover:w-20" />

        <h3 className="text-[21px] font-extrabold leading-[1.35] tracking-[-0.5px] text-[#202A38] sm:text-[23px]">
          {leader.name}
        </h3>

        <p className="mt-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#D47A22] sm:text-[12px]">
          {leader.role}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[#ECE8E1] pt-5">
          <a
            href={`tel:${leader.phoneLink}`}
            className="inline-flex items-center gap-3 text-[14px] font-semibold text-[#566270] transition-colors hover:text-[#E66A16]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3E4] text-[#E66A16]">
              <Phone size={17} />
            </span>

            {leader.phone}
          </a>

          <a
            href={`tel:${leader.phoneLink}`}
            aria-label={`Call ${leader.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F0E5D7] text-[#E66A16] transition-all duration-300 hover:border-[#E66A16] hover:bg-[#E66A16] hover:text-white"
          >
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function OurLeadership() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="relative isolate overflow-hidden bg-[#FFFEFB] py-16 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#F8E5C8]/35 blur-[110px]" />

      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 35,
          }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: reduceMotion ? 0 : 35 }
          }
          transition={{
            duration: 0.8,
            ease,
          }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#E66A16]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#E66A16]">
              OUR LEADERSHIP
            </span>

            <span className="h-[2px] w-8 bg-[#E66A16]" />
          </div>

          <h2 className="text-[clamp(31px,3.8vw,50px)] font-extrabold leading-[1.15] tracking-[-1.4px] text-[#202A38]">
            The People Behind{" "}
            <span className="text-[#E66A16]">
              Crunch & Crisp.
            </span>
          </h2>
        </motion.div>

        {/* LEADERS */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-9 xl:gap-12">
          {leaders.map((leader, index) => (
            <LeaderCard
              key={leader.number}
              leader={leader}
              index={index}
              inView={inView}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
