'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import { personalInfo } from '@/data/personal';
import {
  User, Code, GraduationCap, Briefcase, FolderOpen, Cpu,
  Mail, FileText, Award, FlaskConical, ChevronRight
} from 'lucide-react';
import { DashboardModal } from '@/components/ui/DashboardModal';

export type CategoryKey = 'about' | 'skills' | 'education' | 'experience' | 'projects' | 'services' | 'contact' | 'resume' | 'certifications' | 'ailab';

interface CategoryItem {
  key: CategoryKey;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

const categories: CategoryItem[] = [
  { key: 'about',          label: 'About Me',       description: 'Profile, achievements & goals',   icon: <User size={22} />,           accent: '#ff6b00' },
  { key: 'skills',         label: 'Skills',          description: 'Technologies & expertise',         icon: <Code size={22} />,           accent: '#00d4ff' },
  { key: 'education',      label: 'Education',       description: 'Academic background',              icon: <GraduationCap size={22} />,  accent: '#a855f7' },
  { key: 'experience',     label: 'Experience',      description: 'Professional timeline',            icon: <Briefcase size={22} />,      accent: '#22c55e' },
  { key: 'projects',       label: 'Projects',        description: 'Featured work & builds',           icon: <FolderOpen size={22} />,     accent: '#ff6b00' },
  { key: 'services',       label: 'Services',        description: 'What I offer',                     icon: <Cpu size={22} />,            accent: '#f43f5e' },
  { key: 'contact',        label: 'Contact',         description: 'Get in touch',                     icon: <Mail size={22} />,           accent: '#3b82f6' },
  { key: 'resume',         label: 'Resume',          description: 'Download CV',                      icon: <FileText size={22} />,       accent: '#eab308' },
  { key: 'certifications', label: 'Certifications',  description: 'Badges & certificates',            icon: <Award size={22} />,          accent: '#14b8a6' },
  { key: 'ailab',          label: 'AI Lab',          description: 'Experiments & prototypes',          icon: <FlaskConical size={22} />,   accent: '#f97316' },
];

export const Dashboard = () => {
  const { setCursorType } = useCursorStore();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);

  return (
    <>
      <section id="dashboard" className="relative min-h-screen py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[200px]"
            style={{ background: 'rgba(var(--accent-rgb), 0.04)' }}
          />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[180px]"
            style={{ background: 'rgba(var(--accent-rgb), 0.03)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent" />
              <span className="section-label">COMMAND CENTER</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">Mission </span>
              <span className="text-gradient-accent">Control</span>
            </h2>
            <p className="mt-3 text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
              Navigate through the systems. Click any module to explore.
            </p>
          </motion.div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.key}
                className="dash-card p-5 text-left group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  if (cat.key === 'resume') {
                    window.open(personalInfo.resumeUrl, '_blank');
                  } else {
                    setActiveCategory(cat.key);
                  }
                }}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${cat.accent}10`,
                    color: cat.accent,
                    boxShadow: `0 0 0px ${cat.accent}00`,
                  }}
                >
                  {cat.icon}
                </div>

                {/* Text */}
                <p className="text-sm font-semibold text-white mb-1 group-hover:text-accent transition-colors">
                  {cat.label}
                </p>
                <p className="text-[11px] leading-snug" style={{ color: 'var(--text-muted)' }}>
                  {cat.description}
                </p>

                {/* Arrow */}
                <div className="mt-3 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cat.accent }}>
                  Open <ChevronRight size={10} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bottom bar */}
          <motion.div
            className="mt-16 flex items-center justify-between glass-card rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
              <span>{personalInfo.about.stats[0].value} EXP</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{personalInfo.about.stats[1].value} PROJECTS</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{personalInfo.about.stats[2].value} TECH</span>
            </div>
            <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} {personalInfo.name}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <DashboardModal
            category={activeCategory}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
