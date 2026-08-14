'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { useCursorStore } from '@/store/useCursorStore';
import { 
  Atom, FileCode2, Zap, Wind, Triangle, Move, Layout, Layers,
  Server, Box, Database, Network, GitBranch, GitFork, PenTool, Lightbulb
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const frontendSkills = [
  { name: 'React', icon: Atom },
  { name: 'JavaScript', icon: FileCode2 },
  { name: 'GSAP', icon: Zap, emphasis: true },
  { name: 'Next.js', icon: Triangle },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Framer Motion', icon: Move },
  { name: 'HTML5', icon: Layout },
  { name: 'CSS3', icon: Layers },
];

const backendSkills = [
  { name: 'Node.js', icon: Server },
  { name: 'Express.js', icon: Box },
  { name: 'MongoDB', icon: Database },
  { name: 'SQL', icon: Database },
  { name: 'REST APIs', icon: Network },
];

const toolSkills = [
  { name: 'Git', icon: GitBranch },
  { name: 'GitHub', icon: GitFork },
  { name: 'Figma', icon: PenTool },
  { name: 'Vercel', icon: Triangle },
];

export const Skills = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step 1: Heading reveal
      gsap.fromTo(
        '.stack-heading',
        { y: 30, opacity: 0 },
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

      // Step 2 & 3: Frontend panel and items
      gsap.fromTo(
        '.panel-frontend',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.panel-frontend',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.item-frontend',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.panel-frontend',
            start: 'top 70%',
          },
        }
      );

      // Step 4: Backend & Tools panels
      gsap.fromTo(
        ['.panel-backend', '.panel-tools'],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.panel-backend',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        ['.item-backend', '.item-tools'],
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.panel-backend',
            start: 'top 70%',
          },
        }
      );



      // Section Ending
      gsap.fromTo(
        '.stack-ending',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stack-ending',
            start: 'top 90%',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderSkillItem = (skill: { name: string, icon: any, emphasis?: boolean }, className: string) => {
    const Icon = skill.icon;
    const isGSAP = skill.emphasis;
    
    return (
      <div 
        key={skill.name}
        className={`${className} group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300`}
        onMouseEnter={() => setCursorType('hover')}
        onMouseLeave={() => setCursorType('default')}
      >
        <div className={`p-2 rounded-lg bg-white/[0.05] group-hover:scale-110 transition-transform duration-300 ${isGSAP ? 'text-[#88ce02]' : 'text-white/70 group-hover:text-white'}`}>
          <Icon size={20} strokeWidth={isGSAP ? 2.5 : 2} />
        </div>
        <span className={`font-medium tracking-wide ${isGSAP ? 'text-white' : 'text-white/70 group-hover:text-white'} transition-colors duration-300`}>
          {skill.name}
        </span>
      </div>
    );
  };

  return (
    <Section id="skills" className="relative bg-[#06060a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="stack-heading mb-16 md:mb-24 text-center md:text-left">
          <span className="text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
            MY STACK
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-[1.2]">
            The tools I use to turn ideas into interactive, production-ready web experiences.
          </h2>
        </div>

        {/* Panels */}
        <div className="flex flex-col gap-6 mb-24">
          
          {/* FRONTEND PANEL (Full width on desktop) */}
          <div className="panel-frontend w-full flex flex-col p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10">
            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
              <span className="text-white/40 font-mono text-sm">01</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">FRONTEND</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 content-start">
              {frontendSkills.map(skill => renderSkillItem(skill, 'item-frontend'))}
            </div>
          </div>

          {/* BOTTOM ROW PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* BACKEND & DB */}
            <div className="panel-backend p-8 rounded-[2rem] bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <span className="text-white/40 font-mono text-sm">02</span>
                <h3 className="text-xl font-bold text-white tracking-wide">BACKEND & DB</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {backendSkills.map(skill => renderSkillItem(skill, 'item-backend'))}
              </div>
            </div>

            {/* TOOLS */}
            <div className="panel-tools p-8 rounded-[2rem] bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <span className="text-white/40 font-mono text-sm">03</span>
                <h3 className="text-xl font-bold text-white tracking-wide">TOOLS</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toolSkills.map(skill => renderSkillItem(skill, 'item-tools'))}
              </div>
            </div>

          </div>
        </div>

        {/* Section Ending */}
        <div className="stack-ending mt-32 text-center">
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            I learn by building — and every project adds another tool to my stack.
          </p>
        </div>

      </div>
    </Section>
  );
};
