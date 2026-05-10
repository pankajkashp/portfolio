'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { navigationLinks } from '@/data/navigation';
import { projects } from '@/data/projects';
import { Search, Command as CommandIcon, ArrowRight, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');

  const allItems = [
    ...navigationLinks.map(n => ({ type: 'nav', label: n.name, action: n.href })),
    ...projects.map(p => ({ type: 'project', label: p.title, action: `#project-${p.id}` })),
    { type: 'action', label: 'Download Resume', action: '/resume.pdf' },
    { type: 'action', label: 'Toggle Theme', action: 'theme' },
  ];

  const filtered = query
    ? allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  const handleSelect = (action: string) => {
    if (action.startsWith('#') || action.startsWith('/')) {
      window.location.href = action;
    }
    onClose();
    setQuery('');
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[201]"
          >
            <div className="bg-[#0a0a12] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                <Search size={18} className="text-text-muted shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-text-muted/50 focus:outline-none"
                />
                <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <Typography className="text-text-muted text-sm">No results found.</Typography>
                  </div>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(item.action)}
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold w-16 text-left">
                          {item.type}
                        </span>
                        <Typography className="text-sm text-white">{item.label}</Typography>
                      </div>
                      <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06]">
                <Typography className="text-[10px] text-text-muted">Navigate with ↑↓ · Select with ↵</Typography>
                <Typography className="text-[10px] text-text-muted">ESC to close</Typography>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
