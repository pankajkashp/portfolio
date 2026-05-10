'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { skills } from '@/data/skills';
import { useCursorStore } from '@/store/useCursorStore';

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <Typography className="text-sm font-medium text-white">{name}</Typography>
        <Typography className="text-xs text-text-muted font-mono">{level}%</Typography>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, var(--accent), var(--accent-secondary))` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
}

export const Skills = () => {
  const { setCursorType } = useCursorStore();

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <Section id="skills" className="relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[180px] -z-10" />

      <div className="mb-16">
        <Reveal variant="fadeUp">
          <span className="section-label">Technical Arsenal</span>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <Typography variant="title" as="h2" className="text-4xl md:text-5xl mt-4 text-gradient">
            Skills & <span className="text-gradient-accent text-glow">Technologies</span>
          </Typography>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, catIndex) => (
          <Reveal key={category} variant="fadeUp" delay={catIndex * 0.1}>
            <div 
              className="glass-card-hover animated-border rounded-2xl p-8 h-full"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Typography className="text-xs text-accent font-bold tracking-[0.2em] uppercase mb-8">
                {category}
              </Typography>
              <div className="space-y-6">
                {skills
                  .filter(s => s.category === category)
                  .map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.2 + i * 0.1}
                    />
                  ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
