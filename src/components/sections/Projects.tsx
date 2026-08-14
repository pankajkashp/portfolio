'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { projects } from '@/data/projects';
import { useCursorStore } from '@/store/useCursorStore';
import { ExternalLink, GitBranch, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger when projects re-render
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // 1. Header Entrance
      gsap.fromTo(
        ['.projects-label', '.projects-title', '.projects-subtitle'],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // 2. Project Scroll Animations
      const projectElements = gsap.utils.toArray('.project-item');
      
      projectElements.forEach((el: any, index) => {
        const number = el.querySelector('.project-number');
        const image = el.querySelector('.project-image');
        const title = el.querySelector('.project-title');
        const desc = el.querySelector('.project-desc');
        const tags = el.querySelectorAll('.project-tag');
        const links = el.querySelector('.project-links');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        });

        // Left Side Animation Sequence
        if (image) {
          tl.fromTo(image, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0);
        }
        if (tags.length > 0) {
          tl.fromTo(tags, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.4);
        }

        // Right Side Animation Sequence
        if (number) {
          tl.fromTo(number, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.2);
        }
        if (title) {
          tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.4);
        }
        if (desc) {
          tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.6);
        }
        if (links) {
          tl.fromTo(links, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.8);
        }
      });
      
      // 3. Remaining Projects Entrance
      gsap.fromTo(
        '.more-work-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.more-work-header',
            start: 'top 90%',
          },
        }
      );

      // 4. Remaining Grid Animation
      const gridItems = gsap.utils.toArray('.remaining-item');
      if (gridItems.length > 0) {
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.more-work-grid',
              start: 'top 85%',
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Run once on mount

  return (
    <Section id="projects" className="relative bg-[#06060a]">
      <div ref={sectionRef} className="max-w-[1550px] w-full px-5 md:px-10 xl:px-16 mx-auto">
        
        {/* HEADER */}
        <div className="mb-24 md:mb-40">
          <span className="projects-label text-[#a855f7] font-mono text-sm md:text-base tracking-[0.2em] uppercase mb-6 md:mb-8 block">
            Selected Works
          </span>
          <h2 className="projects-title text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-white mb-8 md:mb-10 leading-[1.1]">
            Things I've Built
          </h2>
          <p className="projects-subtitle text-xl md:text-3xl text-white/60 max-w-4xl leading-relaxed">
            A collection of web experiences, applications, and experiments I've built while learning, exploring, and solving real problems.
          </p>
        </div>

        {/* FEATURED PROJECTS SHOWCASE */}
        <div ref={containerRef} className="space-y-32 md:space-y-48">
          {projects.slice(0, 3).map((project, index) => {
            return (
              <div
                key={project.id}
                className="project-item group relative flex flex-col lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] gap-8 lg:gap-[clamp(40px,5vw,100px)] items-start"
              >
                {/* MOBILE ORDERING (Uses CSS Grid or Flex order) */}
                
                {/* RIGHT COLUMN ON DESKTOP (Top on Mobile) - Meta, Title, Desc, Links */}
                <div className="order-1 lg:order-2 flex flex-col justify-start">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="project-number text-5xl md:text-6xl font-black text-white/10 tracking-tighter">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {project.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 uppercase tracking-widest">
                        Featured
                      </span>
                    )}
                    <span className="ml-auto text-white/40 font-mono text-sm">
                      {project.completionDate.split('-')[0]}
                    </span>
                  </div>

                  <h3 className="project-title text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight group-hover:text-[#a855f7] transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="project-desc text-white/60 text-lg leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* LINKS */}
                  <div className="project-links flex items-center gap-8 mt-8 pt-6 border-t border-white/10">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-3 text-white font-medium hover:text-[#a855f7] transition-colors"
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="uppercase tracking-widest text-sm">Live Demo</span>
                        <ExternalLink size={16} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    ) : (
                      <a
                        href={project.githubUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-3 text-white font-medium hover:text-[#a855f7] transition-colors"
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="uppercase tracking-widest text-sm">View Preview</span>
                        <ExternalLink size={16} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-3 text-white/60 font-medium hover:text-white transition-colors"
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <span className="uppercase tracking-widest text-sm">GitHub</span>
                        <GitBranch size={16} className="transition-transform duration-300 group-hover/link:-translate-y-1" />
                      </a>
                    )}
                  </div>
                </div>

                {/* LEFT COLUMN ON DESKTOP (Bottom on Mobile) - Image, Tech */}
                <div className="order-2 lg:order-1 flex flex-col gap-8 lg:gap-10 w-full">
                  {/* IMAGE */}
                  <div className="project-image relative w-full aspect-video md:aspect-[16/10]">
                    <div className="absolute inset-0 bg-[#a855f7]/5 blur-3xl rounded-full scale-90 -z-10 transition-opacity duration-700 group-hover:bg-[#a855f7]/15" />
                    <div className="relative w-full h-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        unoptimized={true}
                        className="object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                      />
                    </div>
                    <a 
                      href={project.liveUrl || project.githubUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-30"
                      onMouseEnter={() => setCursorType('pointer')}
                      onMouseLeave={() => setCursorType('default')}
                      aria-label={`View ${project.title}`}
                    />
                  </div>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="project-tag px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-mono bg-white/5 text-white/70 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* MORE WORK GRID */}
        {projects.length > 3 && (
          <div className="mt-40 pt-24 border-t border-white/10">
            <div className="more-work-header mb-16 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                More Work
              </h3>
              <p className="text-xl text-white/50">
                A few more things I've built.
              </p>
            </div>

            <div className="more-work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(3).map((project, index) => (
                <div
                  key={project.id}
                  className="remaining-item group relative flex flex-col p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-[#111]">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      unoptimized={true}
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  
                  <div className="mb-6 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-2xl font-bold text-white">
                        {project.title}
                      </h4>
                      <span className="text-white/40 text-xs font-mono px-2 py-1 bg-white/5 rounded-md border border-white/5">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-white/50 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-white/30 border border-white/5">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <a
                      href={project.liveUrl || project.githubUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-white/80 font-medium hover:text-white transition-colors"
                      onMouseEnter={() => setCursorType('pointer')}
                      onMouseLeave={() => setCursorType('default')}
                    >
                      <span className="text-sm">View Project</span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                  
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
              ))}
            </div>
          </div>
        )}


      </div>
    </Section>
  );
};
