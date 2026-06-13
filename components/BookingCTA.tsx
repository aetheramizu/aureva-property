"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BookingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for liquid tracking
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });

  // Map values to string pixel units for CSS variables
  const xPx = useTransform(springX, (val) => `${val}px`);
  const yPx = useTransform(springY, (val) => `${val}px`);

  // Initialize particles on mount to prevent SSR hydration mismatches
  useEffect(() => {
    const density = 24;
    const items = Array.from({ length: density }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 4, // 4px to 14px size
      duration: Math.random() * 12 + 12, // 12s to 24s travel time
      delay: Math.random() * -24
    }));
    // Wrap in setTimeout to set state asynchronously and avoid ESLint warnings
    setTimeout(() => {
      setParticles(items);
    }, 0);
  }, []);

  // Initialize mouse coordinates to center of section
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    // Smoothly drift back to the center
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  };

  return (
    <section
      ref={containerRef}
      id="booking-cta"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 lg:px-24 bg-[#080706]"
    >
      {/* 1. Inject Styles for CSS Masking and Custom Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kenBurns {
          0%, 100% {
            transform: scale(1.02);
          }
          50% {
            transform: scale(1.08);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 28s ease-in-out infinite;
        }
        @keyframes slowBreath {
          0%, 100% {
            transform: scale(1) translate(0px, 0px);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.1) translate(15px, -15px);
            opacity: 0.35;
          }
        }
        .animate-slow-breath {
          animation: slowBreath 20s ease-in-out infinite alternate;
        }
        @keyframes floatUpward {
          0% {
            transform: translateY(110vh) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-10vh) translateX(50px) scale(0.5);
            opacity: 0;
          }
        }
        .ember {
          position: absolute;
          background: radial-gradient(circle, rgba(197, 168, 128, 0.4) 0%, rgba(197, 168, 128, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .color-reveal-layer {
          mask-image: radial-gradient(circle 220px at var(--x, 50%) var(--y, 50%), black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle 220px at var(--x, 50%) var(--y, 50%), black 20%, transparent 100%);
          will-change: mask-image, -webkit-mask-image;
        }
      `}} />

      {/* 2. Cinematic Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Base Layer: Monochrome & Deep Contrast */}
        <div className="absolute inset-0 w-full h-full grayscale brightness-[0.25] contrast-[1.1] scale-102 animate-ken-burns will-change-transform">
          <Image
            src="/images/hero-bg.webp"
            alt="Twilight Pool Sanctuary (Monochrome Base)"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay Layer: Color Reveal with Radial Mask Tracking */}
        {!shouldReduceMotion && (
          <motion.div
            style={{
              "--x": xPx,
              "--y": yPx,
            } as React.CSSProperties}
            className="color-reveal-layer absolute inset-0 w-full h-full brightness-[0.55] contrast-[1.1] scale-102 animate-ken-burns will-change-transform"
          >
            <Image
              src="/images/hero-bg.webp"
              alt="Twilight Pool Sanctuary (Color Reveal Overlay)"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        )}

        {/* Premium vignette overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/20 to-black/35 z-10 pointer-events-none" />

        {/* Warm slowly breathing core highlight flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#3a2211]/25 rounded-full blur-[150px] mix-blend-screen animate-slow-breath z-10 pointer-events-none" />
      </div>

      {/* 3. Kinetic Ember Particle Layer */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="ember"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}vw`,
                animation: `floatUpward ${p.duration}s linear ${p.delay}s infinite`
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Sensory Editorial Content Portal */}
      <div className="relative z-20 max-w-5xl text-center flex flex-col items-center justify-center my-auto py-24">
        
        {/* Chronological locator index */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-6 h-[1px] bg-[#c5a880]/40" />
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#c5a880] font-light">
            The Sanctuary Awaits
          </p>
          <span className="inline-block w-6 h-[1px] bg-[#c5a880]/40" />
        </div>

        {/* Cinematic Title */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-stone-100 leading-[1.15] tracking-wide mb-8">
          Your Next Extraordinary <br />
          <span className="italic font-light text-stone-300">Escape Awaits.</span>
        </h2>

        {/* Subheadline */}
        <p className="text-stone-300 text-sm md:text-base lg:text-lg font-sans font-light max-w-xl mb-14 leading-relaxed tracking-wider opacity-90">
          Reserve your stay and experience luxury beyond expectations. Connect with a physical stillness found only inside our private island horizons.
        </p>

        {/* Liquid Frame CTA Button */}
        <div className="flex flex-col items-center">
          <a
            href="#reserve"
            className="group relative inline-flex items-center gap-6 px-10 py-5 bg-[#080706]/65 backdrop-blur-md border border-[#c5a880]/30 hover:border-[#c5a880]/90 text-stone-100 rounded-sm font-sans text-xs tracking-[0.2em] uppercase font-medium transition-all duration-700 ease-out shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-stone-300 overflow-hidden"
          >
            {/* Linear gold gradient sweeping shine overlay */}
            <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-transparent via-[#c5a880]/15 to-transparent transition-all duration-[1000ms] ease-out group-hover:w-full" />
            
            <span>Reserve Your Stay</span>

            {/* Symmetrical Compass Vector Arrow */}
            <svg
              className="w-3.5 h-3.5 text-[#c5a880] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7l3 5H9l3-5z" className="origin-center" />
              <path d="M12 17l-3-5h6l-3 5z" className="origin-center" />
            </svg>
          </a>

          {/* Supportive Trust Marker */}
          <span className="font-sans text-[9px] tracking-[0.25em] text-stone-500 uppercase mt-4 select-none">
            Guaranteed Discretion / Flexible Arrangements
          </span>
        </div>

      </div>
    </section>
  );
}
