# Aureva Property Landing Page

A modern, single-page promotional website for **AUREVA — Luxury Villas & Resort**, built with **Next.js App Router**, **React**, **TypeScript**, and **Tailwind CSS v4**.

This project focuses on delivering a premium first impression through immersive visual storytelling, elegant typography, and luxury-oriented section flow while staying performant and responsive across devices.

---

## Project Overview

Aureva Property is designed as a front-end showcase experience with emphasis on:

- Luxury property-centric storytelling
- High-end visual hierarchy and layout rhythm
- Curated section flow for villas, experiences, testimonials, and booking
- Interactive and motion-enhanced presentation using `framer-motion`
- Fully responsive composition for desktop and mobile

The page is composed in `app/page.tsx` using reusable section components.

---

## Tech Stack

- **Next.js** 16.2.7
- **React** 19.2.4
- **TypeScript** 5
- **Tailwind CSS** 4
- **Framer Motion** 12.40.0
- **Lucide React** 1.17.0
- **ESLint** 9 (`eslint-config-next` 16.2.7)

---

## Page Structure

`app/page.tsx` renders the page in this sequence:

1. `Hero`
2. `FeaturedVillas`
3. `CuratedExperiences`
4. `ImmersiveGallery`
5. `WhyAureva`
6. `GuestChronicles`
7. `DestinationDiscovery`
8. `BookingCTA`
9. `LuxuryFooter`

---

## Directory Guide

```bash
.
├── app/
│   ├── globals.css        # Global design tokens, typography, and visual styling
│   ├── layout.tsx         # Root layout, fonts, metadata, and SEO/social config
│   ├── page.tsx           # Main landing page composition
│   └── icon.tsx           # App icon route for Next.js App Router
├── components/            # All landing-page sections and reusable UI blocks
├── public/                # Static assets (hero imagery, logos, gallery visuals)
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
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

- Global theme and shared visual rules are defined in `app/globals.css`.
- Fonts are loaded in `app/layout.tsx` via `next/font/google`:
  - `Cormorant Garamond` (`--font-cormorant-garamond`)
  - `Inter` (`--font-inter`)
- Motion/interactive presentation is supported through `framer-motion` across components.

---

## SEO & Metadata Notes

Metadata is configured in `app/layout.tsx`, including:

- `metadataBase`: `https://aureva-resort.vercel.app`
- Title/description for search engines
- Open Graph configuration for social sharing
- Twitter card configuration
- Favicon/app icons sourced from `/images/aureva-logo-mark.webp`
- Locale: `en_US`

---

## Customization Guide (Aureva Property)

To align this template with your latest property campaign:

- **Section copy/content**  
  Update messaging and property narratives in each file under `components/`.

- **Branding assets**  
  Replace hero/gallery/logo visuals in `public/images/`.

- **SEO metadata**  
  Update title, description, and social preview assets in `app/layout.tsx`.

- **Theme and motion tuning**  
  Adjust spacing, color palette, typography scale, and animation feel in `app/globals.css` and component-level motion configs.

- **CTA flow**  
  Connect `BookingCTA` to WhatsApp concierge, booking engine, lead form, or contact endpoint.

---

## Quality Checks

Before shipping changes:

```bash
npm run lint
npm run build
```

---

## Deployment

Production metadata is currently aligned with:

- `https://aureva-resort.vercel.app`

---

## License

Proprietary / Internal use (adjust as needed).
