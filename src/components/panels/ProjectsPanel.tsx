'use client';

import { useState } from 'react';
import { projects, Project } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, X, ArrowUpRight } from 'lucide-react';
import { useCursorStore } from '@/store/useCursorStore';

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { setCursorType } = useCursorStore();
  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-2xl max-h-[80vh] rounded-2xl overflow-hidden"
        style={{ background: 'rgba(12,12,18,0.97)', border: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{project.title}</span>
          <button onClick={onClose} onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors">
            <X size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(80vh-60px)] modal-scroll p-6 space-y-5">
          {/* Preview area */}
          <div className="aspect-video rounded-xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.08), rgba(var(--accent-rgb),0.02))' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/[0.03] tracking-widest select-none">{project.title}</span>
            </div>
            <div className="absolute top-3 left-3">
              <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${project.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>{project.status}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.longDescription || project.description}</p>

          {/* Technologies */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-mono" style={{ background: 'rgba(var(--accent-rgb),0.08)', color: 'var(--accent)', border: '1px solid rgba(var(--accent-rgb),0.15)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener" className="btn-ghost flex items-center gap-2 text-xs" onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')}>
                <GitBranch size={14} /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener" className="btn-primary flex items-center gap-2 text-xs" onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')}>
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="dash-card p-0 overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(project)}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            {/* Thumbnail */}
            <div className="aspect-video relative" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.06), transparent, rgba(var(--accent-rgb),0.03))' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white/[0.03] tracking-widest select-none">{project.title}</span>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${project.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>{project.status}</span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} style={{ color: 'var(--accent)' }} />
              </div>
            </div>
            {/* Content */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{project.title}</h4>
                <span className="text-[10px] font-mono" style={{ color: 'var(--accent)' }}>{project.category}</span>
              </div>
              <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {project.technologies.slice(0, 4).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/[0.03]" style={{ color: 'var(--text-muted)' }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
};
