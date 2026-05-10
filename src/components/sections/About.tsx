'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import Image from 'next/image';

function AnimatedCounter({ target }: { target: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(target.replace(/\D/g, ''));
  const displaySuffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = Math.ceil(numericValue / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) { setCount(numericValue); clearInterval(timer); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
      {count}{displaySuffix}
    </span>
  );
}

export const About = () => {
  const { setCursorType } = useCursorStore();

  return (
    <Section id="about" className="relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[150px] -z-10 pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.05)' }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left */}
        <div className="space-y-8">
          <Reveal variant="fadeUp"><span className="section-label">About Me</span></Reveal>

          <Reveal variant="fadeUp" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gradient">
              Bridging <span className="text-gradient-accent text-glow">Intelligence</span><br />& Aesthetics
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{personalInfo.about.long}</p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.3}>
            <div className="space-y-3 pt-2">
              {personalInfo.about.achievements.map((a, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 group-hover:scale-150 transition-transform" style={{ background: 'var(--accent)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right */}
        <div className="space-y-8">
          {/* Profile Image */}
          <Reveal variant="scaleIn" delay={0.2}>
            <div
              className="glass-card-hover animated-border rounded-3xl p-1.5 relative overflow-hidden group"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image src="/profile.jpg" alt={personalInfo.fullName} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                {/* Cinematic overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">{personalInfo.fullName}</p>
                  <p className="text-sm" style={{ color: 'var(--accent)' }}>{personalInfo.hero.subtitle}</p>
                </div>
              </div>
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(var(--accent-rgb), 0.08) inset' }} />
            </div>
          </Reveal>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {personalInfo.about.stats.map((stat, i) => (
              <Reveal key={stat.label} variant="fadeUp" delay={0.3 + i * 0.08}>
                <div className="glass-card-hover animated-border rounded-2xl p-6 text-center">
                  <AnimatedCounter target={stat.value} />
                  <p className="text-xs mt-2 uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
