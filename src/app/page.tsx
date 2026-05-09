'use client';

import { Typography } from "@/components/ui/Typography";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { Scene } from "@/components/3d/Scene";
import { useCursorStore } from "@/store/useCursorStore";

export default function Home() {
  const { setCursorType } = useCursorStore();

  return (
    <main className="relative min-h-screen">
      {/* 3D Background */}
      <Scene>
        {/* We can add 3D elements here later */}
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b00" />
      </Scene>

      {/* Hero Section Skeleton */}
      <Section className="min-h-screen flex items-center justify-center pt-0 pb-0">
        <div className="flex flex-col items-center text-center space-y-8">
          <Reveal variant="blurReveal" delay={0.2}>
            <Typography variant="caption" className="text-accent animate-glow">
              Engineering the Intelligence of Tomorrow
            </Typography>
          </Reveal>
          
          <Reveal variant="fadeUp" delay={0.4}>
            <Typography variant="display" className="max-w-4xl text-gradient">
              CRAFTING <span className="text-accent">INTELLIGENT</span> DIGITAL ECOSYSTEMS
            </Typography>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.6}>
            <Typography variant="subtitle" className="max-w-2xl mx-auto">
              Senior AI Engineer specializing in high-performance architectures, 
              generative systems, and immersive creative development.
            </Typography>
          </Reveal>

          <Reveal variant="scaleIn" delay={0.8}>
            <button 
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 glass-card !bg-white !text-black"
            >
              EXPLORE PROJECTS
            </button>
          </Reveal>
        </div>
      </Section>

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
