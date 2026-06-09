"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface AmenityItem {
  label: string;
  value: string;
}

interface Villa {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  amenities: AmenityItem[];
  link: string;
}

const VILLAS_DATA: Villa[] = [
  {
    id: "ocean-sanctuary",
    number: "01",
    category: "Overwater Villa",
    title: "The Ocean Sanctuary",
    description: "Poised elegantly above the crystal lagoon, this retreat offers boundless panoramic sunsets, a 15-meter private heated infinity pool, and private lagoon access directly from your volcanic-stone sun deck.",
    image: "/images/ocean-sanctuary.webp",
    amenities: [
      { label: "Space", value: "320 m² / 3,440 ft²" },
      { label: "Private Pools", value: "Infinity Lap Pool" },
      { label: "Services", value: "Personal Butler" },
      { label: "Unique Feature", value: "Sunset Observatory" },
    ],
    link: "#reserve-ocean",
  },
  {
    id: "cliffside-pavilion",
    number: "02",
    category: "Elevated Haven",
    title: "The Cliffside Pavilion",
    description: "Secluded within the heights of ancient volcanic peaks, this pavilion balances dramatic structural design with pristine nature. Experience ultimate seclusion amidst sweeping jungle and ocean panoramas.",
    image: "/images/cliffside-pavilion.webp",
    amenities: [
      { label: "Space", value: "280 m² / 3,010 ft²" },
      { label: "Plunge Bath", value: "Rockface Plunge Bath" },
      { label: "Wellness", value: "Private Steam Room" },
      { label: "Culinary", value: "Private Sommelier Cellar" },
    ],
    link: "#reserve-cliff",
  },
  {
    id: "beachfront-reserve",
    number: "03",
    category: "Beachfront Reserve",
    title: "The Beachfront Reserve",
    description: "Steps away from pristine, powder-soft white sand beach. Surrounded by tropical palms, this villa is a private beach sanctuary featuring outdoor rain showers, bespoke sunloungers, and your own dedicated beachfront dining canopy.",
    image: "/images/beachfront-reserve.webp",
    amenities: [
      { label: "Space", value: "450 m² / 4,840 ft²" },
      { label: "Gardens", value: "Private Palm Grove" },
      { label: "Bathing", value: "Open-Air Bathing Oasis" },
      { label: "Access", value: "Private Beach Pathway" },
    ],
    link: "#reserve-beach",
  },
];

export default function FeaturedVillas() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="featured-villas"
      className="relative py-24 md:py-32 lg:py-44 px-6 md:px-12 lg:px-20 bg-[#0d0c0a] border-t border-stone-900/50 overflow-hidden"
    >
      {/* Aesthetic faint ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-stone-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Section Header with Editorial Spacing */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={headerVariants}
          className="max-w-4xl mb-16 md:mb-24 lg:mb-32"
        >
          {/* Label */}
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 md:mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-[1px] bg-stone-500/30" />
            Signature Collection
          </p>
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-serif font-light text-stone-100 tracking-wide leading-tight">
            Villas Designed For <br className="hidden md:block" />
            <span className="italic font-light text-stone-300">Unforgettable</span> Escapes.
          </h2>
        </motion.header>

        {/* Asymmetrical Editorial Villa Layout Grid */}
        <div className="flex flex-col gap-24 md:gap-36 lg:gap-48">
          {VILLAS_DATA.map((villa, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <VillaCard
                key={villa.id}
                villa={villa}
                isEven={isEven}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface VillaCardProps {
  villa: Villa;
  isEven: boolean;
  shouldReduceMotion: boolean | null;
}

function VillaCard({ villa, isEven, shouldReduceMotion }: VillaCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25, bounce: 0 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25, bounce: 0 });

  // Subtle 3D rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Slight parallax shift for the inner image
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]);
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Normalize mouse coords to range [-0.5, 0.5]
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Staggered reveal animations for scroll
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.15,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={cardVariants}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
        isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Immersive Photography Container with 3D Parallax Tilt */}
      <div className="w-full lg:w-3/5" style={{ perspective: "1000px" }}>
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full aspect-[4/3] overflow-hidden group relative border border-white/5 bg-stone-950 rounded-sm cursor-pointer shadow-2xl transition-shadow duration-500 hover:shadow-stone-900/40"
        >
          {/* Inner image container that shifts oppositely to the tilt */}
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : 1.06,
              x: shouldReduceMotion ? 0 : imageTranslateX,
              y: shouldReduceMotion ? 0 : imageTranslateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full relative"
          >
            <Image
              src={villa.image}
              alt={villa.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={villa.id === "ocean-sanctuary"}
              className="object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
            />
          </motion.div>
          {/* Ambient card overlay */}
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-all duration-700 pointer-events-none" />
        </motion.div>
      </div>

      {/* Villa Storytelling Description */}
      <div className="w-full lg:w-2/5 flex flex-col items-start">
        {/* Index & Category */}
        <motion.p
          variants={textItemVariants}
          className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3"
        >
          {villa.number} / {villa.category}
        </motion.p>

        {/* Title */}
        <motion.h3
          variants={textItemVariants}
          className="text-3xl md:text-4xl font-serif font-light tracking-wide text-stone-100 mb-6"
        >
          {villa.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          variants={textItemVariants}
          className="text-stone-300/90 text-sm md:text-base font-sans font-light leading-relaxed mb-8"
        >
          {villa.description}
        </motion.p>

        {/* Key Amenities Grid */}
        <motion.div
          variants={textItemVariants}
          className="grid grid-cols-2 gap-y-5 gap-x-8 w-full py-6 border-y border-stone-800/40 mb-8"
        >
          {villa.amenities.map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="block text-[9px] md:text-[10px] tracking-widest uppercase text-stone-400 font-light mb-1.5">
                {item.label}
              </span>
              <span className="text-xs md:text-sm font-sans text-stone-200 font-light">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Call To Action with Kinetic Line Hover Effect */}
        <motion.div variants={textItemVariants}>
          <a
            href={villa.link}
            className="group inline-flex items-center gap-3 py-3 text-xs font-sans font-medium tracking-[0.2em] uppercase text-stone-100 hover:text-stone-300 outline-none focus-visible:ring-2 focus-visible:ring-stone-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0c0a] rounded-sm min-h-[44px]"
          >
            <span>Explore Experience</span>
            <span className="inline-block w-8 h-[1px] bg-stone-300 transition-all duration-300 group-hover:w-12" />
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
