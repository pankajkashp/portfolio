'use client';

import { useState } from 'react';
import { Typography } from '@/components/ui/Typography';
import { LayoutDashboard, FolderKanban, Settings, User, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'dashboard' | 'projects' | 'settings' | 'about' | 'terminal';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const TABS = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'about', label: 'About/Hero', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'terminal', label: 'System', icon: Terminal },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="title">Admin Dashboard</Typography>
          <Typography variant="body" className="text-sm">Manage your cinematic portfolio content.</Typography>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold">Save Changes</button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300",
              activeTab === tab.id ? "bg-accent text-white" : "hover:bg-white/5 text-text-muted hover:text-white"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8 min-h-[600px]">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'about' && <AboutHeroManager />}
        {activeTab === 'settings' && <GlobalSettingsManager />}
        {activeTab === 'terminal' && <SystemTerminal />}
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Total Projects', value: '12', color: 'text-accent' },
        { label: 'Page Views', value: '2.4k', color: 'text-white' },
        { label: 'Form Inquiries', value: '8', color: 'text-accent-secondary' },
      ].map((stat) => (
        <div key={stat.label} className="p-6 bg-white/5 rounded-xl border border-white/5">
          <Typography variant="caption">{stat.label}</Typography>
          <Typography variant="title" className={cn("text-4xl mt-2", stat.color)}>{stat.value}</Typography>
        </div>
      ))}
    </div>
  );
}

function ProjectsManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="subtitle">Manage Projects</Typography>
        <button className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors">
          + Add New Project
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-text-muted text-sm">
              <th className="pb-4 font-medium">Project</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Featured</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-white/5 group">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-lg" />
                    <div>
                      <div className="font-medium">Neural Nexus v{i}</div>
                      <div className="text-xs text-text-muted">nexus-aether.ai</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-text-muted">AI / Backend</td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-[10px] uppercase font-bold tracking-widest">
                    Completed
                  </span>
                </td>
                <td className="py-4">
                  <div className="w-8 h-4 bg-accent rounded-full relative">
                    <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                  </div>
                </td>
                <td className="py-4 text-right">
                  <button className="text-text-muted hover:text-white transition-colors">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AboutHeroManager() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <Typography variant="subtitle">Hero Content</Typography>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-muted block mb-2 uppercase tracking-widest font-bold">Title</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-accent h-32" 
              defaultValue="CRAFTING INTELLIGENT DIGITAL ECOSYSTEMS" />
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-2 uppercase tracking-widest font-bold">Subtitle</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-accent" 
              defaultValue="Engineering the Intelligence of Tomorrow" />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <Typography variant="subtitle">3D Scene Settings</Typography>
        <div className="p-6 bg-white/5 rounded-xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Auto Rotation</span>
            <div className="w-8 h-4 bg-accent rounded-full relative">
              <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Rotation Speed</span>
              <span>2.4x</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[60%] h-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalSettingsManager() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <Typography variant="subtitle">Appearance</Typography>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-text-muted block mb-2 uppercase tracking-widest font-bold">Accent Color</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg border border-white/20" />
              <input className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-accent" 
              defaultValue="#a855f7" />
            </div>
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-2 uppercase tracking-widest font-bold">Secondary Accent</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c084fc] rounded-lg border border-white/20" />
              <input className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-accent" 
                defaultValue="#c084fc" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <Typography variant="subtitle">SEO & Social</Typography>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-muted block mb-2 uppercase tracking-widest font-bold">Site Title</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-accent" 
              defaultValue="AETHER | AI Engineer" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemTerminal() {
  return (
    <div className="bg-black rounded-lg p-6 font-mono text-sm space-y-2 border border-white/5">
      <div className="text-green-500">➜ aether_folio git:(main) prisma generate</div>
      <div className="text-text-muted">Environment variables loaded from .env</div>
      <div className="text-text-muted">Prisma schema loaded from prisma/schema.prisma</div>
      <div className="text-white">✔ Generated Prisma Client (5.8.1) to ./node_modules/@prisma/client in 84ms</div>
      <div className="text-green-500">➜ aether_folio git:(main) <span className="animate-pulse">_</span></div>
    </div>
  );
}
