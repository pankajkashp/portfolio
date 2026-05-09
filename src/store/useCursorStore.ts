import { create } from 'zustand';

interface CursorState {
  cursorType: 'default' | 'pointer' | 'hover' | 'text' | 'hidden';
  setCursorType: (type: CursorState['cursorType']) => void;
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  cursorType: 'default',
  setCursorType: (cursorType) => set({ cursorType }),
  isHovering: false,
  setIsHovering: (isHovering) => set({ isHovering }),
}));
