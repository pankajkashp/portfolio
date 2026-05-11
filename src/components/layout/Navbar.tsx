'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { ArrowUpRight, User, Cpu, GraduationCap, FolderOpen, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', icon: <User size={18} /> },
  { name: 'Skills', href: '#skills', icon: <Cpu size={18} /> },
  { name: 'Education', href: '#education', icon: <GraduationCap size={18} /> },
  { name: 'Projects', href: '#projects', icon: <FolderOpen size={18} /> },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { setCursorType } = useCursorStore();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = useCallback((href: string) => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    return hash === href;
  }, [pathname]);

  return (
    <>
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
                Pankaj Kashyap
              </span>
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
                className={`text-[13px] font-medium transition-all duration-300 relative group flex items-center gap-2 ${isActive(link.href) ? 'text-[#ff6b00]' : 'text-white/60 hover:text-white'
                  }`}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px bg-[#ff6b00] transition-all duration-300 group-hover:w-full ${isActive(link.href) ? 'w-full' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Right — CTA */}
          <div className="flex items-center gap-6">
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[40] bg-[#06060a] md:hidden flex flex-col items-center justify-center gap-8 p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff6b0010,transparent_70%)] pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-6 text-3xl font-bold text-white hover:text-[#ff6b00] transition-colors"
                >
                  <span className="text-[#ff6b00]">{link.icon}</span>
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-12 border-t border-white/5 w-full flex flex-col items-center gap-6"
            >
              <a
                href="/resume.pdf"
                download
                className="w-full h-16 rounded-2xl bg-white text-black flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs"
              >
                Download Resume <ArrowUpRight size={16} />
              </a>
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">
                Pankaj Kashyap © 2025
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
