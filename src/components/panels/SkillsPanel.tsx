'use client';

import { skills } from '@/data/skills';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export const SkillsPanel = () => {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div className="py-10">
      {/* Header with Icon */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
          <Layers size={32} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Skills & <span className="text-white/40">Technologies</span>
        </h2>
      </div>

      {/* Main Container */}
      <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-12">
        {categories.map((cat, ci) => (
          <div key={cat} className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#3b82f6] tracking-tight">
              {cat}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.filter(s => s.category === cat).map((skill, i) => (
                <motion.span
                  key={skill.name}
                  className="px-6 py-3 rounded-full bg-[#1a1a24] border border-white/5 text-sm font-medium text-white/70 hover:text-white hover:border-[#3b82f6]/40 hover:bg-[#252535] transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.1 + i * 0.05 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
