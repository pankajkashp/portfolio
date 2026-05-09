import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Add authentication check here (e.g. Supabase Auth)
  
  return (
    <div className="min-h-screen bg-background-secondary text-foreground">
      <nav className="border-b border-white/5 bg-background p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tighter">AETHER ADMIN</h1>
          <div className="flex gap-4">
            <button className="text-sm text-text-secondary hover:text-accent">Dashboard</button>
            <button className="text-sm text-text-secondary hover:text-accent">Projects</button>
            <button className="text-sm text-text-secondary hover:text-accent">Settings</button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
