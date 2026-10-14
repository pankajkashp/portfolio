'use client';

import { useState } from 'react';
import { projects, Project } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X, ArrowUpRight, Globe, Code2, ArrowLeft
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { useCursorStore } from '@/store/useCursorStore';

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { setCursorType } = useCursorStore();

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#06060a]/98 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-6xl h-full bg-[#0d0d12] rounded-[3rem] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Left: Project Imagery */}
        <div className="flex-[1.2] relative bg-black/40 overflow-hidden group/imagery">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full h-full rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right: Project Intel */}
        <div className="p-8 md:p-16 overflow-y-auto modal-scroll flex flex-col pb-24" data-lenis-prevent>
          <button
            onClick={onClose}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            className="self-end w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300 mb-12"
          >
            <X size={20} />
          </button>

          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                {project.title}
              </h3>
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 text-white/80 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all duration-300"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <GithubIcon size={18} /> Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-16 rounded-2xl bg-[#a855f7] flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <Globe size={18} /> Live Demo
                </a>
              )}
            </div>

            {/* Back to Project Grid */}
            <div className="pt-12 border-t border-white/5">
              <button
                onClick={onClose}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]"
              >
                <ArrowLeft size={16} /> Return to Projects
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const ProjectsPanel = () => {
  const { setCursorType } = useCursorStore();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.title} details`}
            className="group relative aspect-[16/11] rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(project);
              }
            }}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            {/* Preview Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[#a855f7]" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-[#a855f7] group-hover:text-white transition-all duration-500 overflow-hidden flex items-center justify-center">
                  <Code2 size={24} />
                </div>
                {project.technologies[0] && (
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono group-hover:text-white transition-colors">
                    {project.technologies[0]}
                  </div>
                )}
              </div>

              <div className="mt-auto space-y-4">
                <h4 className="text-3xl font-bold text-white tracking-tight group-hover:text-[#a855f7] transition-colors">{project.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed font-light line-clamp-2 max-w-[90%] group-hover:text-white/70 transition-colors">
                  {project.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">
                  View Details <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};
