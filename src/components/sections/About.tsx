'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(target.replace(/\D/g, ''));

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = Math.ceil(numericValue / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  const displaySuffix = target.replace(/[0-9]/g, '');

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-accent tabular-nums">
      {count}{displaySuffix}
    </span>
  );
}

export const About = () => {
  const { setCursorType } = useCursorStore();

  return (
    <Section id="about" className="relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Text Content */}
        <div className="space-y-8">
          <Reveal variant="fadeUp">
            <span className="section-label">About Me</span>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.1}>
            <Typography variant="title" as="h2" className="text-4xl md:text-5xl">
              Bridging <span className="text-accent">Intelligence</span><br />
              & Aesthetics
            </Typography>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.2}>
            <Typography className="text-text-secondary text-lg leading-relaxed">
              {personalInfo.about.long}
            </Typography>
          </Reveal>

          {/* Achievements */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div className="space-y-3 pt-4">
              {personalInfo.about.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                  <Typography className="text-text-secondary text-sm">{achievement}</Typography>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: Stats + Photo Card */}
        <div className="space-y-8">
          {/* Photo card */}
          <Reveal variant="scaleIn" delay={0.2}>
            <div 
              className="glass-card-hover rounded-3xl p-1 relative overflow-hidden group"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10 rounded-2xl aspect-[4/3] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-accent">PK</span>
                  </div>
                  <Typography className="text-text-muted text-sm">Drop your photo at<br /><code className="text-accent/60 text-xs">/public/profile.jpg</code></Typography>
                </div>
              </div>
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.1) inset' }} />
            </div>
          </Reveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {personalInfo.about.stats.map((stat, i) => (
              <Reveal key={stat.label} variant="fadeUp" delay={0.3 + i * 0.1}>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <AnimatedCounter target={stat.value} />
                  <Typography className="text-text-muted text-xs mt-2 uppercase tracking-widest font-medium">
                    {stat.label}
                  </Typography>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
