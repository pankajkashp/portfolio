'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroLanding } from '@/components/sections/HeroLanding';
import { Dashboard } from '@/components/sections/Dashboard';
import { Preloader } from '@/components/layout/Preloader';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { isDashboardOpen, setIsDashboardOpen, setActiveModule } = useDashboardStore();

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
      <Preloader onComplete={() => setLoading(false)} />
      
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              filter: isDashboardOpen ? 'blur(10px)' : 'blur(0px)',
              scale: isDashboardOpen ? 0.95 : 1
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#06060a]/90 backdrop-blur-3xl overflow-hidden"
            data-lenis-prevent
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
