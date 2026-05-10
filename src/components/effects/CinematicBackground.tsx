'use client';

export const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient Mesh — CSS only, zero JS overhead */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full blur-[200px] opacity-[0.06]" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full blur-[180px] opacity-[0.03]" style={{ background: 'var(--accent-secondary)' }} />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
};
