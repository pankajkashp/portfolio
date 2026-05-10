'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { RoleRotator } from '@/components/ui/RoleRotator';
import { Scene } from '@/components/3d/Scene';
import { AvatarSystem } from '@/components/3d/AvatarSystem';
import { ArrowDown, Download, Mail } from 'lucide-react';

export const HeroLanding = () => {
  const { setCursorType } = useCursorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const glowX = useTransform(smoothX, [-0.5, 0.5], [-80, 80]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-80, 80]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden flex items-center"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{
            background: 'rgba(var(--accent-rgb), 0.08)',
            top: '10%',
            right: '10%',
            x: glowX,
            y: glowY,
          }}
        />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[180px] bottom-[10%] left-[5%]"
          style={{ background: 'rgba(var(--accent-rgb), 0.04)' }}
        />
        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          animation: 'grain 4s steps(6) infinite',
        }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

          {/* ─── LEFT: Text ─── */}
          <motion.div
            className="flex-1 w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>
                SYSTEM ONLINE — AVAILABLE FOR WORK
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.9] tracking-[-0.04em]">
              <span className="text-gradient">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span className="text-gradient-accent">{personalInfo.name.split(' ')[1]}</span>
            </h1>

            {/* Role rotator */}
            <RoleRotator />

            {/* Tagline */}
            <p className="max-w-md text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {personalInfo.about.short}
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#dashboard"
                className="btn-primary"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                EXPLORE DASHBOARD
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-ghost flex items-center gap-2"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                <Download size={14} />
                RESUME
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-ghost !p-3 !rounded-xl"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                <Mail size={16} />
              </a>
            </div>

            {/* Quick stats */}
            <motion.div
              className="flex gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {personalInfo.about.stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gradient-accent">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: 3D Avatar ─── */}
          <motion.div
            className="flex-1 w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px]">
              <Scene className="w-full h-full">
                <AvatarSystem />
              </Scene>
              {/* Glow ring behind avatar */}
              <div className="absolute inset-0 -z-10 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(var(--accent-rgb), 0.08)', animation: 'breathe 6s ease-in-out infinite' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#dashboard"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono" style={{ color: 'var(--text-muted)' }}>ENTER DASHBOARD</span>
        <ArrowDown size={14} style={{ color: 'var(--text-muted)' }} />
      </motion.a>
    </section>
  );
};
