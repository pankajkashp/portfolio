# Project Structure & Component Guide

This document provides a comprehensive overview of the portfolio's architecture, key pages, and components.

## 🚀 Overview
The portfolio is built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It features a cinematic 3D experience using **React Three Fiber**.

---

## 📁 Key Directories

### `src/app`
Contains the main routes and global layout.
- `page.tsx`: The entry point (Hero + Dashboard).
- `layout.tsx`: Global layout, fonts, and metadata.
- `[category]/page.tsx`: Dynamic route for dashboard module pages.

### `src/components`
Reusable UI units and sections.
- `3d/`: Three.js related components.
  - `AvatarSystem.tsx`: The core 3D Identity Orb system (contains the holographic portrait).
  - `Scene.tsx`: The R3F Canvas wrapper.
- `sections/`: Main layout sections.
  - `HeroLanding.tsx`: The cinematic hero section.
  - `Dashboard.tsx`: The command center grid.
- `panels/`: Content for dashboard modules (About, Skills, Projects, etc.).
- `ui/`: Small interactive components (Buttons, Modals, etc.).
- `layout/`: Global layout components (Navbar, Footer).
- `effects/`: Atmospheric visual effects (CinematicBackground, CustomCursor).

### `src/data`
Static content and configuration.
- `personal.ts`: Personal info, bio, and stats.
- `projects.ts`: Project list and details.
- `skills.ts`: Skill categories and levels.

---

## 🛠 Main Components

### 1. `HeroLanding.tsx`
The primary landing experience.
- **Left Side**: Name, animated role rotator, and CTA buttons.
- **Right Side**: The `AvatarSystem` (3D Orb).
- **Interactions**: Mouse-reactive background glow.

### 2. `AvatarSystem.tsx`
The visual centerpiece.
- **IdentityOrb**: A glass shell with orbital rings and neural lines.
- **HolographicPortrait**: Displays `/pankaj.png` inside the orb with scanning effects.
- **Performance**: Optimized using `meshPhysicalMaterial` and reduced vertex counts.

### 3. `Dashboard.tsx`
The navigation command center.
- Uses a responsive grid of "dash-cards".
- Each card links to a specific route (e.g., `/about`).

### 4. `Navbar.tsx`
A premium capsule-style navigation bar.
- Floating at the top with a glassmorphism effect.
- Features active link highlighting and a resume download button.

---

## ⚙️ Customization
- **Theme Colors**: Defined in `globals.css` using CSS variables (`--accent`, `--background`, etc.).
- **Content**: Edit files in `src/data/` to update your portfolio information.
- **3D Scene**: Modify `AvatarSystem.tsx` to tweak the orb's appearance or animations.

---

## ⚡ Performance
The project uses several optimization techniques:
- GPU-accelerated CSS animations.
- Lightweight 3D materials.
- Client-side navigation via Next.js `Link`.
