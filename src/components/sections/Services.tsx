'use client';

import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { useCursorStore } from '@/store/useCursorStore';

import { services } from '@/data/services';
import * as Icons from 'lucide-react';

export const Services = () => {
  const { setCursorType } = useCursorStore();
  const iconMap = Icons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>;

  return (
    <Section id="services" className="bg-background-secondary/30">
      <div className="mb-20">
        <Reveal variant="fadeUp">
          <Typography variant="caption" className="text-accent mb-4 block tracking-[0.2em]">Our Capabilities</Typography>
          <Typography variant="title" className="text-4xl md:text-6xl text-gradient">
            INTELLIGENCE <br /> <span className="text-gradient-accent text-glow">MEETS AESTHETICS</span>
          </Typography>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Icons.HelpCircle;
          return (
            <Reveal key={service.title} variant="fadeUp" delay={index * 0.1}>
              <div 
                onMouseEnter={() => setCursorType('hover')}
                onMouseLeave={() => setCursorType('default')}
                className="glass-card-hover animated-border p-8 rounded-2xl h-full flex flex-col group hover:bg-white/[0.05] transition-all duration-500 cursor-none"
              >
                <div className="mb-8 w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-accent/20 transition-colors duration-500">
                  <Icon size={24} color={service.color} />
                </div>
                <Typography variant="subtitle" className="mb-4 text-white group-hover:text-accent transition-colors">
                  {service.title}
                </Typography>
                <Typography variant="body" className="text-sm text-text-muted leading-relaxed">
                  {service.description}
                </Typography>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
};
