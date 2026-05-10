'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { projects, projectCategories, Project } from '@/data/projects';
import { useCursorStore } from '@/store/useCursorStore';
import { ExternalLink, GitBranch, ArrowUpRight } from 'lucide-react';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { setCursorType } = useCursorStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => { setCursorType('hover'); setIsHovered(true); }}
      onMouseLeave={() => { setCursorType('default'); setIsHovered(false); }}
    >
      <div className="glass-card-hover rounded-2xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Typography className="text-3xl font-bold text-white/5 tracking-widest select-none">
              {project.title}
            </Typography>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              project.status === 'In Progress' 
                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
                : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Hover Overlay */}
          <motion.div 
            className="absolute inset-0 bg-accent/5 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener" className="p-3 bg-accent/20 border border-accent/30 rounded-full hover:bg-accent/30 transition-colors">
                <ExternalLink size={18} className="text-accent" />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener" className="p-3 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-colors">
                <GitBranch size={18} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <Typography className="text-white font-bold text-lg tracking-tight">{project.title}</Typography>
              <Typography className="text-accent text-xs font-mono mt-1">{project.category}</Typography>
            </div>
            <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          <Typography className="text-text-secondary text-sm leading-relaxed">
            {project.description}
          </Typography>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-white/5 rounded-full text-[10px] text-text-muted font-mono">
                {tech}
              </span>
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

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <Section id="projects" className="relative">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[200px] -z-10" />

      <div className="mb-16">
        <Reveal variant="fadeUp">
          <span className="section-label">Selected Work</span>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <Typography variant="title" as="h2" className="text-4xl md:text-5xl mt-4">
            Featured <span className="text-accent">Projects</span>
          </Typography>
        </Reveal>
      </div>

      {/* Category Filter */}
      <Reveal variant="fadeUp" delay={0.2}>
        <div className="flex flex-wrap gap-3 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-black shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                  : 'glass-card text-text-muted hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Project Grid */}
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
