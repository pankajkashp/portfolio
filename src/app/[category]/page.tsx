'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useCursorStore } from '@/store/useCursorStore';
import { AboutPanel } from '@/components/panels/AboutPanel';
import { SkillsPanel } from '@/components/panels/SkillsPanel';
import { EducationPanel } from '@/components/panels/EducationPanel';
import { ProjectsPanel } from '@/components/panels/ProjectsPanel';
import { ContactPanel } from '@/components/panels/ContactPanel';
import { CertificationsPanel } from '@/components/panels/CertificationsPanel';

const panels: Record<string, { title: string; component: React.FC }> = {
  about: { title: 'About Me', component: AboutPanel },
  skills: { title: 'Skills & Technologies', component: SkillsPanel },
  education: { title: 'Education', component: EducationPanel },
  projects: { title: 'Projects', component: ProjectsPanel },
  contact: { title: 'Contact', component: ContactPanel },
  certifications: { title: 'Certifications', component: CertificationsPanel },

};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const { setCursorType } = useCursorStore();
  const panel = panels[category];

  if (!panel) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">404</h1>
          <p style={{ color: 'var(--text-muted)' }}>Module not found</p>
          <Link href="/" className="btn-primary inline-block">GO BACK</Link>
        </div>
      </div>
    );
  }

  const Panel = panel.component;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
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
      </div>

      <motion.main
        className="max-w-5xl mx-auto px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Breadcrumb */}
        <Link
          href="/#dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:text-accent"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          <span className="text-gradient-accent">{panel.title}</span>
        </h1>

        <Panel />
      </motion.main>
    </div>
  );
}
