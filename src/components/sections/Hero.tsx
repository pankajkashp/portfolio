'use client';

import { Typography } from '@/components/ui/Typography';
import { Reveal } from '@/components/animations/Reveal';
import { Magnetic } from '@/components/animations/Magnetic';
import { useCursorStore } from '@/store/useCursorStore';
import { personalInfo } from '@/data/personal';
import { Mail, Quote } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  const { setCursorType } = useCursorStore();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[180px] -z-10 pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.12)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px] -z-10 pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.06)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* ─── Left: Content ─── */}
          <div className="flex-1 w-full lg:w-1/2 z-10">
            <div className="space-y-6">
              {/* Greeting */}
              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Hey, I am <span style={{ color: 'var(--accent)' }}>{personalInfo.fullName}</span>
                </p>
              </Reveal>

              {/* Main Title */}
              <Reveal variant="fadeUp" delay={0.3}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.0] tracking-tighter">
                  {personalInfo.hero.title.split(' ').slice(0, 1).join(' ')} <br />
                  <span style={{ color: 'var(--accent)' }}>{personalInfo.hero.title.split(' ').slice(1).join(' ')}</span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal variant="fadeUp" delay={0.4}>
                <p className="max-w-lg text-base md:text-lg leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                  {personalInfo.about.short}
                </p>
              </Reveal>

              {/* Buttons */}
              <Reveal variant="fadeUp" delay={0.5}>
                <div className="flex items-center gap-4 pt-2">
                  <Magnetic strength={0.3}>
                    <a
                      href="#projects"
                      onMouseEnter={() => setCursorType('pointer')}
                      onMouseLeave={() => setCursorType('default')}
                      className="btn-primary"
                    >
                      {personalInfo.hero.ctaText}
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.3}>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      onMouseEnter={() => setCursorType('pointer')}
                      onMouseLeave={() => setCursorType('default')}
                      className="w-11 h-11 glass-card rounded-full flex items-center justify-center"
                    >
                      <Mail size={18} />
                    </a>
                  </Magnetic>
                </div>
              </Reveal>

              {/* Divider */}
              <div className="w-full h-px my-4" style={{ background: 'var(--glass-border)' }} />

              {/* Testimonial */}
              <Reveal variant="blurReveal" delay={0.7}>
                <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl max-w-sm">
                  <Quote style={{ color: 'var(--accent)' }} className="mb-3" size={20} />
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {personalInfo.testimonial.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border" style={{ borderColor: 'var(--glass-border)' }}>
                      <img src={personalInfo.testimonial.avatar} alt={personalInfo.testimonial.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white leading-none mb-1">
                        {personalInfo.testimonial.author}
                      </p>
                      <p className="text-[11px] leading-none" style={{ color: 'var(--text-muted)' }}>
                        {personalInfo.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ─── Right: Profile Photo ─── */}
          <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center relative">
            <Reveal variant="scaleIn" delay={0.4}>
              <div className="relative">
                {/* Glow ring behind photo */}
                <div className="absolute -inset-4 rounded-full blur-2xl pointer-events-none" style={{ background: 'rgba(var(--accent-rgb), 0.15)' }} />
                
                {/* Accent ring */}
                <div 
                  className="absolute -inset-1 rounded-full pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, var(--accent), transparent 50%, var(--accent-secondary))`,
                    opacity: 0.5,
                  }}
                />

                {/* Photo container */}
                <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-2" style={{ borderColor: 'rgba(var(--accent-rgb), 0.3)' }}>
                  <Image
                    src="/profile.jpg"
                    alt={personalInfo.fullName}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 340px, 450px"
                  />
                </div>

                {/* Floating accent dots */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--accent-secondary)', animationDelay: '1s' }} />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
