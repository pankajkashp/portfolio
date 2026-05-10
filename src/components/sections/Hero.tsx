'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Reveal } from '@/components/animations/Reveal';
import { Magnetic } from '@/components/animations/Magnetic';
import { useCursorStore } from '@/store/useCursorStore';
import { personalInfo } from '@/data/personal';
import { Mail, Quote, ArrowDown } from 'lucide-react';
import { Scene } from '@/components/3d/Scene';
import { AvatarSystem } from '@/components/3d/AvatarSystem';

export const Hero = () => {
  const { setCursorType } = useCursorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const photoX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const photoY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  const ringRotate = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Section background glows */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[180px] -z-10 pointer-events-none"
        style={{ background: 'rgba(var(--accent-rgb), 0.1)', x: photoX, y: photoY }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-24 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* ─── LEFT: Content ─── */}
          <div className="flex-1 w-full lg:w-1/2 z-10">
            <div className="space-y-7">
              {/* Greeting */}
              <Reveal variant="fadeUp" delay={0.3}>
                <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Hey, I am <span className="font-bold" style={{ color: 'var(--accent)' }}>{personalInfo.fullName}</span>
                </p>
              </Reveal>

              {/* Title */}
              <Reveal variant="fadeUp" delay={0.4}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.95] tracking-[-0.04em] text-gradient">
                  {personalInfo.hero.title.split(' ').slice(0, 1).join(' ')} <br />
                  <span className="text-gradient-accent text-glow">
                    {personalInfo.hero.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal variant="fadeUp" delay={0.5}>
                <p className="max-w-lg text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {personalInfo.about.short}
                </p>
              </Reveal>

              {/* Buttons */}
              <Reveal variant="fadeUp" delay={0.6}>
                <div className="flex items-center gap-4 pt-2">
                  <Magnetic strength={0.3}>
                    <a href="#projects" onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')} className="btn-primary">
                      {personalInfo.hero.ctaText}
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.3}>
                    <a href={`mailto:${personalInfo.email}`} onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')} className="w-12 h-12 glass-card rounded-full flex items-center justify-center">
                      <Mail size={18} />
                    </a>
                  </Magnetic>
                </div>
              </Reveal>

              {/* Divider */}
              <div className="w-full h-px" style={{ background: 'var(--glass-border)' }} />

              {/* Testimonial */}
              <Reveal variant="blurReveal" delay={0.8}>
                <div className="glass-card p-5 md:p-6 rounded-2xl max-w-sm">
                  <Quote style={{ color: 'var(--accent)' }} className="mb-3" size={18} />
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {personalInfo.testimonial.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden" style={{ border: '1px solid var(--glass-border)' }}>
                      <img src={personalInfo.testimonial.avatar} alt={personalInfo.testimonial.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-white leading-none mb-0.5">{personalInfo.testimonial.author}</p>
                      <p className="text-[10px] leading-none" style={{ color: 'var(--text-muted)' }}>{personalInfo.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ─── RIGHT: Cinematic Photo ─── */}
          <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center relative">
            <Reveal variant="scaleIn" delay={0.5}>
              <motion.div className="relative" style={{ x: photoX, y: photoY }}>
                
                {/* Orbiting Ring */}
                <motion.div
                  className="absolute -inset-8 rounded-full pointer-events-none"
                  style={{
                    border: '1px solid rgba(var(--accent-rgb), 0.15)',
                    rotateZ: ringRotate,
                    animation: 'orbit 20s linear infinite',
                  }}
                >
                  <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                </motion.div>
                
                {/* Second Ring */}
                <div className="absolute -inset-14 rounded-full pointer-events-none" style={{ border: '1px solid rgba(var(--accent-rgb), 0.06)', animation: 'orbit 30s linear infinite reverse' }}>
                  <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-secondary)' }} />
                </div>

                {/* Glow behind */}
                <div className="absolute -inset-6 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.12)', animation: 'breathe 6s ease-in-out infinite' }} />

                {/* 3D Avatar System */}
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px]">
                  <Scene>
                    <AvatarSystem />
                  </Scene>
                </div>

                {/* Floating dots */}
                <div className="absolute -top-3 -right-3 w-3 h-3 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)', animation: 'breathe 3s ease-in-out infinite' }} />
                <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full" style={{ background: 'var(--accent-secondary)', animation: 'breathe 4s ease-in-out infinite 1s' }} />
                <div className="absolute top-1/3 -left-4 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', opacity: 0.6, animation: 'float 5s ease-in-out infinite' }} />
              </motion.div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Scroll</span>
          <ArrowDown size={14} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </div>
    </section>
  );
};
