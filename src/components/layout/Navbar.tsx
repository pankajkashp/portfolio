'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { useCursorStore } from '@/store/useCursorStore';
import { navigationLinks } from '@/data/navigation';
import { personalInfo } from '@/data/personal';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const { setCursorType } = useCursorStore();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-12 py-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          <Typography variant="title" className="text-2xl font-bold tracking-tighter">
            {personalInfo.name}
          </Typography>
        </div>

        {/* Capsule Links */}
        <div className="hidden md:flex items-center gap-8 nav-capsule">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative group"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Typography variant="caption" className={cn(
                "text-text-secondary group-hover:text-white transition-colors capitalize text-[13px] font-medium tracking-normal",
                link.name === 'Home' && "text-accent"
              )}>
                {link.name}
              </Typography>
            </a>
          ))}
        </div>

        {/* Download Resume */}
        <button
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          className="flex items-center gap-2 glass-card px-5 py-2 rounded-xl text-[12px] font-medium"
        >
          <FileText size={16} />
          Download Resume
        </button>
      </div>
    </motion.nav>
  );
};
