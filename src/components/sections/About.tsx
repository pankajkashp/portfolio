'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Eyebrow text reveal
      gsap.fromTo(
        '.about-eyebrow',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-eyebrow',
            start: 'top 85%',
          },
        }
      );

      // 2. Large heading word reveal
      const headingWords = gsap.utils.toArray('.about-heading span');
      gsap.fromTo(
        headingWords,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 85%',
          },
        }
      );

      // 3. Paragraph fade + upward movement
      gsap.fromTo(
        '.about-paragraph',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-paragraphs',
            start: 'top 80%',
          },
        }
      );

      // 4. Image reveal
      gsap.fromTo(
        '.about-image-container',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-image-container',
            start: 'top 80%',
          },
        }
      );

      // 5. Floating information cards (reveal then float)
      const floatCards = gsap.utils.toArray('.float-card') as HTMLElement[];
      gsap.fromTo(
        floatCards,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.about-image-container',
            start: 'top 75%',
          },
          onComplete: () => {
            // Apply continuous floating animation after reveal
            floatCards.forEach((card, i) => {
              gsap.to(card, {
                y: i % 2 === 0 ? -10 : 10,
                duration: 2 + i * 0.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
              });
            });
          }
        }
      );

      // Details block reveal
      gsap.fromTo(
        '.about-detail-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-details',
            start: 'top 85%',
          },
        }
      );

      // 6. Journey timeline stagger animation
      gsap.fromTo(
        '.journey-step',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.journey-timeline',
            start: 'top 80%',
          },
        }
      );

      // Timeline connector line
      gsap.fromTo(
        '.journey-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.journey-timeline',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split heading into words for animation
  const headingText = "I don't just build websites. I build experiences people remember.";
  const headingWords = headingText.split(' ').map((word, i) => (
    <span key={i} className="inline-block mr-[0.3em]">
      {word}
    </span>
  ));

  return (
    <Section id="about" className="relative bg-[#06060a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        
        {/* TOP: Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24 md:mb-32">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="about-eyebrow text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-6 block">
              About Me
            </span>
            
            <h2 className="about-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-10 leading-[1.1]">
              {headingWords}
            </h2>
            
            <div className="about-paragraphs space-y-6 text-white/70 text-lg leading-relaxed">
              <p className="about-paragraph">
                I am a Computer Science student who believes that the best way to learn is by doing. Rather than just studying theory, I spend my time actively developing my skills by building real, functional projects.
              </p>
              <p className="about-paragraph">
                I enjoy taking an idea from concept to reality—designing a clean interface, developing robust functionality, and adding thoughtful interactions to make the final product feel polished and professional. It&apos;s the micro-interactions, like a smooth GSAP reveal or a responsive UI shift, that transform a basic site into an experience.
              </p>
              <p className="about-paragraph">
                My technical journey is driven by curiosity and problem-solving. I am continuously exploring modern frontend tools, full-stack frameworks, and interactive web design to build things that are not just usable, but memorable.
              </p>
            </div>
          </div>

          {/* Right Side: Visual & Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px]">
            {/* Main Portrait Area */}
            <div 
              className="about-image-container relative w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Image 
                src="/profile.jpg" 
                alt={personalInfo.fullName} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                sizes="(max-width: 768px) 100vw, 400px" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Floating Information Cards */}
            <div className="float-card absolute top-[10%] left-[-10%] md:left-[-5%] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl z-10">
              <span className="text-white font-mono text-xs tracking-wider">CSE STUDENT</span>
            </div>
            <div className="float-card absolute top-[30%] right-[-10%] md:right-[-15%] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl z-10">
              <span className="text-[#a855f7] font-mono text-xs tracking-wider">WEB DEVELOPER</span>
            </div>
            <div className="float-card absolute bottom-[40%] left-[-15%] md:left-[-10%] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl z-10">
              <span className="text-[#61dafb] font-mono text-xs tracking-wider">REACT</span>
            </div>
            <div className="float-card absolute bottom-[15%] right-[-5%] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl z-10">
              <span className="text-[#88ce02] font-mono text-xs tracking-wider">GSAP</span>
            </div>
            <div className="float-card absolute top-[-5%] right-[20%] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl z-10">
              <span className="text-white/80 font-mono text-xs tracking-wider">2027 GRADUATE</span>
            </div>
          </div>
        </div>

        {/* MIDDLE: Personal Details Area */}
        <div className="about-details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 rounded-3xl bg-white/5 border border-white/10 mb-32">
          <div className="about-detail-item">
            <h4 className="text-white font-bold mb-3">Currently</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Building modern web experiences and strengthening my frontend + full-stack skills.
            </p>
          </div>
          <div className="about-detail-item">
            <h4 className="text-white font-bold mb-3">Focus</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              React · JavaScript · GSAP · Node.js · MongoDB
            </p>
          </div>
          <div className="about-detail-item">
            <h4 className="text-white font-bold mb-3">Education</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              B.Tech — Computer Science & Engineering
            </p>
          </div>
          <div className="about-detail-item">
            <h4 className="text-white font-bold mb-3">Goal</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Become a strong professional web developer by continuously building and solving real problems.
            </p>
          </div>
        </div>

        {/* BOTTOM: Developer Journey Timeline */}
        <div className="journey-timeline relative">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-white/50">The process of turning theory into reality.</p>
          </div>

          <div className="relative">
            {/* Background Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-white/10">
              <div className="journey-line h-full bg-gradient-to-r from-[#a855f7] to-[#61dafb] origin-left" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="journey-step relative md:text-center">
                <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#06060a] border-2 border-[#a855f7] z-20" />
                <div className="md:pt-16">
                  <span className="text-[#a855f7] font-mono text-sm tracking-widest block mb-2">01</span>
                  <h4 className="text-xl font-bold text-white mb-3">LEARN</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Building strong fundamentals in programming and web development.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="journey-step relative md:text-center">
                <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#06060a] border-2 border-[#a855f7] z-20" />
                <div className="md:pt-16">
                  <span className="text-[#a855f7] font-mono text-sm tracking-widest block mb-2">02</span>
                  <h4 className="text-xl font-bold text-white mb-3">BUILD</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Creating real projects instead of stopping at tutorials.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="journey-step relative md:text-center">
                <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#06060a] border-2 border-[#a855f7] z-20" />
                <div className="md:pt-16">
                  <span className="text-[#a855f7] font-mono text-sm tracking-widest block mb-2">03</span>
                  <h4 className="text-xl font-bold text-white mb-3">EXPLORE</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Experimenting with React, GSAP, backend technologies and modern UI.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="journey-step relative md:text-center">
                <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#06060a] border-2 border-[#a855f7] z-20" />
                <div className="md:pt-16">
                  <span className="text-[#a855f7] font-mono text-sm tracking-widest block mb-2">04</span>
                  <h4 className="text-xl font-bold text-white mb-3">GROW</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Preparing to turn these skills into professional development work.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </Section>
  );
};
