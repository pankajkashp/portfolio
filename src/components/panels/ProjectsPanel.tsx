'use client';

import { useState } from 'react';
import { projects, Project } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight, Code, Globe, Layout, Cpu, ArrowLeft } from 'lucide-react';
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
      <div className="absolute inset-0 bg-[#06060a]/98 backdrop-blur-3xl" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-6xl h-full bg-[#0d0d12] rounded-[3rem] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Left: Project Imagery */}
        <div className="flex-[1.2] relative bg-black/40 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full h-full rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden group">
               <span className="text-5xl font-black text-white/5 uppercase tracking-[0.5em] select-none text-center px-10">
                 {project.title}
               </span>
               <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/60 to-transparent" />
            </div>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex gap-4 overflow-x-auto pb-4 modal-scroll">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 whitespace-nowrap">
                {tech}
              </span>
            ))}
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#22c55e]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#22c55e] font-black">{project.status}</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                {project.title}
              </h3>
              <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Category</h4>
                <p className="text-sm text-white font-medium">{project.category}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Deployed</h4>
                <p className="text-sm text-white font-medium">{project.completionDate}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener" 
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
                  rel="noopener" 
                  className="flex-1 h-16 rounded-2xl bg-[#22c55e] flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <Globe size={18} /> Live Website
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
                <ArrowLeft size={16} /> Return to Intelligence Sector
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
            className="group relative aspect-[16/11] rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(project)}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
             {/* Preview Overlay */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[#22c55e]" />
             
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-[#22c55e] group-hover:text-black transition-all duration-500">
                      <Layout size={24} />
                   </div>
                   <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black group-hover:text-white transition-colors">
                      {project.category}
                   </div>
                </div>

                <div className="mt-auto space-y-4">
                   <h4 className="text-3xl font-bold text-white tracking-tight group-hover:text-[#22c55e] transition-colors">{project.title}</h4>
                   <p className="text-sm text-white/30 leading-relaxed font-light line-clamp-2 max-w-[90%] group-hover:text-white/50 transition-colors">
                      {project.description}
                   </p>
                   <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">
                      Explore Deployment <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
