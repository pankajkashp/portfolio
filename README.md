<div align="center">
  
  # ✨ Pankaj Kashyap Portfolio

  <a href="https://your-portfolio-url.com">
    <img src="/readme-assest/landing.png" alt="Pankaj Portfolio Preview" width="100%" style="border-radius: 12px; margin: 15px 0; box-shadow: 0 8px 24px rgba(0,0,0,0.1);" />
  </a>

  <p align="center">
    <strong>A cinematic, single-page portfolio built with Next.js</strong><br>
    <em>Blending motion, storytelling, and practical contact flows into one polished experience.</em>
  </p>

  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a>
  </p>

  ---
</div>

## 🚀 The Vision

This site is designed to feel like a personal product launch: **fast, expressive, and easy to explore.** It's not just a list of links; it is a guided experience that makes it easy for someone to understand your work and reach out directly.

## ✨ Key Features

- 🎬 **Cinematic Landing Page:** Parallax and reveal effects to wow visitors instantly.
- 📬 **Contact-First Approach:** A direct "Hire Me" path connected to Resend for instant email delivery.
- 🧩 **Modular Architecture:** All content lives in `src/data` for incredibly simple editing.
- 🧭 **Dashboard Experience:** A dedicated space for browsing deeper content in an interactive format.
- 🚀 **SEO Optimized:** Metadata pre-configured in the root layout and shared SEO config.
- 🗄️ **Database Ready:** Prisma schema built-in for storing projects, experience, skills, and settings.

## 🛠 Tech Stack

Built with cutting-edge web technologies:

- **Framework:** [Next.js 16](https://nextjs.org/) & [React 18](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Database:** [Prisma](https://www.prisma.io/)
- **Emails:** [Resend](https://resend.com/)
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)

## 📸 Screenshots

Replace the placeholders in `public/readme/` with real images to showcase your work!

<details>
<summary>Click to expand screenshots guidelines</summary>
<br>

- Full landing page screenshot (`landing-page.png`)
- Mobile view screenshot (`mobile-view.png`)
- Projects or dashboard screenshot (`projects-view.png`)
- Contact page screenshot (`contact-view.png`)

</details>

## 🏁 Getting Started

Follow these steps to set up the project locally.

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the project root:
```env
DATABASE_URL="your_postgres_connection_string"
RESEND_API_KEY="your_resend_api_key"
```
> **Note:** If `RESEND_API_KEY` is missing, the contact form fails gracefully with a clear error message.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/               # App Router pages and API routes
├── components/        # Sections, panels, layouts, animations, and UI pieces
├── data/              # 📝 Portfolio content and navigation data (Edit this!)
├── hooks/             # Shared React hooks
├── lib/               # Utilities
├── providers/         # App-level providers
├── store/             # Zustand stores
└── theme/             # Theme configuration
```

## ✍️ Customizing Your Content

Most of the visible content lives in the data files under `src/data/`. You can edit these quickly without touching the UI components!

- 👤 `src/data/personal.ts` - Name, role, bio, hero copy, and focus areas.
- 🧭 `src/data/navigation.ts` - Navigation links.
- 💼 `src/data/projects.ts` - Project showcase content.
- 📈 `src/data/experience.ts` - Experience timeline.
- 🛠️ `src/data/skills.ts` - Skill list.
- 🔗 `src/data/socials.ts` - Social links.

## 🚀 Deployment

- Configure your environment variables in your hosting platform (Vercel, Netlify, etc.).
- Ensure assets in `public/` (like hero images and PDFs) are uploaded.
- Confirm your database and Resend credentials are set up for production.

---

<div align="center">
  Built with ❤️ by Pankaj Kashyap
</div>
