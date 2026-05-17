'use client';

import Link from 'next/link';
import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import Image from 'next/image';

import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

export const HeroLanding = () => {
  const { setCursorType } = useCursorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { shouldEnableHeavyEffects } = usePerformanceProfile();

  // Parallax for the profile image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const photoX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const photoY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const enableParallax = shouldEnableHeavyEffects && !prefersReducedMotion;

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!enableParallax || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nextX = (e.clientX - rect.left) / rect.width - 0.5;
    const nextY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nextX);
    mouseY.set(nextY);
  };

  const resetParallax = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-[#06060a]"
    >
      {/* ─── BACKGROUND PORTRAIT (Seamless Blending) ─── */}
      <div className="absolute inset-0 z-10 select-none pointer-events-none flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-end pr-[5%]"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={enableParallax ? { x: photoX, y: photoY } : undefined}
        >
          <div className="absolute top-[38%] right-[-6%] w-[48vw] max-w-[760px] aspect-square rounded-full opacity-60 motion-heavy pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(124,58,237,0.08) 32%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-y-0 right-[4%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-40" />

          <Image
            src="/pankaj.png"
            alt={personalInfo.name}
            width={1200}
            height={1600}
            priority
            sizes="(max-width: 768px) 68vw, 30vw"
            className="h-[78%] max-h-[760px] w-auto object-contain object-bottom brightness-[0.98] grayscale-[0.02] contrast-[1.02] will-change-transform"
          />

          {/* Cinematic Blending - No hard edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06060a] via-transparent to-transparent z-20" />
        </motion.div>
      </div>

      {/* ─── MAIN CONTENT (80% Width) ─── */}
      <div className="w-[80%] h-full relative z-40 flex flex-col justify-center">

        {/* TOP: Stats (Aligned Top Left) */}
        <div className="absolute top-32 left-0 flex gap-20">
          {personalInfo.about.stats.slice(0, 2).map((stat, i) => (
            <Reveal key={i} variant="fadeUp" delay={1.4 + i * 0.1}>
              <div className="space-y-1 group">
                <div className="text-3xl md:text-5xl font-light text-white flex items-baseline">
                  <span className="text-white/20 mr-1">+</span>
                  {stat.value.replace('+', '')}
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium group-hover:text-white/60 transition-colors">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CENTER: Typography Heading */}
        <div className="space-y-12 max-w-2xl lg:max-w-3xl">
          <div className="space-y-6">
            <Reveal variant="fadeUp" delay={0.6}>
              <h1 className="text-5xl sm:text-4maxl md:text-8xl font-bold leading-[1.05] tracking-tight text-white">
                Hey, I&apos;m Pankaj <br />
                <span className="text-[#a855f7] text-3xl">Web Developer
                </span>
                <span className="text-white text-2xl"> & AI Enthusiast.</span>
              </h1>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.8}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-[#a855f7]" />
                <p className="text-base md:text-xl text-white/40 leading-relaxed font-light italic">
                  {personalInfo.about.short}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="fadeUp" delay={1.2}>
            <div className="flex flex-col sm:flex-row items-center gap-5 mt-8">
              {/* Left Column: Explore Button + System Status */}
              <div className="flex flex-col items-center gap-6">
                <Link
                  href="/contact"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className="group relative flex items-center justify-center shrink-0"
                >
                  {/* Lightweight ring decor */}
                  <div className="absolute inset-0 -m-4 rounded-full border border-[#a855f7]/20 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 -m-6 rounded-full border border-white/5 transition-transform duration-700 group-hover:scale-110" />

                  <div className="relative h-16 px-12 bg-[#a855f7] text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap">
                    <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 text-lg">Hire Me</span>
                    <Send size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.22),transparent_72%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Outer Holographic Glow */}
                  <div className="absolute -inset-1 bg-[#a855f7]/20 opacity-10 group-hover:opacity-20 transition-opacity rounded-full blur-xl motion-heavy" />
                </Link>

                {/* System Status (Now Below) */}
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">System</span>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#a855f7] font-black animate-pulse">Ready</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Resume Link */}
              <div className="" />

              <a
                href="/resume.pdf"
                download
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className="flex items-center gap-4 text-[11px] font-black text-white/80 hover:text-[#a855f7] transition-all group whitespace-nowrap mb-6"
              >
                <span className="uppercase tracking-[0.3em]">Download Resume</span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#a855f7] group-hover:text-black transition-all">
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </Reveal>
        </div>

        {/* BOTTOM: Scroll Indicator */}
        <div className="absolute bottom-12 left-0">
          <Reveal variant="fadeIn" delay={2}>
            <div className="flex items-center gap-4 group">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium">Scroll down</span>
              <div className="w-8 h-px bg-white/20 group-hover:w-12 transition-all duration-500 animate-pulse" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] motion-heavy">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>
    </section>
  );
};
