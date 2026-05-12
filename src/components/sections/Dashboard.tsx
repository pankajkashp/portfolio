'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import { useDashboardStore } from '@/store/useDashboardStore';
import { personalInfo } from '@/data/personal';
import {
  User, Code, GraduationCap, FolderOpen,
  Mail, FileText, ChevronRight, X, Cpu, Globe, ArrowLeft, Award
} from 'lucide-react';

// Panels
import { AboutPanel } from '@/components/panels/AboutPanel';
import { SkillsPanel } from '@/components/panels/SkillsPanel';
import { EducationPanel } from '@/components/panels/EducationPanel';
import { ProjectsPanel } from '@/components/panels/ProjectsPanel';
import { ContactPanel } from '@/components/panels/ContactPanel';
import { CertificationsPanel } from '@/components/panels/CertificationsPanel';

interface CategoryItem {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

const categories: CategoryItem[] = [
  { key: 'about', label: 'About Me', description: 'Biometric profile & mission overview', icon: <User size={28} />, accent: '#ff6b00' },
  { key: 'skills', label: 'Skills', description: 'Technical stack & proficiency levels', icon: <Cpu size={28} />, accent: '#00d4ff' },
  { key: 'education', label: 'Education', description: 'Academic records & certifications', icon: <GraduationCap size={28} />, accent: '#a855f7' },
  { key: 'projects', label: 'Projects', description: 'Operational deployments & codebase', icon: <FolderOpen size={28} />, accent: '#22c55e' },
  { key: 'certifications', label: 'Certifications', description: 'Professional credentials & awards', icon: <Award size={28} />, accent: '#eab308' },
  { key: 'contact', label: 'Contact', description: 'Encrypted communication channel', icon: <Mail size={28} />, accent: '#3b82f6' },
];

export const Dashboard = () => {
  const { setCursorType } = useCursorStore();
  const { activeModule, setActiveModule, setIsDashboardOpen } = useDashboardStore();

  const handleCardClick = (key: string) => {
    setActiveModule(key);
    window.location.hash = key;
  };

  const closeModule = () => {
    setActiveModule(null);
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  const shutdownSystem = () => {
    setActiveModule(null);
    setIsDashboardOpen(false);
    window.location.hash = '';
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  // Sync with URL Hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validKeys = categories.map(c => c.key);
      if (validKeys.includes(hash)) {
        setActiveModule(hash);
      } else if (!hash) {
        setActiveModule(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <section 
      id="dashboard" 
      className="relative h-screen bg-[#06060a] overflow-hidden flex flex-col"
      data-lenis-prevent
    >
      {/* ─── FUTURISTIC BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#06060a] via-transparent to-[#06060a]" />
      </div>

      {/* Main Scrollable Area (Dashboard Grid) */}
      <motion.div 
        className={`flex-1 overflow-y-auto py-32 ${activeModule ? 'pointer-events-none' : 'pointer-events-auto'}`}
        animate={{ 
          filter: activeModule ? 'blur(20px)' : 'blur(0px)',
          opacity: activeModule ? 0.3 : 1,
          scale: activeModule ? 0.95 : 1
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
          {/* Header and Grid... */}
        {/* ─── HEADER ─── */}
        <motion.div
          className="mb-24 flex items-start justify-between gap-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-px bg-[#ff6b00]" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#ff6b00]">Command Center // System Active</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              <motion.span
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                CORE
              </motion.span> 
              <br />
              <span className="text-[#ff6b00]">MODULES</span>
            </h2>
            
            <p className="text-xl text-white/50 max-w-xl font-light leading-relaxed">
              <span className="text-[#ff6b00] font-mono text-xs mr-2 animate-pulse">[CONNECTED]</span>
              Accessing neural archives... Exploring projects, skills, and professional experience.
            </p>
          </div>

          <button
            onClick={shutdownSystem}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            className="group relative flex items-center gap-6 px-10 py-5 rounded-full bg-[#ff6b00] text-black font-black transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:shadow-[0_0_50px_rgba(255,107,0,0.5)]"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 text-[11px] uppercase tracking-[0.4em]">Exit System</span>
            <X size={20} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </motion.div>

        {/* ─── CINEMATIC GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => handleCardClick(cat.key)}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className="group relative w-full aspect-[4/3] md:aspect-[16/10] text-left overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-10 transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10"
              >
                {/* Depth Lighting */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${cat.accent}15, transparent 40%)`
                  }}
                />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]"
                    style={{ background: `${cat.accent}10`, color: cat.accent }}
                  >
                    {cat.icon}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-[#ff6b00] transition-colors duration-500">
                      {cat.label}
                    </h3>
                    <p className="text-sm md:text-base text-white/30 font-light leading-relaxed max-w-[80%]">
                      {cat.description}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">
                      Initialize Link <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Animated Border Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                  <div className="absolute top-8 right-8 w-px h-0 bg-white/20 group-hover:h-12 transition-all duration-700 delay-100" />
                  <div className="absolute top-8 right-8 w-0 h-px bg-white/20 group-hover:w-12 transition-all duration-700 delay-100" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* ─── SYSTEM STATUS BAR ─── */}
        <motion.div
          className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Core Operational</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              V{new Date().getFullYear()}.4.2
            </div>
          </div>

          <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            <span className="hover:text-white transition-colors cursor-help">Latency: 12ms</span>
            <button 
              onClick={shutdownSystem}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className="hover:text-[#ff6b00] transition-colors"
            >
              Terminate Session
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>

      {/* ─── CINEMATIC MODAL SYSTEM ─── */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-[#06060a]/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-7xl h-full bg-[#0d0d12] rounded-[3rem] border border-white/10 overflow-hidden grid grid-rows-[auto_1fr]"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ff6b00]">
                    {categories.find(c => c.key === activeModule)?.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      {categories.find(c => c.key === activeModule)?.label}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={closeModule}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-8 md:p-16 modal-scroll" data-lenis-prevent>
                <div className="max-w-5xl mx-auto pb-24">
                  {activeModule === 'about' && <AboutPanel />}
                  {activeModule === 'skills' && <SkillsPanel />}
                  {activeModule === 'education' && <EducationPanel />}
                  {activeModule === 'projects' && <ProjectsPanel />}
                  {activeModule === 'contact' && <ContactPanel />}
                  {activeModule === 'certifications' && <CertificationsPanel />}

                  {/* Module Navigation Back */}
                  <div className="mt-20 pt-10 border-t border-white/5 flex justify-center">
                    <button
                      onClick={closeModule}
                      onMouseEnter={() => setCursorType('pointer')}
                      onMouseLeave={() => setCursorType('default')}
                      className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-sm font-bold uppercase tracking-widest"
                    >
                      <ArrowLeft size={18} /> Back to Command Center
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
