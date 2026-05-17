# 📂 Project Structure & Data Guide

This guide explains how to edit your portfolio information and where each component is located.

---

## 🛠️ Where to Edit Information
Most of your portfolio data is centralized in the `src/data/` directory. Editing these files will automatically update the website.

| Section | Data File Path | Description |
| :--- | :--- | :--- |
| **Personal Info** | `src/data/personal.ts` | Name, Bio, Hero subtitle, and overall profile data. |
| **Projects** | `src/data/projects.ts` | List of projects, descriptions, tech stack, and links. |
| **Skills** | `src/data/skills.ts` | Technical skills, categories, and proficiency labels. |
| **Education** | `src/data/education.ts` | Degrees, institutions, and academic records. |
| **Certifications** | `src/data/certifications.ts` | Professional credentials, IDs, and issuers. |
| **Social Links** | `src/data/socials.ts` | Links to GitHub, LinkedIn, Twitter, etc. |

---

## 🧩 Dashboard Components (Panels)
The dashboard uses a modular "Panel" system. If you want to change the **layout** or **styling** of a specific section, edit these files:

- **About Panel**: `src/components/panels/AboutPanel.tsx`
- **Skills Panel**: `src/components/panels/SkillsPanel.tsx`
- **Projects Panel**: `src/components/panels/ProjectsPanel.tsx`
- **Education Panel**: `src/components/panels/EducationPanel.tsx`
- **Certifications Panel**: `src/components/panels/CertificationsPanel.tsx`
- **Contact Panel**: `src/components/panels/ContactPanel.tsx`

---

## 🚀 Main Sections
- **Hero / Landing Page**: `src/components/sections/HeroLanding.tsx`
- **Dashboard Command Center**: `src/components/sections/Dashboard.tsx`

---

## 🎨 Styling & Theme
- **Global Styles**: `src/app/globals.css` (Colors, Animations, Glass effects)
- **Tailwind Config**: `tailwind.config.ts`

---

### 💡 Pro Tip
If you want to add a new project, simply add a new object to the `projects` array in `src/data/projects.ts`. The dashboard will automatically create a new card for it!
