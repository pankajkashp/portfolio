'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { skills } from '@/data/skills';
import { useCursorStore } from '@/store/useCursorStore';
import { Code2, Database, BrainCircuit, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getCategoryIcon = (category: string) => {
  if (category.includes('Frontend')) return <Code2 className="w-5 h-5 text-[#a855f7]" />;
  if (category.includes('Backend')) return <Database className="w-5 h-5 text-[#a855f7]" />;
  if (category.includes('AI/ML')) return <BrainCircuit className="w-5 h-5 text-[#a855f7]" />;
  return <Wrench className="w-5 h-5 text-[#a855f7]" />;
};

export const Skills = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [...new Set(skills.map((s) => s.category))];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate category headers
      gsap.fromTo(
        '.skill-category-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate skill cards with stagger
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="skills" className="relative" containerClassName="z-10">
      <div ref={sectionRef}>
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Technical <span className="text-[#a855f7]">Arsenal</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and intelligent web applications.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <div className="skill-category-header flex items-center gap-3 border-b border-white/10 pb-4">
                {getCategoryIcon(category)}
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {category}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, i) => {
                    const globalIndex = skills.findIndex(s => s.name === skill.name);
                    return (
                      <div
                        key={skill.name}
                        ref={(el) => {
                          cardsRef.current[globalIndex] = el;
                        }}
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                        className="group relative flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#a855f7]/50 transition-all duration-300 cursor-none"
                      >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <span className="relative z-10 font-medium text-sm text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
