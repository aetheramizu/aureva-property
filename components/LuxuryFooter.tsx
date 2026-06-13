"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LuxuryFooter() {
  const quickLinks = [
    { label: "Featured Villas", href: "#featured-villas" },
    { label: "Curated Experiences", href: "#experiences" },
    { label: "Immersive Gallery", href: "#gallery" },
    { label: "Why Aureva", href: "#philosophy" },
    { label: "Guest Chronicles", href: "#testimonials" },
    { label: "Destination Discovery", href: "#destination-discovery" },
    { label: "Reservations", href: "#booking-cta" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "Facebook", href: "https://facebook.com", external: true },
    { label: "Pinterest", href: "https://pinterest.com", external: true },
  ];

  return (
    <footer className="relative bg-[#080706] text-stone-100 overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24 border-t border-white/[0.02]">
      {/* 1. FAINT 12-COLUMN BACKGROUND GUIDE OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-12 h-full w-full border-l border-white/[0.012]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/[0.012] h-full" />
          ))}
        </div>
      </div>

      {/* 2. SLOW BREATHING SPOTLIGHT BLUR GLOW */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#2d1f14] rounded-full blur-[140px] mix-blend-screen pointer-events-none z-0"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.18, 0.28, 0.18],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. MAIN FOOTER CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="grid grid-cols-12 gap-y-16 lg:gap-y-0 items-start">
          
          {/* Left Column (lg:col-span-5): Brand Identity and Editorial Statement side by side */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-start gap-6">
            
            {/* Logo and Editorial Statement aligned horizontally (flex-row on all screens) */}
            <div className="flex flex-row items-center gap-5 sm:gap-6 md:gap-8 w-full">
              {/* Signature Logo & Rotating Coordinate Vector Ring */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center group/logo cursor-pointer">
                {/* Rotating Dashed Coordinate Vector Ring */}
                <motion.div
                  className="absolute inset-0 border border-[#c5a880]/25 rounded-full border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  whileHover={{ rotate: -360, transition: { duration: 12, ease: "linear", repeat: Infinity } }}
                />
                {/* Outer Solid Ring */}
                <motion.div
                  className="absolute -inset-1.5 sm:-inset-2 border border-white/[0.04] rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                  whileHover={{ rotate: 360, transition: { duration: 16, ease: "linear", repeat: Infinity } }}
                />
                {/* Symmetrical tick indicators */}
                <svg className="absolute -inset-3 sm:-inset-4 w-[calc(100%+24px)] sm:w-[calc(100%+32px)] h-[calc(100%+24px)] sm:h-[calc(100%+32px)] text-[#c5a880]/15 animate-[spin_90s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 9" />
                </svg>
                
                <Image
                  src="/images/aureva-logo-mark.webp"
                  alt="AUREVA Logo Mark"
                  width={32}
                  height={32}
                  className="w-7.5 h-7.5 sm:w-9 sm:h-9 object-contain transition-transform duration-700 group-hover/logo:scale-110"
                />
              </div>

              {/* Editorial Brand Statement with constrained width to prevent column crowding */}
              <p className="font-serif text-sm sm:text-base md:text-lg lg:text-xl text-stone-200 font-light leading-relaxed tracking-wide max-w-[240px] sm:max-w-xs md:max-w-[340px] lg:max-w-[360px]">
                Extraordinary escapes crafted through luxury villas, curated experiences, and unforgettable destinations.
              </p>
            </div>

            {/* Resort Geography */}
            <div className="flex items-center gap-2.5 sm:gap-3 mt-1 sm:mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/50 flex-shrink-0" />
              <p className="font-sans text-[10px] sm:text-xs tracking-widest text-[#c5a880]/90 uppercase font-light">
                Private Island Resort, North Malé Archipelago, Maldives
              </p>
            </div>
          </div>

          {/* Symmetrical 1-column spacing gap on large screens to prevent overlap */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right Column (lg:col-span-6): Navigation Columns sub-grid */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-8">
            
            {/* Quick Links */}
            <div className="flex flex-col gap-5">
              <h4 className="font-sans text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
                Resort Portal
              </h4>
              <ul className="flex flex-col gap-3.5 items-start">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="font-sans text-stone-400 hover:text-stone-100 transition-colors duration-300 text-xs tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] py-0.5 inline-block text-left"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 24 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-5">
              <h4 className="font-sans text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
                Enquiries
              </h4>
              <ul className="flex flex-col gap-3.5 items-start">
                <li>
                  <motion.a
                    href="mailto:hello@aureva.com"
                    className="font-sans text-stone-400 hover:text-stone-100 transition-colors duration-300 text-xs tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] py-0.5 inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  >
                    hello@aureva.com
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="tel:+6221000000"
                    className="font-sans text-stone-400 hover:text-stone-100 transition-colors duration-300 text-xs tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] py-0.5 inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  >
                    +62 21 000 000
                  </motion.a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-5">
              <h4 className="font-sans text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
                Social Index
              </h4>
              <ul className="flex flex-col gap-3.5 items-start">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-stone-400 hover:text-stone-100 transition-colors duration-300 text-xs tracking-widest outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880] py-0.5 inline-block"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 24 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 4. BOTTOM SUB-LEDGER */}
        <div className="border-t border-white/[0.04] pt-8 mt-20 md:mt-28 flex flex-col md:flex-row md:justify-between items-center gap-6">
          
          {/* Left alignment: Trademark, Copyright & Legal Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span className="font-sans text-[10px] tracking-wider text-stone-500">
              &copy; 2026 Aureva Resort Group. All rights reserved.
            </span>
            <Link
              href="/privacy"
              className="font-sans text-[10px] tracking-wider text-stone-500 hover:text-stone-300 transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-[#c5a880]"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Right alignment: Live Pulsing Coordinates Node */}
          <div className="flex items-center gap-3 bg-white/[0.015] border border-white/[0.03] px-4 py-2 rounded-full backdrop-blur-sm select-none">
            {/* Soft Glowing Pulsating Golden Ember dot */}
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]"></span>
            </div>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#c5a880] font-light">
              N 3&deg; 12&apos; 24&quot; / E 73&deg; 08&apos; 12&quot;
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
