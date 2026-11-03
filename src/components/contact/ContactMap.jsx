
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Pune%2C%20Maharashtra%2C%20India&t=&z=12&ie=UTF8&iwloc=&output=embed";

export default function ContactMap() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact-map"
      aria-label="Pune city map"
      className="relative w-full overflow-hidden bg-white"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 25,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative h-[320px] w-full sm:h-[400px] lg:h-[480px]"
      >
        <iframe
          src={MAP_EMBED_URL}
          title="Pune, Maharashtra - Google Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </motion.div>
    </section>
  );
}
