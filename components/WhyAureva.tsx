"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface ValuePropItem {
  number: string;
  category: string;
  title: string;
  description: string;
}

const VALUE_PROPS: ValuePropItem[] = [
  {
    number: "01",
    category: "Seclusion",
    title: "Private Luxury",
    description: "Enjoy complete privacy and comfort. Designed as standalone architectural estates, our residences are physically isolated from the outside world, creating a silent fortress of pure tranquility."
  },
  {
    number: "02",
    category: "Discretion",
    title: "Exceptional Service",
    description: "Personalized hospitality tailored to every guest. Your dedicated villa butler operates invisibly in the background, predicting and orchestrating your wishes with absolute elegance."
  },
  {
    number: "03",
    category: "Geography",
    title: "Prime Destinations",
    description: "Unrivaled horizons chosen for their untouched natural beauty. From remote volcanic cliffsides to private, pristine turquoise lagoons, we preserve the purity of every landscape."
  },
  {
    number: "04",
    category: "Journey",
    title: "Curated Experiences",
    description: "Every moment is designed as a singular, memorable chapter. We provide no pre-written guides—only highly personalized experiences centered on emotional discovery."
  }
];

export default function WhyAureva() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate values relative to the section container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics configuration for the background glowing flare
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 35 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 35 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      id="philosophy"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
      }}
      className="relative w-full bg-[#080706] border-t border-stone-900/40 py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* 1. Luxury Texture Backplane: 12-Column Blueprint Guidelines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full border-r border-white/[0.012] last:border-r-0" />
          ))}
        </div>
      </div>

      {/* 2. Highly Visible Ambient Twilight Flare (Liquid Spring Cursor-Follower) */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute pointer-events-none rounded-full w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(58,34,17,0.25)_0%,rgba(36,26,18,0.3)_50%,transparent_100%)] blur-[140px] mix-blend-screen z-0"
        />
      )}

      {/* 3. Core Symmetrical 12-Column Editorial Grid */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-12 gap-y-16 lg:gap-y-0">

        {/* Left Column (Columns 1 to 4): Static Intro */}
        <div className="col-span-12 lg:col-span-4 flex flex-col items-start justify-start relative z-10">
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 block">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-stone-100 tracking-wide mb-6 leading-tight">
            Why Aureva.
          </h2>
          <p className="text-stone-400 text-sm md:text-base font-sans font-light leading-relaxed max-w-sm lg:max-w-xs">
            Bespoke sanctuaries engineered for the selective few. We build where nature speaks, and hospitality serves as an invisible art.
          </p>

          {/* Luxury watermark logo mark on the left side */}
          <div className="absolute top-2 lg:top-36 -left-12 lg:-left-88 w-256 h-256 opacity-[0.02] select-none pointer-events-none transition-opacity duration-700 hover:opacity-[0.1] z-0">
            <Image
              src="/images/aureva-logo-mark.webp"
              alt="Aureva Logo Mark"
              fill
              className="object-contain animate-pulse-slow"
              style={{ animationDuration: "12s" }}
            />
          </div>
        </div>

        {/* Column 5: Symmetrical Gap spacer in 12-column grid */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Right Column (Columns 6 to 12): Stacked Brand Statements */}
        <div className="col-span-12 lg:col-start-6 lg:col-span-7 flex flex-col justify-start relative z-10">
          {VALUE_PROPS.map((item, index) => {
            const isItemHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative w-full py-14 md:py-16 border-t border-white/[0.04] first:border-t flex flex-col md:grid md:grid-cols-7 gap-y-4 md:gap-y-0 cursor-pointer select-none group transition-colors duration-500"
                style={{ minHeight: "44px" }}
              >
                {/* Symmetrical Active Line Expansion */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isItemHovered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent origin-center z-20"
                />

                {/* Left side of row: Index & Category Label */}
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <motion.span
                    animate={{
                      x: isItemHovered ? 8 : 0,
                      color: isItemHovered ? "#d6d3d1" : "#78716c" // stone-300 on hover, stone-500 inactive
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sans text-[11px] tracking-[0.25em] uppercase text-stone-500 font-medium whitespace-nowrap"
                  >
                    {item.number} / {item.category}
                  </motion.span>
                </div>

                {/* Right side of row: Title & Text Block */}
                <div className="md:col-span-4 flex flex-col items-start">
                  <motion.h3
                    animate={{
                      color: isItemHovered ? "#f5f5f4" : "#a8a29e" // stone-100 on hover, stone-400 inactive
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-serif font-light tracking-wide mb-4"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    animate={{
                      color: isItemHovered ? "#d6d3d1" : "#78716c" // stone-300 on hover, stone-500 inactive
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-sm font-sans font-light leading-relaxed max-w-md"
                  >
                    {item.description}
                  </motion.p>
                </div>
              </div>
            );
          })}
          {/* Bottom border line for the stack to close the list */}
          <div className="w-full border-b border-white/[0.04]" />
        </div>

      </div>
    </section>
  );
}
