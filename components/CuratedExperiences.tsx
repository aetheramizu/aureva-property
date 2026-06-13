"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

interface Chapter {
  id: string;
  number: string;
  category: string;
  title: string;
  prose: string;
  cta: string;
  image: string;
  link: string;
}

const CHAPTERS_DATA: Chapter[] = [
  {
    id: "sunrise-yoga",
    number: "Chapter I",
    category: "Wellness Sanctuary",
    title: "Sunrise Yoga",
    prose: "Greet the morning sun on our elevated teak pavilion suspended over the ocean. Feel the restorative energy of ocean tides guided by world-class masters.",
    cta: "Align Your Mind",
    image: "/images/sunrise-yoga.webp",
    link: "#align-mind",
  },
  {
    id: "private-dining",
    number: "Chapter II",
    category: "Bespoke Gastronomy",
    title: "Private Dining",
    prose: "An intimate culinary landscape curated entirely around your personal preferences. Dine directly on a secluded sandbank under an infinite canopy of stars.",
    cta: "Indulge Your Senses",
    image: "/images/private-dining.webp",
    link: "#indulge-senses",
  },
  {
    id: "spa-retreat",
    number: "Chapter III",
    category: "Anointed Renewal",
    title: "Spa Retreat",
    prose: "Surrender to age-old botanical therapies designed to release spiritual tension. Private therapist gardens framed by tropical bird song and natural stone baths.",
    cta: "Begin the Journey",
    image: "/images/spa-retreat.webp",
    link: "#begin-journey",
  },
  {
    id: "island-adventure",
    number: "Chapter IV",
    category: "Ocean Odyssey",
    title: "Island Adventure",
    prose: "Charter a private teak sailing boat to explore raw coral reefs, migrate alongside dolphins, and swim in completely untouched azure saltwater craters.",
    cta: "Embark on Odyssey",
    image: "/images/island-adventure.webp",
    link: "#embark-odyssey",
  },
];

export default function CuratedExperiences() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progression for the timeline spine line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Background glows slow breathing animation
  const glowVariants = {
    animate1: {
      scale: [1, 1.08, 1],
      opacity: [0.15, 0.25, 0.15],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    animate2: {
      scale: [1.08, 1, 1.08],
      opacity: [0.2, 0.3, 0.2],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  // Timeline micro-dots animations
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut" as const,
      },
    },
  };

  // Typography staggered fades
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const textItemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Image curtain reveal
  const curtainVariants = {
    hidden: {
      clipPath: "inset(0% 100% 0% 0%)",
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Image zoom/pan on hover
  const imageVariants = {
    hidden: {
      scale: 1.15,
      filter: "blur(4px)",
    },
    visible: {
      scale: 1.05,
      filter: "blur(0px)",
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    hover: {
      scale: 1.12,
      x: "-2%",
      y: "-1%",
      transition: {
        duration: 6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="experiences"
      className="relative py-24 md:py-32 lg:py-44 bg-[#080706] border-t border-stone-900/50 overflow-hidden"
    >
      {/* Luxury Texture Canvas: Breathing Ambient Lights */}
      <motion.div
        variants={glowVariants}
        animate="animate1"
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#3a2211]/20 rounded-full blur-[150px] pointer-events-none z-0"
      />
      <motion.div
        variants={glowVariants}
        animate="animate2"
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#241a12]/25 rounded-full blur-[130px] pointer-events-none z-0"
      />

      <div className="max-w-[90rem] mx-auto relative px-6 md:px-12 lg:px-20 z-10">
        
        {/* Luxury Texture Canvas: Fine Column Gridlines */}
        <div className="absolute inset-x-6 md:inset-x-12 lg:inset-x-20 top-0 bottom-0 grid grid-cols-12 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full border-r border-white/[0.015] last:border-r-0" />
          ))}
        </div>

        {/* Section Header */}
        <header className="max-w-4xl mb-16 md:mb-24 lg:mb-32 relative z-10">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 md:mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-[1px] bg-stone-500/30" />
            Curated Chapters
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-stone-100 tracking-wide leading-tight">
            Every Stay Tells <br className="hidden md:block" />
            <span className="italic font-light text-stone-300">A Different</span> Story.
          </h2>
        </header>

        {/* Chapters Symmetrical List */}
        <div ref={containerRef} className="relative flex flex-col gap-24 md:gap-36 lg:gap-44 z-10">
          
          {/* Vertical Timeline Spine Line */}
          <div className="absolute left-0 top-6 bottom-6 w-[1px] bg-stone-850/60 pointer-events-none" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 top-6 bottom-6 w-[1px] bg-stone-500/80 pointer-events-none"
          />

          {CHAPTERS_DATA.map((chapter) => (
            <div
              key={chapter.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center relative"
            >
              {/* Text Block - Columns 1 to 4 */}
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-15% 0px" }}
                className="col-span-1 lg:col-span-4 pl-8 md:pl-12 relative flex flex-col items-start"
              >
                {/* Timeline micro-dot */}
                <motion.div
                  variants={dotVariants}
                  className="absolute w-2 h-2 bg-stone-500 rounded-full left-[-4px] top-[14px]"
                />

                {/* Chapter Metadata */}
                <motion.span
                  variants={textItemVariants}
                  className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3 block"
                >
                  {chapter.number} / {chapter.category}
                </motion.span>

                {/* Chapter Title */}
                <motion.h3
                  variants={textItemVariants}
                  className="text-2xl md:text-3xl font-serif font-light tracking-wide text-stone-100 mb-4"
                >
                  {chapter.title}
                </motion.h3>

                {/* Chapter Prose */}
                <motion.p
                  variants={textItemVariants}
                  className="text-stone-300 text-sm md:text-base font-sans font-light leading-relaxed mb-6 max-w-md"
                >
                  {chapter.prose}
                </motion.p>

                {/* Chapter CTA Button */}
                <motion.div variants={textItemVariants}>
                  <a
                    href={chapter.link}
                    className="group inline-flex items-center gap-3 py-3 px-4 min-h-[44px] text-xs font-sans font-medium tracking-[0.2em] uppercase text-stone-100 hover:text-stone-300 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-stone-300 rounded-sm"
                  >
                    <span>{chapter.cta}</span>
                    <span className="inline-block w-8 h-[1px] bg-stone-300 transition-all duration-300 group-hover:w-12" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Image Block - Columns 6 to 12 */}
              <div className="col-span-1 lg:col-span-7 lg:col-start-6">
                <motion.div
                  variants={curtainVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-15% 0px" }}
                  className="relative overflow-hidden aspect-[16/10] border border-white/5 bg-stone-950 rounded-sm group cursor-pointer"
                >
                  <motion.div className="w-full h-full">
                    <motion.div variants={imageVariants} className="w-full h-full relative">
                      <Image
                        src={chapter.image}
                        alt={chapter.title}
                        fill
                        sizes="(max-w-768px) 100vw, 55vw"
                        className="object-cover"
                        priority={chapter.id === "sunrise-yoga"}
                      />
                    </motion.div>
                  </motion.div>
                  {/* Overlay shadow for rich lookbook contrast */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700 pointer-events-none" />
                </motion.div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
