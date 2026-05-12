'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AIOrb } from '@/components/ui/AIOrb';

const navLinks = []; // Empty as requested to replace with 3D system

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

          {/* Center — AI Orb System (desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center max-w-[600px] mx-auto overflow-hidden">
            <AIOrb />
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

            {/* Center — AI Orb System (mobile) */}
            <div className="w-full h-[200px] mb-8">
              <AIOrb />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-[#ff6b00] mb-2">Neural Link Active</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Immersive Intelligence Core</p>
            </motion.div>

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
