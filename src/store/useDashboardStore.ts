import { create } from 'zustand';

interface DashboardState {
  activeModule: string | null;
  isDashboardOpen: boolean;
  setActiveModule: (module: string | null) => void;
  setIsDashboardOpen: (isOpen: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeModule: null,
  isDashboardOpen: false,
  setActiveModule: (module) => set({ activeModule: module }),
  setIsDashboardOpen: (isOpen) => set({ isDashboardOpen: isOpen }),
}));
