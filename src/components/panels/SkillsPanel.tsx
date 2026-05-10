'use client';

import { skills } from '@/data/skills';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
}

export const SkillsPanel = () => {
  const categories = [...new Set(skills.map(s => s.category))];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, ci) => (
        <motion.div key={cat} className="glass-card rounded-xl p-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
          <h4 className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: 'var(--accent)' }}>{cat}</h4>
          <div className="space-y-4">
            {skills.filter(s => s.category === cat).map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.2 + i * 0.08} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
