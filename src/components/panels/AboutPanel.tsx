'use client';

import { personalInfo } from '@/data/personal';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutPanel = () => {
  return (
    <div className="space-y-8">
      {/* Top: Photo + Bio */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 border border-white/5">
          <Image src="/profile.jpg" alt={personalInfo.fullName} width={128} height={128} className="object-cover w-full h-full" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gradient">{personalInfo.fullName}</h3>
          <p className="text-sm font-mono text-accent">{personalInfo.hero.subtitle}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {personalInfo.about.long}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {personalInfo.about.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="text-xl font-bold text-gradient-accent">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Key Achievements</h4>
        <div className="space-y-3">
          {personalInfo.about.achievements.map((a, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Focus Areas</h4>
        <div className="flex flex-wrap gap-2">
          {personalInfo.focus.map((f) => (
            <span key={f} className="px-3 py-1.5 rounded-lg text-[11px] font-mono" style={{ background: 'rgba(var(--accent-rgb), 0.08)', color: 'var(--accent)', border: '1px solid rgba(var(--accent-rgb), 0.15)' }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
