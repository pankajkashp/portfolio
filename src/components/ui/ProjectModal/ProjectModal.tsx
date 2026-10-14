'use client';

import { useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Dialog Window */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#080910] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} Project Details`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-6 md:px-8 py-5 bg-[#080910]/95 backdrop-blur-md border-b border-white/10 z-30">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/25 shrink-0">
                  Project Details
                </span>
                <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight truncate">
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#a855f7] hover:bg-[#9333ea] text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 transition-colors"
                  >
                    <GitBranch size={13} />
                    <span>Code</span>
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 hover:bg-white text-white/60 hover:text-black border border-white/10 flex items-center justify-center transition-all duration-200"
                  aria-label="Close project modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body */}
            <div
              className="flex-1 overflow-y-auto modal-scroll px-6 md:px-10 py-7 md:py-9 space-y-8"
              data-lenis-prevent
            >
              {/* Project Image */}
              <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl md:rounded-3xl bg-[#090a10] border border-white/10 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  unoptimized
                  priority
                  className="object-contain p-2 md:p-4"
                />
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {project.title}
                </h1>
                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2.5">
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

              {/* Prominent Action Links & Close */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                    >
                      <span>Launch Live Demo</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors"
                    >
                      <GitBranch size={15} />
                      <span>View Repository</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
