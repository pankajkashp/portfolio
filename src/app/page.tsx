'use client';

import { HeroLanding } from '@/components/sections/HeroLanding';
import { Dashboard } from '@/components/sections/Dashboard';

export default function Home() {
  return (
    <main className="relative" id="home">
      <HeroLanding />
      <Dashboard />
    </main>
  );
}
