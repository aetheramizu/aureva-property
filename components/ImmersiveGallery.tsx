"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface PortfolioItem {
  id: string;
  number: string;
  portfolio: string;
  title: string;
  image: string;
  caption: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "liquid-sanctuary",
    number: "01",
    portfolio: "PORTFOLIO I / LIQUID SANCTUARY",
    title: "Lagoon Horizon",
    image: "/images/lookbook/lookbook-sanctuary.webp",
    caption: "A seamless transition where private heated pools touch the boundless Indian Ocean. A space created for complete relaxation."
  },
  {
    id: "architectural-harmony",
    number: "02",
    portfolio: "PORTFOLIO II / ARCHITECTURAL LINES",
    title: "Sustainable Teak",
    image: "/images/lookbook/lookbook-architecture.webp",
    caption: "Where natural teak timber architecture merges with raw volcanic stone features. Defined by structural elegance."
  },
  {
    id: "twilight-serenity",
    number: "03",
    portfolio: "PORTFOLIO III / AMBIENT LUMINESCENCE",
    title: "Twilight Atmosphere",
    image: "/images/lookbook/lookbook-twilight.webp",
    caption: "The visual transition as evening twilight settles over private villas, illuminated by flickering ambient fire torches."
  },
  {
    id: "sacred-canopy",
    number: "04",
    portfolio: "PORTFOLIO IV / SACRED CANOPY",
    title: "Tropical Seclusion",
    image: "/images/lookbook/lookbook-canopy.webp",
    caption: "An elevated view looking out across private palm trees, balancing isolation and serenity."
  },
  {
    id: "marine-odyssey",
    number: "05",
    portfolio: "PORTFOLIO V / MARINE ODYSSEY",
    title: "Coral Horizon",
    image: "/images/lookbook/lookbook-marine.webp",
    caption: "Charter a bespoke teak boat to explore raw coral reefs and navigate pristine sapphire waters."
  }
];

