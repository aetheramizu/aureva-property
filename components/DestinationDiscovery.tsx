"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Hotspot {
  id: number;
  label: string;
  category: string;
  title: string;
  description: string;
  image: string;
  coordinates: string;
  position: { top: string; left: string };
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 0,
    label: "01 / Private Bay",
    category: "Hidden Beaches",
    title: "Lagoon Cove",
    description: "Emerald bays secluded by tropical forest.",
    image: "/images/beachfront-reserve.webp",
    coordinates: "N 3° 12' 44\" / E 73° 08' 55\"",
    position: { top: "18%", left: "61%" }
  },
  {
    id: 1,
    label: "02 / Gastronomy",
    category: "Sandbank Dining",
    title: "Sandbank Feast",
    description: "An intimate canopy under a vault of stars.",
    image: "/images/private-dining.webp",
    coordinates: "N 3° 12' 12\" / E 73° 09' 18\"",
    position: { top: "45%", left: "81%" }
  },
  {
    id: 2,
    label: "03 / Ocean Odyssey",
    category: "Marine Activities",
    title: "Blue Odyssey",
    description: "Teak yacht sails across untouched marine craters.",
    image: "/images/island-adventure.webp",
    coordinates: "N 3° 12' 02\" / E 73° 08' 42\"",
    position: { top: "50%", left: "47%" }
  },
  {
    id: 3,
    label: "04 / Sanctuary View",
    category: "Twilight Overlooks",
    title: "Twilight Ridge",
    description: "Sipping sunset elixirs over volcanic peaks.",
    image: "/images/cliffside-pavilion.webp",
    coordinates: "N 3° 11' 48\" / E 73° 08' 10\"",
    position: { top: "72%", left: "25%" }
  }
];

