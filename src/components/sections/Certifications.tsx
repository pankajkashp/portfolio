'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { certifications } from '@/data/certifications';
import { useCursorStore } from '@/store/useCursorStore';
import { ExternalLink, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Certifications = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-header',
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
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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

  if (!certifications || certifications.length === 0) return null;

  return (
    <Section id="certifications" className="relative">
      <div ref={sectionRef}>
        <div className="cert-header mb-16 md:mb-24 text-center">
          <span className="text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-4 block">
            Achievements
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Licenses & <span className="text-white/40">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-500"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#a855f7]/10 flex items-center justify-center mb-6 text-[#a855f7] group-hover:scale-110 group-hover:bg-[#a855f7] group-hover:text-white transition-all duration-500">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-[#a855f7] font-medium text-sm mb-4">
                  {cert.issuer} • {cert.year}
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {cert.description}
                </p>
              </div>

              {(cert.verificationUrl || cert.fileUrl) && (
                <a
                  href={cert.verificationUrl || cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mt-auto w-max"
                >
                  <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white transition-colors">
                    View Credential
                  </span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
