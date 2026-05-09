'use client';

import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { Typography } from "@/components/ui/Typography";
import { useCursorStore } from "@/store/useCursorStore";

export default function Home() {
  const { setCursorType } = useCursorStore();
  
  return (
    <main className="relative min-h-screen">
      <Hero />
      <Services />

      {/* Featured Section Skeleton */}
      <Section className="bg-background-secondary/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Reveal variant="fadeUp">
              <Typography variant="title">
                REDEFINING <br /> THE POSSIBLE
              </Typography>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.2}>
              <Typography>
                From neural architectures to cinematic interfaces, we push the boundaries of what's achievable with AI and modern web technology.
              </Typography>
            </Reveal>
          </div>
          <div className="aspect-video glass-card rounded-2xl flex items-center justify-center"
               onMouseEnter={() => setCursorType('hover')}
               onMouseLeave={() => setCursorType('default')}>
            <Typography variant="caption">Project Preview Coming Soon</Typography>
          </div>
        </div>
      </Section>
    </main>
  );
}
