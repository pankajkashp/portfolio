'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCursorStore } from '@/store/useCursorStore';
import type { CategoryKey } from '@/components/sections/Dashboard';
import { AboutPanel } from '@/components/panels/AboutPanel';
import { SkillsPanel } from '@/components/panels/SkillsPanel';
import { EducationPanel } from '@/components/panels/EducationPanel';
import { ExperiencePanel } from '@/components/panels/ExperiencePanel';
import { ProjectsPanel } from '@/components/panels/ProjectsPanel';
import { ServicesPanel } from '@/components/panels/ServicesPanel';
import { ContactPanel } from '@/components/panels/ContactPanel';
import { CertificationsPanel } from '@/components/panels/CertificationsPanel';
import { AILabPanel } from '@/components/panels/AILabPanel';

const panelMap: Record<string, React.FC> = {
  about: AboutPanel,
  skills: SkillsPanel,
  education: EducationPanel,
  experience: ExperiencePanel,
  projects: ProjectsPanel,
  services: ServicesPanel,
  contact: ContactPanel,
  certifications: CertificationsPanel,
  ailab: AILabPanel,
};

const titles: Record<string, string> = {
  about: 'About Me',
  skills: 'Skills & Technologies',
  education: 'Education',
  experience: 'Experience',
  projects: 'Projects',
  services: 'Services',
  contact: 'Contact',
  certifications: 'Certifications',
  ailab: 'AI Lab',
};

interface Props {
  category: CategoryKey;
  onClose: () => void;
}

export const DashboardModal = ({ category, onClose }: Props) => {
  const { setCursorType } = useCursorStore();
  const Panel = panelMap[category];

  if (!Panel) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(12, 12, 18, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 80px rgba(var(--accent-rgb), 0.05)',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              {titles[category] || category}
            </span>
          </div>
          <button
            onClick={onClose}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <X size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-60px)] modal-scroll p-6 md:p-8">
          <Panel />
        </div>
      </motion.div>
    </motion.div>
  );
};
