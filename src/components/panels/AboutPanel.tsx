'use client';

import { personalInfo } from '@/data/personal';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutPanel = () => {
  return (
    <div className="space-y-10 py-10">
      {/* ─── BIO SECTION ─── */}
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 relative">
            <Image
              src="/pankaj.png"
              alt={personalInfo.fullName}
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent opacity-60" />
          </div>
          {/* Decorative Corner */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#ff6b00]/30 rounded-tl-[3rem] pointer-events-none" />
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
              {personalInfo.fullName.split(' ')[0]} <span className="text-white/20">{personalInfo.fullName.split(' ')[1]}</span>
            </h3>
            <p className="text-sm font-medium text-[#ff6b00] uppercase tracking-[0.4em]">
              {personalInfo.about.short}
            </p>
          </div>

          <p className="text-xl md:text-2xl leading-relaxed text-white/50 font-light">
            {personalInfo.about.long}
          </p>

          <div className="flex gap-10 pt-4">
            {personalInfo.about.stats.slice(0, 3).map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-4xl font-light text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/20 font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ACHIEVEMENTS ─── */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.5em] text-[#ff6b00]">Core Achievements</h4>
          <div className="grid gap-4">
            {personalInfo.about.achievements.map((a, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex gap-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#ff6b00]" />
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.5em] text-[#ff6b00]">Focus Sectors</h4>
          <div className="flex flex-wrap gap-3">
            {personalInfo.focus.map((f, i) => (
              <motion.span
                key={f}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#ff6b00]/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                {f}
              </motion.span>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};
