'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const PromotionalBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Move content vertically for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat mt-20"
      style={{
        backgroundImage: "url('https://images.ctfassets.net/zoq5l15g49wj/66lP4jC7HheXyqj7QftNGd/a1af333272ffa967396de5eddd7ad24b/Collab-Modal-Cavalli-2_1.webp')",
      }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-6"
      >
        {/* Video Play Button */}
        <a
          href="https://www.youtube.com/watch?v=7yoncwdMbyg"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-red-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition duration-300 z-10"
          aria-label="Play video"
        >
          <FaPlay className="text-xl" />
        </a>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl z-10">
          Ray White Begins Bangladesh’s First Smart City: Jolshiri Abashon
        </h2>
      </motion.div>

      {/* Optional overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />
    </section>
  );
};

export default PromotionalBanner;
