"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";

interface TestimonialItem {
  id: string;
  number: string;
  category: string;
  author: string;
  location: string;
  portrait: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "chronicle-01",
    number: "01",
    category: "Sunset Rest",
    author: "Sophia & Daniel",
    location: "Singapore",
    portrait: "/images/avatar-sophia.webp",
    quote: "“AUREVA delivered one of the most memorable travel experiences we've ever had. Every detail, from the invisible butler service to the panoramic twilight sunsets, felt like a beautifully scripted dream.”"
  },
  {
    id: "chronicle-02",
    number: "02",
    category: "Sacred Stillness",
    author: "Charlotte & Marcus",
    location: "London, UK",
    portrait: "/images/avatar-charlotte.webp",
    quote: "“A sanctuary in the truest sense. Sitting on the natural volcanic stone terrace at dawn, listening only to the waves and the jungle wind, we rediscovered a sense of stillness we thought we’d lost forever.”"
  },
  {
    id: "chronicle-03",
    number: "03",
    category: "Cosmic Reflection",
    author: "Kenji & Yuki",
    location: "Tokyo, Japan",
    portrait: "/images/avatar-kenji.webp",
    quote: "“The structural timber architecture doesn't fight nature; it integrates with it. Swimming in our private overwater infinity pool under a brilliant vault of tropical stars is a memory permanently etched into our souls.”"
  }
];

// Magnetic spring avatar wrapper
function MagneticAvatar({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 70, damping: 25 });
  const springY = useSpring(y, { stiffness: 70, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const magneticDistance = 85; // Attraction radius
      const attractionStrength = 0.45; // Elastic pull ratio

      if (distance < magneticDistance) {
        const strength = 1 - distance / magneticDistance;
        x.set(deltaX * strength * attractionStrength);
        y.set(deltaY * strength * attractionStrength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentRef) {
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="relative z-20 flex-shrink-0"
    >
      {children}
    </motion.div>
  );
}

export default function GuestChronicles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  // Mouse coordinate values relative to the section container for ambient flare follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(mouseX, { stiffness: 60, damping: 35 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 35 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Staggered list animations
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => {
        setIsSectionHovered(false);
        setHoveredIndex(null);
      }}
      className="relative w-full bg-[#080706] border-t border-stone-900/40 py-24 md:py-32 lg:py-44 overflow-hidden"
    >
      {/* 1. Luxury Texture Backplane: 12-Column Blueprint Guidelines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full border-r border-white/[0.012] last:border-r-0" />
          ))}
        </div>
      </div>

      {/* 2. Ambient Gold & Amber Twilight Spotlight (Liquid Spring Physics) */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            opacity: isSectionHovered ? 1 : 0,
            scale: isSectionHovered ? 1 : 0.85,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute pointer-events-none rounded-full w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(56,43,18,0.22)_0%,rgba(32,23,14,0.28)_55%,transparent_100%)] blur-[130px] mix-blend-screen z-0"
        />
      )}

      {/* 3. Core Symmetrical 12-Column Grid Wrapper */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -15% 0px" }}
        className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-12 gap-y-16 lg:gap-y-0"
      >
        
        {/* Left Column (Columns 1 to 4): Sticky Left-Aligned Section Header */}
        <motion.div 
          variants={itemVariants}
          className="col-span-12 lg:col-span-4 flex flex-col items-start justify-start lg:sticky lg:top-24 h-fit"
        >
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 block">
            Guest Chronicles
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[2.75rem] font-serif font-light text-stone-100 tracking-wide mb-6 leading-[1.25]">
            Loved By Travelers <br />
            Worldwide.
          </h2>
          <p className="text-stone-400 text-sm md:text-base font-sans font-light leading-relaxed max-w-sm">
            The true measure of luxury is not what we build, but the emotional memories our guests take home.
          </p>
        </motion.div>

        {/* Right Column (Columns 6 to 12): Vertical Chronicles Stacking */}
        <div className="col-span-12 lg:col-start-6 lg:col-span-7 flex flex-col justify-start relative">
          {TESTIMONIALS.map((item, index) => {
            const isItemHovered = hoveredIndex === index;
            const isMuted = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.article
                key={item.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                tabIndex={0}
                className="relative w-full py-16 md:py-20 border-t border-white/[0.04] first:border-t flex flex-col gap-6 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-8 focus-visible:ring-offset-[#080706] rounded-sm group transition-all duration-500"
              >
                {/* Symmetrical Active Line Expansion */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isItemHovered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent origin-center z-20"
                />

                {/* Testimonial Header Info */}
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Magnetic Avatar Frame */}
                    <MagneticAvatar>
                      <motion.div
                        animate={{
                          scale: isItemHovered ? 1.05 : 1,
                          filter: isItemHovered ? "grayscale(0%) contrast(100%)" : "grayscale(100%) contrast(125%)"
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-stone-900 flex-shrink-0"
                      >
                        <Image
                          src={item.portrait}
                          alt={item.author}
                          fill
                          sizes="40px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    </MagneticAvatar>
                    
                    <div className="flex flex-col items-start">
                      <motion.span
                        animate={{ color: isItemHovered ? "#f5f5f4" : "#a8a29e" }}
                        transition={{ duration: 0.3 }}
                        className="font-sans text-xs md:text-sm font-medium tracking-wide"
                      >
                        {item.author}
                      </motion.span>
                      <span className="font-sans text-[10px] tracking-wider text-stone-500 uppercase">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <motion.span
                    animate={{
                      x: isItemHovered ? 6 : 0,
                      color: isItemHovered ? "#f5f5f4" : "#78716c"
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    className="font-sans text-[11px] tracking-[0.25em] uppercase font-medium text-stone-500 hidden sm:inline"
                  >
                    {item.number} / {item.category}
                  </motion.span>
                </div>

                {/* Testimonial Quote */}
                <div className="w-full">
                  <motion.p
                    animate={{
                      color: isItemHovered ? "#f5f5f4" : isMuted ? "#57534e" : "#a8a29e"
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="font-serif text-lg md:text-xl lg:text-[1.65rem] font-light italic leading-relaxed tracking-wide text-stone-400"
                  >
                    {item.quote}
                  </motion.p>
                </div>

              </motion.article>
            );
          })}
          {/* Bottom border closing divider */}
          <div className="w-full border-b border-white/[0.04]" />
        </div>

      </motion.div>
    </section>
  );
}
