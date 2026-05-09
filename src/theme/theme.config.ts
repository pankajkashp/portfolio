export const themeConfig = {
  colors: {
    background: {
      DEFAULT: '#050505',
      secondary: '#0a0a0a',
      accent: '#0f0f0f',
    },
    accent: {
      DEFAULT: '#ff6b00', // Deep Orange
      secondary: '#ff8c33',
      glow: 'rgba(255, 107, 0, 0.5)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1a1',
      muted: '#666666',
    },
    glass: {
      background: 'rgba(15, 15, 15, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)',
    }
  },
  glows: {
    primary: '0 0 20px rgba(255, 107, 0, 0.3)',
    secondary: '0 0 40px rgba(255, 107, 0, 0.15)',
  },
  animations: {
    durations: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.8,
    },
    ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for premium feel
  }
};

export type ThemeConfig = typeof themeConfig;
