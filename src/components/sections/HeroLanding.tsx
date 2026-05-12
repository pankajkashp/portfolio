'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

import { useDashboardStore } from '@/store/useDashboardStore';

export const HeroLanding = () => {
  const { setCursorType } = useCursorStore();
  const { setIsDashboardOpen, setActiveModule } = useDashboardStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    setActiveModule(null);
    setIsDashboardOpen(true);
    window.location.hash = '';
  };

  // Parallax for the profile image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const photoX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const photoY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

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
      className="relative h-screen overflow-hidden flex items-center justify-center bg-[#06060a]"
    >
      {/* ─── BACKGROUND PORTRAIT (Seamless Blending) ─── */}
      <div className="absolute inset-0 z-10 select-none pointer-events-none flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-end pr-[5%]"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: photoX, y: photoY }}
        >
          {/* Intensified Multi-layered Cinematic Glow Aura */}
          <div className="absolute top-[35%] right-[-10%] w-[800px] h-[800px] bg-[#ff6b00]/20 blur-[200px] rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-[30%] right-[0%] w-[500px] h-[500px] bg-[#ff6b00]/30 blur-[150px] rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] bg-white/10 blur-[90px] rounded-full opacity-30" />

          <img
            src="/pankaj.png"
            alt={personalInfo.name}
            className="h-[90%] w-auto object-contain object-bottom brightness-[0.95] grayscale-[0.05] contrast-[1.05]"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255,107,0,0.4)) drop-shadow(0 0 40px rgba(255,107,0,0.2))'
            }}
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
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tight text-white">
                Hey, I'm Pankaj <br />
                <span className="text-[#ff6b00] text-5xl">Web Developer
                </span>
                <span className="text-white text-5xl"> & AI Enthusiast.</span>
              </h1>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.8}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-[#ff6b00]" />
                <p className="text-base md:text-xl text-white/40 leading-relaxed font-light italic">
                  {personalInfo.hero.subtitle}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="fadeUp" delay={1.2}>
            <div className="flex flex-col sm:flex-row items-center gap-5 mt-8">
              {/* Left Column: Explore Button + System Status */}
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={handleExplore}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className="group relative flex items-center justify-center shrink-0"
                >
                  {/* Holographic Ring Decor */}
                  <div className="absolute inset-0 -m-4 rounded-full border border-[#ff6b00]/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-0 -m-6 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />

                  <div className="relative h-16 px-12 bg-[#ff6b00] text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all duration-500 group-hover:scale-105 active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap">
                    {/* Glitch Effect Layers */}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 text-lg">Explore My Work</span>
                    <Send size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Outer Holographic Glow */}
                  <div className="absolute -inset-1 bg-[#ff6b00] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                </button>

                {/* System Status (Now Below) */}
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] animate-pulse" />
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">System</span>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#ff6b00] font-black animate-pulse">Ready</span>
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
                className="flex items-center gap-4 text-[11px] font-black text-white/80 hover:text-[#ff6b00] transition-all group whitespace-nowrap mb-6"
              >
                <span className="uppercase tracking-[0.3em]">Download Resume</span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ff6b00] group-hover:text-black transition-all">
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
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>
    </section>
  );
};

