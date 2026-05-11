import { create } from 'zustand';

interface DashboardState {
  activeModule: string | null;
  setActiveModule: (module: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeModule: null,
  setActiveModule: (module) => set({ activeModule: module }),
}));
