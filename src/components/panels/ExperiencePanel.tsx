'use client';

import { experience } from '@/data/experience';
import { motion } from 'framer-motion';

export const ExperiencePanel = () => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />
      <div className="space-y-6">
        {experience.map((exp, i) => (
          <motion.div key={exp.id} className="relative pl-10" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
            <div className="absolute left-4 -translate-x-1/2 top-2 z-10">
              <div className={`w-3 h-3 rounded-full border-2 ${exp.isCurrent ? 'bg-accent border-accent' : 'bg-background border-white/20'}`} />
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div>
                  <h4 className="text-sm font-bold text-white">{exp.position}</h4>
                  <p className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{exp.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  {exp.isCurrent && <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-[9px] text-accent font-bold tracking-widest uppercase">Current</span>}
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>{exp.startDate} — {exp.endDate}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
