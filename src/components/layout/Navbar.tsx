'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#dashboard' },
  { name: 'Skills', href: '#dashboard' },
  { name: 'Education', href: '#dashboard' },
  { name: 'Projects', href: '#dashboard' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { setCursorType } = useCursorStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-500 ${scrolled ? 'bg-[#06060a]/80 backdrop-blur-md py-4' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          className="shrink-0"
        >
          <div className="flex items-center gap-3 group">

            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#ff6b00] group-hover:text-white transition-colors">
              Pankaj Kashyap</span>

          </div>
        </Link>

        {/* Center — Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className={`text-[13px] font-medium transition-all duration-300 relative group ${isActive(link.href) ? 'text-white' : 'text-white hover:text-[#ff6b00]'
                }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full ${isActive(link.href) ? 'w-full' : ''}`} />
            </Link>
          ))}
        </div>

        {/* Right — CTA */}
        <a
          href="/resume.pdf"
          download
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          className="hidden md:flex items-center gap-1 text-[13px] font-bold text-white hover:text-[#ff6b00] transition-colors"
        >
          Download Resume <ArrowUpRight size={14} />
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          <span className="w-6 h-px bg-white" />
          <span className="w-6 h-px bg-white" />
        </button>
      </div >
    </motion.nav >
  );
};

