'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { useCursorStore } from '@/store/useCursorStore';
import { navigationLinks } from '@/data/navigation';
import { personalInfo } from '@/data/personal';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { MobileNav } from '@/components/layout/MobileNav';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const { setCursorType } = useCursorStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⌘K shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setCommandOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo — left */}
          <div 
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            className="shrink-0"
          >
            <Typography variant="title" className="text-2xl font-bold tracking-tighter">
              {personalInfo.name.split(' ')[0].toUpperCase()}<span className="text-accent">.</span>
            </Typography>
          </div>

          {/* Center — Capsule Nav (desktop) */}
          <div className="hidden md:flex items-center nav-capsule">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.name)}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className={cn(
                  "px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300",
                  activeSection === link.name
                    ? "bg-accent text-black"
                    : "text-text-secondary hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right — Download Resume (desktop) + Mobile Nav */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={personalInfo.resumeUrl}
              download
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className="hidden md:flex items-center gap-2 glass-card px-5 py-2.5 rounded-xl text-[12px] font-medium hover:border-accent/30 transition-all"
            >
              <Download size={14} />
              Download Resume
            </a>
            <MobileNav />
          </div>
        </div>
      </motion.nav>

      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
};
