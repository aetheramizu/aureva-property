"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe, Mail, MapPin, X } from "lucide-react";

// Inline SVG components for brand icons to prevent library version conflicts
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Navigation links
  const menuLinks = [
    { label: "The Sanctuary", href: "#sanctuary" },
    { label: "Villas & Residences", href: "#villas" },
    { label: "Bespoke Experiences", href: "#experiences" },
    { label: "Wellness & Spa", href: "#wellness" },
    { label: "Heritage & Location", href: "#heritage" },
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // Custom cubic-bezier for a premium feel
      },
    },
  };

  const menuContainerVariants = {
    hidden: { 
      opacity: 0,
      x: shouldReduceMotion ? 0 : "100%"
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : "100%",
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
      },
    },
  };

  const menuLinkVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative min-h-dvh w-full flex flex-col justify-between overflow-hidden bg-stone-950 font-sans selection:bg-stone-100 selection:text-stone-950">
      
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ scale: 1.05 }}
        animate={shouldReduceMotion ? { scale: 1 } : { scale: [1.02, 1.06, 1.02] }}
        transition={{
          duration: 24,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="/images/hero-bg.webp"
          alt="Aureva luxury overwater villas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered overlay for WCAG AAA text contrast (4.5:1 minimum) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-stone-900/10 to-stone-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent md:from-stone-950/90" />
      </motion.div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center px-6 md:px-12 lg:px-24 py-8 md:py-10 text-white">
        <Link 
          href="/" 
          aria-label="Aureva Home" 
          className="outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm transition-opacity hover:opacity-90"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-serif tracking-[0.25em] uppercase leading-none font-light">
            Aureva
          </span>
        </Link>

        {/* Minimalist Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={isMenuOpen}
          className="group relative flex items-center justify-center w-11 h-11 text-white hover:opacity-85 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 rounded"
        >
          <span className="hidden md:block font-sans text-[10px] tracking-[0.2em] uppercase mr-3 opacity-80 group-hover:opacity-100 transition-opacity">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <div className="flex flex-col gap-1.5 w-6 items-end">
            <span className={`block h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-[7px] rotate-45' : 'w-6 group-hover:translate-x-0.5'}`} />
            <span className={`block h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-6'}`} />
            <span className={`block h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-5 group-hover:translate-x-0.5'}`} />
          </div>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 md:pb-24 lg:pb-28 w-full max-w-5xl flex-grow">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Tagline / Subtitle */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-stone-300/80 font-medium">
              Private Island Sanctuary
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white leading-[1.08] tracking-tight mb-8"
          >
            A Sanctuary <br />
            <span className="italic font-light text-white/95">of the</span> Senses.
          </motion.h1>
          
          {/* Paragraph */}
          <motion.p 
            variants={itemVariants} 
            className="text-stone-300 text-base md:text-lg lg:text-xl font-sans font-light max-w-lg mb-10 md:mb-12 leading-relaxed tracking-wide"
          >
            Discover your private haven where untouched natural beauty meets unparalleled, mindful luxury. Designed for those who seek the extraordinary.
          </motion.p>
          
          {/* CTA Button Container */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a 
              href="#discover" 
              className="group inline-flex items-center justify-center min-h-[48px] px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:bg-white hover:text-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 rounded-sm"
            >
              <span className="mr-3">Discover Aureva</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a 
              href="#residences" 
              className="group inline-flex items-center justify-center min-h-[48px] px-8 border border-white/10 text-stone-300 font-sans text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:border-white hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 rounded-sm"
            >
              Explore Residences
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer / Scroll Indicator */}
      <footer className="relative z-10 px-6 md:px-12 lg:px-24 py-8 flex justify-between items-center text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 font-light border-t border-white/5 bg-stone-950/20 backdrop-blur-sm">
        <div className="hidden sm:block">
          <span>Maldives Archipelago</span>
        </div>
        
        {/* Subtle Scroll Indicator */}
        <div className="flex flex-col items-center mx-auto sm:mx-0">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="mb-2 block text-[9px]">Scroll to explore</span>
            <div className="w-[1px] h-6 bg-white/30 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
                animate={shouldReduceMotion ? {} : { top: ["0%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-colors">
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-colors">
            <FacebookIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>

      {/* Full-Screen Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            />

            {/* Menu Side Panel */}
            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg md:max-w-xl h-full bg-stone-900/95 backdrop-blur-xl border-l border-white/10 px-8 md:px-16 py-12 flex flex-col justify-between overflow-y-auto text-white"
            >
              {/* Close Button Header */}
              <div className="flex justify-end items-center mb-12">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="group flex items-center justify-center w-11 h-11 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded"
                >
                  <span className="hidden md:block font-sans text-[10px] tracking-[0.2em] uppercase mr-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    Close
                  </span>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6 md:gap-8 my-auto">
                {menuLinks.map((link, idx) => (
                  <motion.div key={idx} variants={menuLinkVariants}>
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group inline-flex items-baseline font-serif text-3xl md:text-5xl font-light tracking-wide text-stone-300 hover:text-white transition-colors duration-300"
                    >
                      <span className="font-sans text-xs tracking-widest text-stone-500 mr-4 md:mr-6 group-hover:text-white transition-colors duration-300">
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer / Contacts */}
              <div className="mt-16 border-t border-white/10 pt-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-400 font-sans tracking-wide">
                  <div className="flex flex-col gap-2">
                    <span className="uppercase text-[9px] tracking-[0.2em] text-white/50">Location</span>
                    <a 
                      href="#location" 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Fari Islands, North Malé Atoll</span>
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="uppercase text-[9px] tracking-[0.2em] text-white/50">Inquiries</span>
                    <a 
                      href="mailto:reservations@aureva.com" 
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>reservations@aureva.com</span>
                    </a>
                  </div>
                </div>

                {/* Socials & Language */}
                <div className="flex justify-between items-center text-xs text-stone-500 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-4">
                    <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-colors">
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer font-sans tracking-[0.1em] text-[10px] uppercase">
                    <Globe className="w-3.5 h-3.5" />
                    <span>EN</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
