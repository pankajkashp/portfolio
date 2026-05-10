'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const education = [
  { degree: 'Bachelor of Technology — Computer Science', institution: 'University of Technology', year: '2020 – 2024', description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with distinction.' },
  { degree: 'Higher Secondary (12th)', institution: 'Science Stream', year: '2018 – 2020', description: 'Focused on Physics, Chemistry, Mathematics, and Computer Science.' },
];

export const EducationPanel = () => {
  return (
    <div className="space-y-4">
      {education.map((edu, i) => (
        <motion.div key={i} className="glass-card rounded-xl p-6 flex gap-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
            <GraduationCap size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--accent)' }}>{edu.institution}</p>
            <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{edu.year}</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{edu.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
