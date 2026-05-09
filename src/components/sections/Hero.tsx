'use client';

import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Scene } from '@/components/3d/Scene';
import { HeroModel } from '@/components/3d/HeroModel';
import { Magnetic } from '@/components/animations/Magnetic';
import { useCursorStore } from '@/store/useCursorStore';
import { personalInfo } from '@/data/personal';
import { Mail, Quote } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  const { setCursorType } = useCursorStore();

  return (
    <Section className="min-h-screen flex flex-col lg:flex-row items-center pt-32 lg:pt-0 relative overflow-visible">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] -z-10" />

      {/* Left Side: Content */}
      <div className="flex-1 z-10 w-full lg:w-[55%]">
        <div className="space-y-6">
          <Reveal variant="fadeUp" delay={0.2}>
            <Typography className="text-xl font-medium text-text-secondary">
              Hey, I am <span className="text-accent">{personalInfo.fullName}</span>
            </Typography>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.3}>
            <Typography variant="display" className="text-6xl md:text-8xl font-bold leading-[1.0] tracking-tighter">
              {personalInfo.hero.title.split(' ').slice(0, 1).join(' ')} <br />
              <span className="text-accent">{personalInfo.hero.title.split(' ').slice(1).join(' ')}</span>
            </Typography>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.4}>
            <Typography className="max-w-xl text-text-secondary text-xl leading-relaxed font-light">
              {personalInfo.about.short}
            </Typography>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.5}>
            <div className="flex items-center gap-6 pt-6">
              <Magnetic strength={0.3}>
                <button 
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className="btn-primary"
                >
                  {personalInfo.hero.ctaText}
                </button>
              </Magnetic>

              <Magnetic strength={0.3}>
                <button 
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className="px-8 py-3 glass-card rounded-full text-sm font-bold uppercase tracking-widest"
                >
                  {personalInfo.hero.secondaryCtaText}
                </button>
              </Magnetic>
            </div>
          </Reveal>

          {/* Testimonial Card */}
          <div className="pt-20">
            <Reveal variant="blurReveal" delay={0.8}>
              <div className="glass-card p-6 rounded-3xl max-w-sm relative">
                <Quote className="text-accent mb-4" size={24} />
                <Typography className="text-sm text-text-secondary mb-6 leading-relaxed">
                  {personalInfo.testimonial.text}
                </Typography>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img src={personalInfo.testimonial.avatar} alt={personalInfo.testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Typography className="text-[13px] font-bold text-white leading-none mb-1">
                      {personalInfo.testimonial.author}
                    </Typography>
                    <Typography className="text-[11px] text-text-muted leading-none">
                      {personalInfo.testimonial.role}
                    </Typography>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Right Side: 3D Scene */}
      <div className="flex-1 w-full lg:w-[45%] h-[600px] lg:h-[900px] relative">
        {/* Background Large Thunderbolt Shape (Simplified with 3D or CSS) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10" />
        
        <Scene className="h-full w-full">
          <HeroModel />
        </Scene>
      </div>
    </Section>
  );
};
