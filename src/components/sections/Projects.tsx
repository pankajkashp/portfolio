'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { projects } from '@/data/projects';
import { useCursorStore } from '@/store/useCursorStore';
import { ExternalLink, GitBranch } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featuredProjects = projects.slice(0, 3);
  const remainingProjects = projects.slice(3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main header
      gsap.fromTo(
        '.projects-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate each featured project block
      featuredRefs.current.forEach((el, index) => {
        if (!el) return;
        const imageBlock = el.querySelector('.project-image');
        const contentBlock = el.querySelector('.project-content');

        gsap.fromTo(
          imageBlock,
          { opacity: 0, scale: 0.95, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
            },
          }
        );

        gsap.fromTo(
          contentBlock,
          { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
            },
          }
        );
      });

      // Animate remaining header
      if (remainingProjects.length > 0) {
        gsap.fromTo(
          '.remaining-header',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.remaining-header',
              start: 'top 85%',
            },
          }
        );

        // Animate remaining grid items
        gsap.fromTo(
          gridRefs.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.remaining-grid',
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [remainingProjects.length]);

  return (
    <Section id="projects" className="relative bg-[#06060a]">
      <div ref={sectionRef}>
        <div className="projects-header mb-24 md:mb-32 text-center md:text-left border-b border-white/10 pb-12">
          <span className="text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Featured <span className="text-white/40">Projects</span>
          </h2>
        </div>

        {/* Featured Projects - Large Blocks */}
        <div className="space-y-32 md:space-y-48">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                ref={(el) => {
                  featuredRefs.current[index] = el;
                }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                {/* Image Block */}
                <div className="project-image w-full lg:w-3/5 group relative rounded-3xl overflow-hidden aspect-video lg:aspect-[4/3] bg-white/5 border border-white/10">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Clickable Overlay */}
                  <a 
                    href={project.liveUrl || project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    onMouseEnter={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                    aria-label={`View ${project.title}`}
                  />
                </div>

                {/* Content Block */}
                <div className="project-content w-full lg:w-2/5 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-[#a855f7] font-mono text-lg md:text-xl font-bold mb-4 block">
                      PROJECT 0{index + 1}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-md text-xs font-mono bg-white/5 text-white/70 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-white font-medium hover:text-[#a855f7] transition-colors"
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="uppercase tracking-wider text-sm">View Project</span>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#a855f7] transition-colors">
                          <ExternalLink size={16} />
                        </div>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-white/60 font-medium hover:text-white transition-colors"
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="uppercase tracking-wider text-sm">GitHub</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
                          <GitBranch size={16} />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Remaining Projects - Grid */}
        {remainingProjects.length > 0 && (
          <div className="mt-32 md:mt-48">
            <div className="remaining-header mb-16 text-center md:text-left border-b border-white/10 pb-8">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                See All <span className="text-white/40">Work</span>
              </h3>
            </div>

            <div className="remaining-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingProjects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    gridRefs.current[index] = el;
                  }}
                  className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="mb-6 relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-white/50 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-white/30 border border-white/5">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-[#a855f7] transition-colors"
                          onMouseEnter={() => setCursorType('pointer')}
                          onMouseLeave={() => setCursorType('default')}
                          aria-label={`View Live ${project.title}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                          onMouseEnter={() => setCursorType('pointer')}
                          onMouseLeave={() => setCursorType('default')}
                          aria-label={`View GitHub ${project.title}`}
                        >
                          <GitBranch size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Clickable Overlay */}
                  <a 
                    href={project.liveUrl || project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-[5]"
                    onMouseEnter={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                    aria-label={`View ${project.title}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
