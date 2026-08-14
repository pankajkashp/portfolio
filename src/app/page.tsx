'use client';

import { useState, useEffect } from 'react';
import { HeroLanding } from '@/components/sections/HeroLanding';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Certifications } from '@/components/sections/Certifications';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { Preloader } from '@/components/layout/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for preloader (adjust or remove if not needed)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-[#06060a] overflow-hidden" id="home">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <Navbar />
          <HeroLanding />

          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <About />
          <Contact />
          <WhatsAppButton />
        </>
      )}
    </main>
  );
}