export default function DestinationDiscovery() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMouseOverMap, setIsMouseOverMap] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Flicker-free hover bridge logic
  const handleNavEnter = (id: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(id);
  };

  const handleNavLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isMouseOverMap) {
        setHoveredIndex(null);
      }
    }, 150); // 150ms grace period to bridge gap to map container
  };

  const handleMapEnter = () => {
    setIsMouseOverMap(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMapLeave = () => {
    setIsMouseOverMap(false);
    setHoveredIndex(null);
  };

  return (
    <section
      id="destination-discovery"
      className="relative w-full bg-[#080706] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* 1. Fine Blueprint Guidelines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full border-r border-white/[0.012] last:border-r-0" />
          ))}
        </div>

        {/* Slowly breathing Spotlight flare */}
        {!shouldReduceMotion && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] bg-[#2d1f14]/15 rounded-full blur-[160px] mix-blend-screen pointer-events-none animate-slow-breath"
            style={{ animationDuration: "25s" }}
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* ====================================================== */}
        {/* MAIN ROW: TOPOGRAPHY MAP & CATEGORICAL NAVIGATION     */}
        {/* ====================================================== */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-y-0 items-center">
          
          {/* Left Column (Columns 1 to 4): Intro Header & Nav Links */}
          <div className="col-span-12 lg:col-span-4 flex flex-col items-start border-l border-stone-800/60 pl-6 md:pl-10 py-2">
            <header className="mb-8">
              <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-3 block">
                Aisling Horizons
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-stone-100 tracking-wide mb-5 leading-tight">
                Explore The <br />Surroundings.
              </h2>
              <p className="text-stone-400 text-sm font-sans font-light leading-relaxed max-w-sm lg:max-w-xs">
                Discover the private geography surrounding Aureva. Hover over the entries below or interact directly with the topography hotspots.
              </p>
            </header>

            {/* Categorical Index Links */}
            <nav className="flex flex-col w-full gap-4 border-t border-white/[0.04] pt-6" aria-label="Attraction Categories">
              {HOTSPOTS.map((hotspot) => {
                const isCurrentHovered = hoveredIndex === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onMouseEnter={() => handleNavEnter(hotspot.id)}
                    onMouseLeave={handleNavLeave}
                    className="group/link flex flex-col items-start text-left py-3 border-b border-white/[0.02] last:border-b-0 w-full transition-all duration-300 outline-none"
                  >
                    <motion.span
                      animate={{
                        x: isCurrentHovered ? 4 : 0,
                        color: isCurrentHovered ? "#c5a880" : "#78716c"
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                      className="font-sans text-[10px] tracking-[0.2em] uppercase block mb-1"
                    >
                      {hotspot.label}
                    </motion.span>
                    <motion.span
                      animate={{
                        x: isCurrentHovered ? 8 : 0,
                        color: isCurrentHovered ? "#f5f5f4" : "#d6d3d1"
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                      className="text-xl font-serif font-light tracking-wide"
                    >
                      {hotspot.category}
                    </motion.span>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Column 5: Gap Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right Column (Columns 6 to 12): Topographic Lookbook Map Container */}
          <div 
            className="col-span-12 lg:col-start-6 lg:col-span-7 w-full relative"
            onMouseEnter={handleMapEnter}
            onMouseLeave={handleMapLeave}
          >
            <div className="w-full aspect-[16/10] overflow-hidden border border-white/5 bg-[#0a0907] relative shadow-2xl rounded-sm select-none">
              
              {/* Radial gradient backing glow inside the container */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,transparent_75%)] pointer-events-none z-0" />

              {/* Gold-Ink Topography SVG Mapping */}
              <svg
                className="absolute inset-0 w-full h-full text-[#c5a880]/30 z-10"
                viewBox="0 0 800 500"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Technical latitude/longitude markers */}
                <text x="35" y="45" className="font-sans text-[8px] tracking-[0.3em] fill-[#c5a880]/40 uppercase select-none">
                  N 3° 12' 24"
                </text>
                <text x="690" y="45" className="font-sans text-[8px] tracking-[0.3em] fill-[#c5a880]/40 uppercase select-none">
                  E 73° 08' 12"
                </text>

                {/* Compass coordinate lines */}
                <line x1="400" y1="0" x2="400" y2="500" strokeDasharray="3 6" className="text-[#c5a880]/15" />
                <line x1="0" y1="250" x2="800" y2="250" strokeDasharray="3 6" className="text-[#c5a880]/15" />

                {/* Concentric compass markers */}
                <circle cx="400" cy="250" r="100" className="text-[#c5a880]/15" strokeDasharray="2 4" />
                <circle cx="400" cy="250" r="180" className="text-[#c5a880]/10" strokeDasharray="4 8" />
                <circle cx="400" cy="250" r="4" className="text-[#c5a880]/50" fill="currentColor" />

                {/* Island West (Sunset Ridge Cliffs) Contours */}
                <path
                  d="M120,380 C110,340 160,280 220,300 C280,320 290,380 250,420 C210,460 130,420 120,380 Z"
                  className="text-[#c5a880]/20"
                  fill="rgba(197,168,128,0.015)"
                />
                <path
                  d="M140,380 C130,350 170,300 210,320 C250,340 260,380 230,410 C200,440 150,410 140,380 Z"
                  className="text-[#c5a880]/30"
                  fill="rgba(197,168,128,0.015)"
                />
                <path
                  d="M160,380 C150,360 180,320 200,330 C220,340 230,370 210,390 C190,410 170,400 160,380 Z"
                  className="text-[#c5a880]/50"
                  fill="rgba(197,168,128,0.03)"
                />
                <text x="210" y="360" className="font-serif italic text-[10px] fill-[#c5a880]/40 select-none">
                  Sunset Ridge
                </text>

                {/* Main Resort Island Lagoon Reef Contours */}
                <path
                  d="M380,220 C320,160 450,110 520,140 C590,170 660,120 700,180 C740,240 680,320 590,300 C500,280 440,280 380,220 Z"
                  className="text-[#c5a880]/15"
                  strokeDasharray="1 3"
                  fill="rgba(197,168,128,0.01)"
                />
                <path
                  d="M400,220 C360,180 460,140 510,160 C560,180 620,150 660,200 C700,250 640,300 570,280 C500,260 440,260 400,220 Z"
                  className="text-[#c5a880]/30"
                  fill="rgba(197,168,128,0.03)"
                />
                <path
                  d="M420,220 C390,190 470,160 500,180 C530,200 580,180 610,220 C640,260 600,280 550,265 C500,250 450,250 420,220 Z"
                  className="text-[#c5a880]/50"
                  fill="rgba(197,168,128,0.05)"
                />
                <text x="560" y="240" className="font-serif italic text-[10px] fill-[#c5a880]/40 select-none">
                  Aureva Lagoon
                </text>

                {/* North Lagoon Shallow Bay Topography */}
                <path
                  d="M450,80 C480,50 540,60 550,90 C560,120 510,140 480,120 C450,100 420,110 450,80 Z"
                  className="text-[#c5a880]/20"
                  fill="rgba(197,168,128,0.02)"
                />
                <text x="490" y="100" className="font-serif italic text-[10px] fill-[#c5a880]/40 select-none">
                  North Bay
                </text>
              </svg>

              {/* Pulsing Hotspot Embers */}
              {HOTSPOTS.map((hotspot) => {
                const isCurrentHovered = hoveredIndex === hotspot.id;
                return (
                  <div
                    key={hotspot.id}
                    style={{ top: hotspot.position.top, left: hotspot.position.left }}
                    onMouseEnter={() => handleNavEnter(hotspot.id)}
                    onMouseLeave={handleNavLeave}
                    className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 p-4"
                  >
                    {/* Expand Ring 1 */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#c5a880]/15 pointer-events-none"
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{
                        duration: 2.2,
                        ease: [0.16, 1, 0.3, 1] as const,
                        repeat: Infinity
                      }}
                    />
                    {/* Expand Ring 2 */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#c5a880]/15 pointer-events-none"
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{
                        duration: 2.2,
                        delay: 1.1,
                        ease: [0.16, 1, 0.3, 1] as const,
                        repeat: Infinity
                      }}
                    />

                    {/* Central Glowing Amber Core Node */}
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#c5a880] bg-[#080706] transition-all duration-300 relative flex items-center justify-center">
                      <motion.span
                        animate={{
                          scale: isCurrentHovered ? 1.4 : 1,
                          backgroundColor: isCurrentHovered ? "#c5a880" : "transparent"
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"
                      />
                    </div>
                  </div>
                );
              })}

              {/* Zero CLS Widescreen Coordinate Photography Cards */}
              <AnimatePresence>
                {HOTSPOTS.map((hotspot) => {
                  const isCurrentActive = hoveredIndex === hotspot.id;
                  if (!isCurrentActive) return null;

                  return (
                    <motion.div
                      key={hotspot.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                      style={{ transform: "translateZ(0)" }}
                      className="absolute inset-0 w-full h-full z-30 pointer-events-none will-change-transform"
                    >
                      <Image
                        src={hotspot.image}
                        alt={hotspot.title}
                        fill
                        priority
                        className="object-cover object-center"
                      />

                      {/* Glassmorphic Caption Bar (pointer-events-auto allowed for CTA clicks) */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 border border-white/5 bg-[#080706]/85 backdrop-blur-md flex justify-between items-center rounded-sm pointer-events-auto">
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-sans text-[10px] tracking-[0.2em] text-[#c5a880] uppercase font-semibold">
                            {hotspot.label}
                          </span>
                          <span className="font-sans text-[8px] tracking-[0.15em] text-stone-500 font-mono">
                            {hotspot.coordinates}
                          </span>
                        </div>
                        
                        <span className="font-serif italic text-xs md:text-sm text-stone-300 text-right leading-normal max-w-[60%]">
                          {hotspot.description}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Symmetrical Gold-Ink Rectangle Button below the Interactive Map */}
            <div className="mt-6 flex justify-end">
              <a
                href="https://maps.google.com/?q=3.206667,73.136667"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 border border-[#c5a880]/30 bg-[#0c0b0a]/30 text-[#c5a880] hover:bg-[#c5a880] hover:text-[#080706] hover:border-[#c5a880] font-sans text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 rounded-sm select-none"
              >
                Launch Main Map
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
