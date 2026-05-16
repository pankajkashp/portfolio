'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroLanding } from '@/components/sections/HeroLanding';
import { Preloader } from '@/components/layout/Preloader';
import { useDashboardStore } from '@/store/useDashboardStore';
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/components/sections/Dashboard').then((mod) => mod.Dashboard), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-[100] bg-[#06060a]" />,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isDashboardOpen, setIsDashboardOpen, setActiveModule } = useDashboardStore();

  const handleComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const handleInitialRoute = () => {
      const hash = window.location.hash;
      if (hash === '#projects') {
        setIsDashboardOpen(true);
        setActiveModule('projects');
      }
    };

    if (!loading) {
      handleInitialRoute();
    }
  }, [loading, setIsDashboardOpen, setActiveModule]);

  return (
    <main className="relative bg-[#06060a] overflow-hidden" id="home">
      <Preloader onComplete={handleComplete} />
      
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: isDashboardOpen ? -6 : 0, scale: isDashboardOpen ? 0.985 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <HeroLanding />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#06060a]/94 overflow-hidden"
            data-lenis-prevent
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
