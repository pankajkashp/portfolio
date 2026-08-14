'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { education } from '@/data/education';

gsap.registerPlugin(ScrollTrigger);

export const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-header',
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

      gsap.fromTo(
        itemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!education || education.length === 0) return null;

  return (
    <Section id="education" className="relative bg-[#06060a]">
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <div className="edu-header mb-20 text-center">
          <span className="text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Education & <span className="text-white/40">Qualifications</span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 pb-8">
          {education.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {item.institution}
                </h3>
                <span className="text-white/40 font-mono text-sm shrink-0">
                  {item.year}
                </span>
              </div>
              
              <h4 className="text-[#a855f7] font-medium text-lg mb-4">
                {item.degree}
              </h4>
              
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
