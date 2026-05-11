'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroLanding } from '@/components/sections/HeroLanding';
import { Dashboard } from '@/components/sections/Dashboard';
import { Preloader } from '@/components/layout/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative bg-[#06060a]" id="home">
      <Preloader onComplete={() => setLoading(false)} />
      
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroLanding />
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
