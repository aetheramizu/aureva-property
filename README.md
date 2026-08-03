# Aureva Property Landing Page

A modern, single-page promotional website for **Aureva Property**, built with **Next.js App Router**, **React**, **TypeScript**, and **Tailwind CSS v4**.

This project focuses on delivering a premium first impression through strong visual hierarchy, smooth scroll-based transitions, and interactive UI behaviors while staying performant and responsive across devices.

---

## Project Overview

Aureva Property is designed as a front-end showcase experience with emphasis on:

- Clear property-centric storytelling
- Elegant typography and layout rhythm
- Scroll-driven reveal animations
- Interactive effects (preloader, cursor glow, animated counters, segmented indicators, magnetic CTA button)
- Fully responsive section composition for desktop and mobile

The page is composed in `app/page.tsx` using reusable section components.

---

## Tech Stack

- **Next.js** 16.2.0
- **React** 19.2.4
- **TypeScript** 5
- **Tailwind CSS** 4
- **ESLint** 9 (`eslint-config-next`)

---

## Page Structure

`app/page.tsx` renders the page in this sequence:

1. `LandingEffects` (preloader + runtime visual behaviors)
2. `Navbar`
3. `Hero`
4. `Performance`
5. `Aerodynamics`
6. `Engine`
7. `Experience`
8. `Gallery`
9. `CTA`
10. `Footer`

> Jika section naming akan diganti ke domain properti (mis. `FeaturedProperties`, `Amenities`, `Location`, `Contact`), komposisi ini bisa langsung diadaptasi tanpa mengubah fondasi arsitektur.

---

## Directory Guide

```bash
.
├── app/
│   ├── globals.css        # Global design tokens, animations, and shared visual rules
│   ├── layout.tsx         # Root layout, fonts, and metadata
│   ├── page.tsx           # Main landing page composition
│   └── icon.tsx           # Dynamic icon generation with next/og
├── components/            # All landing-page sections and UI blocks
├── public/                # Static assets (hero/gallery images, icons)
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration + path alias (@/*)
└── package.json           # Scripts and dependencies
```

---

## Getting Started

### Prerequisites

- **Node.js 20+** (recommended)
- **npm** (with `package-lock.json`)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint checks

---

## Styling & Interaction Notes

- Global theme variables and keyframes are defined in `app/globals.css`.
- Fonts are loaded in `app/layout.tsx` via `next/font/google`:
  - `Inter` (`--font-body`)
  - `Rajdhani` (`--font-ui`)
  - `Bebas Neue` (`--font-display`)
- Runtime-only DOM animations and observers are in `components/LandingEffects.tsx` (`"use client"`).

---

## Customization Guide (Aureva Property)

To align this template with your Aureva Property content:

- **Section copy/content**  
  Update text and messaging inside each file in `components/`.

- **Branding assets**  
  Replace hero/gallery/property visuals in `public/`.

- **SEO metadata**  
  Edit title and description in `app/layout.tsx`.

- **Theme and motion tuning**  
  Adjust spacing, colors, gradients, animation timing in `app/globals.css`.

- **CTA flow**  
  Point CTA buttons to your WhatsApp, booking form, or listing/contact page.

---

## Quality Checks

Before shipping changes:

```bash
npm run lint
npm run build
```

---

## Notes

This repository currently uses a cinematic landing-page structure originally suitable for automotive showcase flows.  
For Aureva Property, the same architecture can be reused effectively by adapting:

- section labels
- content hierarchy
- image/video assets
- CTA destinations

without needing major structural rewrites.

---

## License

Proprietary / Internal use (adjust as needed).
