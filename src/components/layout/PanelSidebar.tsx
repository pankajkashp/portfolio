'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import {
  House,
  UserRound,
  Layers3,
  GraduationCap,
  FolderGit2,
  BadgeCheck,
  Mail,
} from 'lucide-react';

const panels = [
  { href: '/about', label: 'About', icon: UserRound },
  { href: '/skills', label: 'Skills', icon: Layers3 },
  { href: '/education', label: 'Education', icon: GraduationCap },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/certifications', label: 'Awards', icon: BadgeCheck },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export const PanelSidebar = () => {
  const pathname = usePathname();
  const { setCursorType } = useCursorStore();

  if (pathname === '/dashboard') {
    return null;
  }

  return (
    <>
      <aside className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex">
        <div className="relative w-20 rounded-[2rem] bg-[#12061f]/95 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(124,58,237,0.12),transparent_45%)] pointer-events-none" />
          <div className="p-3 flex justify-center">
            <Link
              href="/"
              className="relative z-10 w-12 h-12 rounded-full bg-[#7c3aed]/20 border border-white/10 flex items-center justify-center text-white font-black tracking-[0.2em] shadow-[0_0_20px_rgba(124,58,237,0.18)]"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              aria-label="Go to home"
            >
              <House size={18} strokeWidth={2.2} />
            </Link>
          </div>

          <div className="px-2 pb-3 space-y-3">
            {panels.map((panel) => {
              const Icon = panel.icon;
              const active = pathname === panel.href;

              return (
                <Link
                  key={panel.href}
                  href={panel.href}
                  className={`relative w-full h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    active
                      ? 'bg-[#7c3aed] text-white shadow-[0_0_25px_rgba(124,58,237,0.35)]'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  aria-label={panel.label}
                  title={panel.label}
                >
                  <Icon size={20} strokeWidth={2.1} />
                  {active && (
                    <motion.span
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-full border border-white/15"
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden w-[94vw] max-w-md">
        <div className="rounded-2xl bg-[#12061f]/90 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.35)] px-2 py-2">
          <div className="grid grid-cols-7 gap-1">
            <Link
              href="/"
              className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                pathname === '/' ? 'bg-[#7c3aed] text-white' : 'text-white/85'
              }`}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              aria-label="Home"
              title="Home"
            >
              <House size={18} strokeWidth={2.2} />
            </Link>
            {panels.map((panel) => {
              const Icon = panel.icon;
              const active = pathname === panel.href;
              return (
                <Link
                  key={`mobile-${panel.href}`}
                  href={panel.href}
                  className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                    active ? 'bg-[#7c3aed] text-white' : 'text-white/85'
                  }`}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  aria-label={panel.label}
                  title={panel.label}
                >
                  <Icon size={18} strokeWidth={2.1} />
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