export default function ImmersiveGallery() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [scrollRange, setScrollRange] = useState(0);

  // Dynamically calculate the horizontal track scrollable range
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current && viewportRef.current) {
        // Scroll range is the total scrollable width of the cards minus the visible viewport width
        const range = trackRef.current.scrollWidth - viewportRef.current.clientWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    };

    calculateRange();
    
    // Use ResizeObserver for accurate sizing on window resize or layout reflows
    const observer = new ResizeObserver(() => calculateRange());
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => observer.disconnect();
  }, []);

  // Set up vertical scroll tracking on the parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out scroll progression using useSpring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Map vertical scroll progress (0.22 to 0.88) to horizontal track translation (0 to -scrollRange)
  const xTranslation = useTransform(smoothProgress, [0.22, 0.88], [0, -scrollRange], { clamp: true });
  
  // Micro-parallax: background ambient glows translate 25% of the speed of cards
  const bgXTranslation = useTransform(smoothProgress, [0.22, 0.88], [0, -scrollRange * 0.25], { clamp: true });

  // Micro-parallax: lookbook background numerals shift slightly opposite to scrolling direction
  const numeralTranslation = useTransform(smoothProgress, [0.22, 0.88], [60, -60], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative min-h-[350vh] bg-[#080706] border-t border-stone-900/30"
    >
      {/* Static Header: scrolls out of view before cards pin */}
      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-8 relative z-20">
        <header className="max-w-4xl border-l border-stone-800/60 pl-6 md:pl-10">
          {/* Category / Lookbook Header */}
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone-400 mb-4 block">
            Atmosphere &amp; Lifestyle
          </span>
          
          {/* H2 Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-stone-100 tracking-wide leading-tight">
            Moments Worth <br className="hidden md:block" />
            <span className="italic font-light text-stone-300">Remembering</span>.
          </h2>
        </header>
      </div>

      {/* Sticky Viewport Container: only pins the horizontal lookbook track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-4 md:py-6 lg:py-8 z-10">
        
        {/* Luxury Texture Canvas: 12-Column Blueprint Guidelines */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-12 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 h-full w-full opacity-[0.015]">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-full border-r border-white last:border-r-0" />
            ))}
          </div>

          {/* Deep Breathing Background Twilight Spotlights */}
          {/* Animated via Framer Motion to slide slowly (25% rate) for visual parallax depth */}
          <motion.div
            style={{ x: shouldReduceMotion ? 0 : bgXTranslation }}
            className="absolute top-[20%] left-[-10%] w-[900px] h-[900px] bg-[#2d2116]/20 rounded-full blur-[160px] mix-blend-screen pointer-events-none"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            style={{ x: shouldReduceMotion ? 0 : useTransform(smoothProgress, [0.22, 0.88], [0, scrollRange * 0.15], { clamp: true }) }}
            className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-[#221c14]/25 rounded-full blur-[140px] mix-blend-screen pointer-events-none"
            animate={{
              scale: [1.06, 1, 1.06],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Core Inner Container */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center">

          {/* Sliding Lookbook Row */}
          <div 
            ref={viewportRef}
            className="w-full overflow-hidden relative z-10 py-4"
          >
            {shouldReduceMotion ? (
              // Reduced Motion Fallback: normal responsive horizontal touch swipe row
              <div className="flex gap-6 overflow-x-auto w-full pb-6 pl-6 md:pl-10 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
                {PORTFOLIO_ITEMS.map((item) => (
                  <article 
                    key={item.id}
                    className="w-[210px] sm:w-[240px] md:w-[270px] lg:w-[290px] xl:w-[300px] flex-shrink-0 flex flex-col items-start group"
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden border border-white/5 bg-stone-950 shadow-2xl mb-6 rounded-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-w-[768px]) 100vw, 40vw"
                        className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-103"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="w-full pl-2">
                      <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-2">{item.portfolio}</p>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-light text-stone-100 tracking-wide mb-3">{item.title}</h3>
                      <p className="text-stone-300 text-[11px] md:text-xs font-sans font-light leading-relaxed max-w-[95%]">{item.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              // Production-Grade Framer Motion Horizontal Pinning Track
              <motion.div
                ref={trackRef}
                style={{ 
                  x: xTranslation,
                  willChange: "transform",
                  transformStyle: "preserve-3d"
                }}
                className="flex gap-6 md:gap-10 lg:gap-12 pl-6 md:pl-10 pr-6 md:pr-10 select-none"
              >
                {PORTFOLIO_ITEMS.map((item) => (
                  <article
                    key={item.id}
                    className="w-[210px] sm:w-[240px] md:w-[270px] lg:w-[290px] xl:w-[300px] flex-shrink-0 flex flex-col items-start group relative"
                  >
                    
                    {/* Widescreen lookbook background numeral with micro-parallax offset translation */}
                    <div className="absolute -top-16 lg:-top-24 left-[-16px] lg:left-[-32px] overflow-hidden pointer-events-none select-none z-0">
                      <motion.span
                        style={{ 
                          x: numeralTranslation,
                          willChange: "transform"
                        }}
                        className="inline-block font-serif text-[8rem] md:text-[11rem] lg:text-[14rem] font-light text-stone-800/10 leading-none"
                      >
                        {item.number}
                      </motion.span>
                    </div>

                    {/* Symmetrical Aspect-[3/4] Image Frame Container */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden border border-white/5 bg-stone-950 shadow-2xl mb-6 rounded-sm z-10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-w-[768px]) 100vw, (max-w-[1200px]) 50vw, 35vw"
                        className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
                        priority={item.id === "liquid-sanctuary"}
                        loading={item.id === "liquid-sanctuary" ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/40 via-transparent to-transparent pointer-events-none group-hover:bg-[#080706]/0 transition-all duration-700" />
                    </div>

                    {/* Lifestyle Typography Underneath */}
                    <div className="w-full pl-2 z-10">
                      <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-2">
                        {item.portfolio}
                      </p>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-light text-stone-100 tracking-wide mb-3">
                        {item.title}
                      </h3>
                      <p className="text-stone-300 text-[11px] md:text-xs font-sans font-light leading-relaxed max-w-[95%]">
                        {item.caption}
                      </p>
                    </div>
                  </article>
                ))}
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
