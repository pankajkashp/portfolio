'use client';

import { Typography } from '@/components/ui/Typography';
import { useCursorStore } from '@/store/useCursorStore';
import { motion } from 'framer-motion';
import { socials } from '@/data/socials';
import { personalInfo } from '@/data/personal';

export const Footer = () => {
  const { setCursorType } = useCursorStore();

  return (
    <footer className="relative bg-background border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <Typography variant="display" className="text-4xl md:text-6xl mb-8">
              READY TO <br /> <span className="text-accent">INTELLIGIZE?</span>
            </Typography>
            <Typography className="max-w-md mb-8">
              {personalInfo.about.short}
            </Typography>
            <a 
              href={`mailto:${personalInfo.email}`}
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              className="text-2xl md:text-4xl font-bold tracking-tighter hover:text-accent transition-colors underline underline-offset-8"
            >
              {personalInfo.email}
            </a>
          </div>

          <div className="flex flex-col md:items-end justify-between">
            <div className="flex gap-8 mb-12">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  className="text-text-muted hover:text-white transition-colors uppercase text-xs tracking-widest font-bold"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  {social.name}
                </a>
              ))}
            </div>
            
            <div className="text-left md:text-right">
              <Typography variant="caption" className="block mb-2">Local Time</Typography>
              <Typography className="font-mono text-xl">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} PST
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <Typography variant="caption" className="text-text-muted">
            &copy; {new Date().getFullYear()} AETHER ARCHITECTS. ALL RIGHTS RESERVED.
          </Typography>
          <div className="flex gap-6">
            <Typography variant="caption" className="text-text-muted hover:text-white cursor-pointer transition-colors">Privacy Policy</Typography>
            <Typography variant="caption" className="text-text-muted hover:text-white cursor-pointer transition-colors">Terms of Service</Typography>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-accent/30 blur-2xl" />
    </footer>
  );
};
