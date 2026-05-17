'use client';

import { useEffect } from 'react';
import { Dashboard } from '@/components/sections/Dashboard';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function DashboardRoutePage() {
  const { setIsDashboardOpen, setActiveModule } = useDashboardStore();

  useEffect(() => {
    setIsDashboardOpen(true);
    setActiveModule(null);

    return () => {
      setIsDashboardOpen(false);
      setActiveModule(null);
    };
  }, [setActiveModule, setIsDashboardOpen]);

  return <Dashboard />;
}
