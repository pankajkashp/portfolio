'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certs = [
  { title: 'Google AI Professional Certificate', issuer: 'Google', year: '2024' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
  { title: 'Meta Frontend Developer Certificate', issuer: 'Meta', year: '2023' },
  { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2023' },
];

export const CertificationsPanel = () => (
  <div className="space-y-3">
    {certs.map((c, i) => (
      <motion.div key={i} className="glass-card rounded-xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
        <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.1)', color: '#14b8a6' }}>
          <Award size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white">{c.title}</h4>
          <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>{c.issuer} · {c.year}</p>
        </div>
      </motion.div>
    ))}
  </div>
);
