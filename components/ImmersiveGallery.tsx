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

  // Map vertical scroll progress (0 to 1) to horizontal track translation (0 to -scrollRange)
  const xTranslation = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  
  // Micro-parallax: background ambient glows translate 25% of the speed of cards
  const bgXTranslation = useTransform(smoothProgress, [0, 1], [0, -scrollRange * 0.25]);

  // Micro-parallax: lookbook background numerals shift slightly opposite to scrolling direction
  const numeralTranslation = useTransform(smoothProgress, [0, 1], [60, -60]);

  // Spine timeline vertical progress line height (0% to 100%)
  const spineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative min-h-[300vh] bg-[#080706] border-t border-stone-900/30"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
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
            style={{ x: shouldReduceMotion ? 0 : useTransform(smoothProgress, [0, 1], [0, scrollRange * 0.15]) }}
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

        {/* Core Layout Grid */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0 h-full">
          
          {/* Static Left Spine Typography Column */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-center border-l border-stone-800/60 pl-8 md:pl-12 h-fit relative z-20 py-8 lg:py-16">
            
            {/* Spine Vertical Timeline Progress Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-stone-850/40 pointer-events-none" />
            <motion.div
              style={{ height: shouldReduceMotion ? "100%" : spineHeight }}
              className="absolute left-0 top-0 w-[1px] bg-stone-500/80 pointer-events-none"
            />
            
            {/* Category / Lookbook Header */}
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 block">
              Aisling Lookbook
            </span>
            
            {/* H2 Title */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-stone-100 tracking-wide leading-[1.15] mb-2">
              Moments Worth <br className="hidden lg:block" />
              <span className="italic font-light text-stone-300">Remembering</span>.
            </h2>
          </div>

          {/* Right Side Sliding Lookbook Row */}
          <div 
            ref={viewportRef}
            className="col-span-1 lg:col-span-8 overflow-hidden h-full flex items-center relative py-6 lg:py-0"
          >
            {shouldReduceMotion ? (
              // Reduced Motion Fallback: normal responsive horizontal touch swipe row
              <div className="flex gap-8 overflow-x-auto w-full pb-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
                {PORTFOLIO_ITEMS.map((item) => (
                  <article 
                    key={item.id}
                    className="w-[260px] sm:w-[320px] md:w-[380px] flex-shrink-0 flex flex-col items-start group"
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
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone-400 mb-2">{item.portfolio}</p>
                      <h3 className="text-xl font-serif font-light text-stone-100 tracking-wide mb-2">{item.title}</h3>
                      <p className="text-stone-300 text-xs md:text-sm font-sans font-light leading-relaxed">{item.caption}</p>
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
                className="flex gap-8 md:gap-12 lg:gap-16 pr-[20vw] md:pr-[40vw] select-none"
              >
                {PORTFOLIO_ITEMS.map((item) => (
                  <article
                    key={item.id}
                    className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex-shrink-0 flex flex-col items-start group relative"
                  >
                    
                    {/* Widescreen lookbook background numeral with micro-parallax offset translation */}
                    <div className="absolute -top-16 lg:-top-24 left-[-16px] lg:left-[-32px] overflow-hidden pointer-events-none select-none z-0">
                      <motion.span
                        style={{ 
                          x: numeralTranslation,
                          willChange: "transform"
                        }}
                        className="inline-block font-serif text-[10rem] md:text-[14rem] lg:text-[18rem] font-light text-stone-800/10 leading-none"
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
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-stone-100 tracking-wide mb-3">
                        {item.title}
                      </h3>
                      <p className="text-stone-300 text-xs md:text-sm font-sans font-light leading-relaxed max-w-[90%]">
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
