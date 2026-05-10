'use client';

import { Typography } from '@/components/ui/Typography';
import { useCursorStore } from '@/store/useCursorStore';
import { socials } from '@/data/socials';
import { personalInfo } from '@/data/personal';

export const Footer = () => {
  const { setCursorType } = useCursorStore();

  return (
    <footer className="relative bg-background border-t border-white/[0.04] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <Typography variant="display" className="text-4xl md:text-6xl leading-tight mb-8">
              LET&apos;S CREATE <br />
              <span className="text-accent">SOMETHING</span><br />
              REMARKABLE
            </Typography>
            <a 
              href={`mailto:${personalInfo.email}`}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="text-xl md:text-2xl font-bold tracking-tight hover:text-accent transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-accent"
            >
              {personalInfo.email}
            </a>
          </div>

          <div className="flex flex-col md:items-end justify-between gap-8">
            <div className="flex gap-6">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener"
                  className="text-text-muted hover:text-accent transition-colors uppercase text-xs tracking-widest font-bold"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  {social.name}
                </a>
              ))}
            </div>
            
            <div className="text-left md:text-right">
              <Typography className="text-text-muted text-xs tracking-widest uppercase mb-1">Local Time</Typography>
              <Typography className="font-mono text-lg">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} IST
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.04] gap-4">
          <Typography className="text-text-muted text-xs tracking-widest">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Crafted with precision.
          </Typography>
          <Typography className="text-text-muted text-xs">
            Built with Next.js, React Three Fiber & Framer Motion
          </Typography>
        </div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-accent/30 blur-sm" />
    </footer>
  );
};
