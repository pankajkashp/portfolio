'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { projects, projectCategories, Project } from '@/data/projects';
import { useCursorStore } from '@/store/useCursorStore';
import { ExternalLink, GitBranch, ArrowUpRight } from 'lucide-react';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { setCursorType } = useCursorStore();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursorType('default');
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setCursorType('hover'); setIsHovered(true); }}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="glass-card-hover animated-border rounded-2xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(var(--accent-rgb), 0.06), transparent, rgba(var(--accent-rgb), 0.03))` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white/[0.03] tracking-widest select-none">{project.title}</span>
          </div>
          
          {/* Status */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${
              project.status === 'In Progress'
                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>{project.status}</span>
          </div>

          {/* Hover Overlay */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center gap-4"
            style={{ background: 'rgba(var(--accent-rgb), 0.04)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener" className="p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110" style={{ background: 'rgba(var(--accent-rgb), 0.15)', border: '1px solid rgba(var(--accent-rgb), 0.3)' }}>
                <ExternalLink size={18} style={{ color: 'var(--accent)' }} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener" className="p-3 bg-white/10 border border-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20">
                <GitBranch size={18} />
              </a>
            )}
          </motion.div>

          {/* Hover glow line at bottom */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, var(--accent), transparent)` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white font-bold text-lg tracking-tight">{project.title}</p>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--accent)' }}>{project.category}</p>
            </div>
            <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>

          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-2.5 py-1 rounded-full text-[10px] font-mono"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid transparent' }}
                animate={isHovered ? { borderColor: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--text-secondary)' } : {}}
                transition={{ delay: i * 0.03 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { setCursorType } = useCursorStore();

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <Section id="projects" className="relative">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[200px] -z-10 pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.04)' }} />

      <div className="mb-16">
        <Reveal variant="fadeUp">
          <span className="section-label">Selected Work</span>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4 text-gradient">
            Featured <span className="text-gradient-accent text-glow">Projects</span>
          </h2>
        </Reveal>
      </div>

      {/* Filter */}
      <Reveal variant="fadeUp" delay={0.2}>
        <div className="flex flex-wrap gap-3 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-400 ${
                activeCategory === cat
                  ? 'text-black'
                  : 'glass-card text-text-muted hover:text-white'
              }`}
              style={activeCategory === cat ? { background: 'var(--accent)', boxShadow: '0 0 25px rgba(var(--accent-rgb), 0.3)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};
