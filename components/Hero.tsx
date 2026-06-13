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

const AurevaLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    style={props.style}
    {...props}
  >
    {/* Symmetrical curved geometric star emblem (astroid/four-pointed star) */}
    <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
    {/* Small circular cutout in the center for a luxury brand aesthetic */}
    <circle cx="12" cy="12" r="2" className="fill-stone-950 dark:fill-stone-900" />
  </svg>
);

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Navigation links referencing exact built sections
  const menuLinks = [
    { label: "Featured Villas", href: "#featured-villas" },
    { label: "Curated Experiences", href: "#experiences" },
    { label: "Immersive Gallery", href: "#gallery" },
    { label: "Why Aureva", href: "#philosophy" },
    { label: "Guest Chronicles", href: "#testimonials" },
    { label: "Destination Discovery", href: "#destination-discovery" },
    { label: "Reservations", href: "#booking-cta" },
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
      <header className="relative z-20 w-full max-w-[90rem] mx-auto flex justify-between items-center px-6 md:px-12 lg:px-20 py-10 md:py-12 text-white">
        <Link 
          href="/" 
          aria-label="Aureva Home" 
          className="group flex items-center gap-3.5 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm transition-opacity hover:opacity-90"
        >
          <Image
            src="/images/aureva-logo-mark.webp"
            alt="Aureva Logo Mark"
            width={28}
            height={28}
            className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl md:text-2xl font-serif tracking-[0.25em] uppercase leading-none font-light">
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
      <main className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 lg:pb-32 flex-grow">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-serif font-light text-white leading-[1.12] tracking-tight mb-8"
          >
            A Sanctuary <br />
            <span className="italic font-light text-white/95">of the</span> Senses.
          </motion.h1>
          
          {/* Paragraph */}
          <motion.p 
            variants={itemVariants} 
            className="text-stone-300/85 text-sm md:text-base font-sans font-light max-w-xl mb-10 md:mb-12 leading-relaxed tracking-wide"
          >
            Discover your private haven where untouched natural beauty meets unparalleled, mindful luxury. Designed for those who seek the extraordinary.
          </motion.p>
          
          {/* CTA Button Container */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a 
              href="#philosophy" 
              className="group inline-flex items-center justify-center min-h-[48px] px-8 bg-white text-stone-950 font-sans text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-stone-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              <span className="mr-3">Discover Aureva</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a 
              href="#featured-villas" 
              className="group inline-flex items-center justify-center min-h-[48px] px-8 border border-white/20 text-stone-300 font-sans text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              Explore Residences
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer / Scroll Indicator */}
      <footer className="relative z-10 w-full max-w-[90rem] mx-auto flex justify-between items-center px-6 md:px-12 lg:px-20 py-8 text-[10px] md:text-xs tracking-[0.15em] uppercase text-stone-400 font-light border-t border-white/5 bg-stone-950/20 backdrop-blur-sm">
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
              className="relative w-full max-w-lg md:max-w-xl h-full bg-stone-950/95 backdrop-blur-xl border-l border-white/10 px-8 md:px-16 py-12 flex flex-col justify-between overflow-y-auto text-white"
            >
              {/* Ambient twilight copper backdrop spotlight blur inside the panel */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#2d1f14]/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0" />

              {/* Faint vertical gridline overlay inside drawer */}
              <div className="absolute top-0 bottom-0 left-24 border-l border-white/[0.03] pointer-events-none z-0" />

              {/* Drawer Header Brand & Close Button */}
              <div className="relative z-10 flex justify-between items-center mb-10 md:mb-14">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 border border-[#c5a880]/30 rounded-full border-dashed"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    />
                    <Image
                      src="/images/aureva-logo-mark.webp"
                      alt="Aureva Logo"
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-serif text-sm tracking-[0.25em] uppercase font-light text-stone-200">
                    Aureva
                  </span>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="group flex items-center justify-center w-11 h-11 hover:opacity-85 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded"
                >
                  <span className="hidden md:block font-sans text-[10px] tracking-[0.2em] uppercase mr-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    Close
                  </span>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="relative z-10 flex flex-col gap-4 md:gap-5 my-auto pl-4">
                {menuLinks.map((link, idx) => (
                  <motion.div key={idx} variants={menuLinkVariants}>
                    <motion.a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group inline-flex items-center font-serif text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-light tracking-wide text-stone-350 hover:text-white transition-colors duration-500 outline-none focus-visible:text-white"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-stone-600 mr-3 md:mr-4 group-hover:text-[#c5a880] transition-colors duration-500">
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#c5a880]" />
                    </motion.a>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer / Contacts */}
              <div className="relative z-10 mt-12 md:mt-16 border-t border-white/10 pt-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-400 font-sans tracking-wide">
                  <div className="flex flex-col gap-2">
                    <span className="uppercase text-[9px] tracking-[0.2em] text-[#c5a880]/70">Location</span>
                    <a 
                      href="#destination-discovery" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 hover:text-white transition-colors outline-none focus-visible:text-white"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>North Malé Archipelago, Maldives</span>
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="uppercase text-[9px] tracking-[0.2em] text-[#c5a880]/70">Inquiries</span>
                    <a 
                      href="mailto:hello@aureva.com" 
                      className="flex items-center gap-2 hover:text-white transition-colors outline-none focus-visible:text-white"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>hello@aureva.com</span>
                    </a>
                  </div>
                </div>

                {/* Socials & Language */}
                <div className="flex justify-between items-center text-xs text-stone-500 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
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
