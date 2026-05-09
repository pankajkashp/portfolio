'use client';

import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { experience } from '@/data/experience';
import { useCursorStore } from '@/store/useCursorStore';

export const Experience = () => {
  const { setCursorType } = useCursorStore();

  return (
    <Section id="experience" className="relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px] -z-10" />

      <div className="mb-16">
        <Reveal variant="fadeUp">
          <span className="section-label">Career Journey</span>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <Typography variant="title" as="h2" className="text-4xl md:text-5xl mt-4">
            Professional <span className="text-accent">Timeline</span>
          </Typography>
        </Reveal>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <Reveal key={exp.id} variant="fadeUp" delay={i * 0.15}>
              <div 
                className="relative pl-8 md:pl-20 group"
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 -translate-x-1/2 top-2 z-10">
                  <div className={`w-3 h-3 rounded-full border-2 ${exp.isCurrent ? 'bg-accent border-accent shadow-[0_0_15px_rgba(0,255,255,0.6)]' : 'bg-background border-white/20'}`} />
                </div>

                <div className="glass-card-hover rounded-2xl p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div>
                      <Typography className="text-white font-bold text-lg">{exp.position}</Typography>
                      <Typography className="text-accent text-sm">{exp.company}</Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      {exp.isCurrent && (
                        <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] text-accent font-bold tracking-widest uppercase">Current</span>
                      )}
                      <Typography className="text-text-muted text-xs font-mono">
                        {exp.startDate} — {exp.endDate}
                      </Typography>
                    </div>
                  </div>

                  <Typography className="text-text-secondary text-sm leading-relaxed mb-4">
                    {exp.description}
                  </Typography>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-text-muted font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};
