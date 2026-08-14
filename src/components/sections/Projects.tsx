'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { projects, projectCategories } from '@/data/projects';
import { useCursorStore } from '@/store/useCursorStore';
import { ExternalLink, GitBranch, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category.includes(activeCategory)
  );

  useEffect(() => {
    // Refresh ScrollTrigger when category changes and projects re-render
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // 1. Header & Filter Entrance
      gsap.fromTo(
        ['.projects-label', '.projects-title', '.projects-subtitle', '.projects-filter'],
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

        // Sequence: Number -> Image Reveal -> Title -> Description -> Tech Stack
        if (number) {
          tl.fromTo(number, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' });
        }
        
        if (image) {
          tl.fromTo(
            image,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', scale: 0.95 },
            { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', scale: 1, duration: 1.2, ease: 'power3.inOut' },
            '-=0.4'
          );
        }

        if (title) {
          tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6');
        }

        if (desc) {
          tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
        }

        if (tags.length > 0) {
          tl.fromTo(tags, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '-=0.4');
        }

        if (links) {
          tl.fromTo(links, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
        }
      });
      
      // 3. CTA & Remaining Projects Entrance
      gsap.fromTo(
        ['.more-work-header', '.projects-cta'],
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
  }, [activeCategory]); // Re-run when category changes

  return (
    <Section id="projects" className="relative bg-[#06060a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20 md:mb-32">
          <span className="projects-label text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-6 block">
            Selected Works
          </span>
          <h2 className="projects-title text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
            Things I've Built
          </h2>
          <p className="projects-subtitle text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed">
            A collection of web experiences, applications, and experiments I've built while learning, exploring, and solving real problems.
          </p>
          
          {/* CATEGORY FILTER */}
          <div className="projects-filter mt-16 flex flex-wrap gap-2 md:gap-4">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-mono tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED PROJECTS SHOWCASE */}
        <div ref={containerRef} className="space-y-32 md:space-y-48">
          {filteredProjects.slice(0, 3).map((project, index) => {
            const layoutType = index % 3;
            // 0: Image Left (lg:w-3/5), Info Right (lg:w-2/5)
            // 1: Info Left (lg:w-2/5), Image Right (lg:w-3/5)
            // 2: Full Width Image (w-full), Info Below (w-full)
            
            return (
              <div
                key={project.id}
                className="project-item flex flex-col group relative"
              >
                {/* Responsive Layout Wrapping */}
                <div className={`flex flex-col gap-12 lg:gap-20 ${
                  layoutType === 0 ? 'lg:flex-row' 
                  : layoutType === 1 ? 'lg:flex-row-reverse'
                  : 'lg:flex-col' // Full width layout
                }`}>
                  
                  {/* IMAGE BLOCK */}
                  <div className={`project-image relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 ${
                    layoutType === 2 ? 'w-full aspect-[21/9] md:aspect-[16/7]' : 'w-full lg:w-3/5 aspect-[4/3] md:aspect-[16/10]'
                  }`}>
                    {/* Fake Browser Window Header (Minimal) */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-20 backdrop-blur-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>

                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      unoptimized={true} // Bypassing next/image optimization for huge local screenshots in dev
                      className="object-cover object-top pt-10 transition-transform duration-1000 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-[#a855f7]/0 group-hover:bg-[#a855f7]/10 transition-colors duration-700 z-10 pointer-events-none" />

                    {/* Clickable Area */}
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

                  {/* INFO BLOCK */}
                  <div className={`flex flex-col justify-center ${
                    layoutType === 2 ? 'w-full lg:w-3/4 mx-auto' : 'w-full lg:w-2/5'
                  }`}>
                    
                    {/* Meta Row: Number & Featured */}
                    <div className="flex items-center gap-6 mb-8">
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

                    {/* Title & Desc */}
                    <div className="mb-10">
                      <h3 className="project-title text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight group-hover:text-[#a855f7] transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="project-desc text-white/60 text-lg leading-relaxed">
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-12">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="project-tag px-4 py-2 rounded-lg text-sm font-mono bg-white/5 text-white/70 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="project-links flex items-center gap-8 mt-auto pt-8 border-t border-white/10">
                      {project.liveUrl && (
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
                </div>
              </div>
            );
          })}
        </div>

        {/* MORE WORK GRID */}
        {filteredProjects.length > 3 && (
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
              {filteredProjects.slice(3).map((project, index) => (
                <div
                  key={project.id}
                  className="remaining-item group relative flex flex-col p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-white/5">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      unoptimized={true}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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

        {/* BOTTOM CTA */}
        <div className="projects-cta mt-40 py-24 text-center border-t border-white/10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Have an idea worth building?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-colors"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            Let's Talk <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </Section>
  );
};
