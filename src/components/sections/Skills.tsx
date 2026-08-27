'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/layout/Section';
import { useCursorStore } from '@/store/useCursorStore';
import { 
  Network, Database, Brain, Cpu, Sparkles, Bot, LineChart, 
  CheckCircle2, Rocket, KeyRound, UserCheck, Boxes, ShieldCheck, 
  Workflow, CheckCheck, CreditCard, Wallet, Code2, PenTool, 
  Terminal, Shield, Layers, Layout, Server, Cloud, Globe, GitBranch
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── HIGH-FIDELITY CUSTOM VECTOR ICONS ───
const ReactIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
    <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.3" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" stroke="currentColor" strokeWidth="1.3" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" stroke="currentColor" strokeWidth="1.3" />
    <circle r="1.8" fill="currentColor" />
  </svg>
);

const TypeScriptIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <div className={`${className} rounded-[4px] bg-[#3178c6] flex items-center justify-center text-white font-bold text-[10px] select-none font-mono leading-none`}>
    TS
  </div>
);

const JavaScriptIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <div className={`${className} rounded-[4px] bg-[#f7df1e] flex items-center justify-center text-black font-bold text-[10px] select-none font-mono leading-none`}>
    JS
  </div>
);

const NextJsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none">
    <circle cx="90" cy="90" r="86" fill="black" stroke="white" strokeWidth="6" />
    <path d="M149.508 157.52L69.142 54H54V125.97H66.6214V69.9674L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
    <rect x="115" y="54" width="12" height="72" fill="white" />
  </svg>
);

const TailwindIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="currentColor" />
  </svg>
);

const FramerMotionIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="currentColor" />
  </svg>
);

const NodeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <path d="M16 3L3.88 10v14L16 31l12.12-7V10L16 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    <path d="M16 11v10M11 13.5l5 2.5 5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PythonIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M63.086 4.062c-29.215 0-27.424 12.673-27.424 12.673l.035 13.129h27.848v3.938H25.047s-18.421 2.083-18.421 27.351c0 25.269 16.084 24.364 16.084 24.364h9.605v-13.48c0-15.429 13.313-15.013 13.313-15.013h27.494s12.896-.208 12.896-12.674V16.735S88.666 4.062 63.086 4.062zm-15.013 8.3c2.709 0 4.931 2.222 4.931 4.931 0 2.708-2.222 4.93-4.931 4.93-2.708 0-4.93-2.222-4.93-4.93 0-2.709 2.222-4.931 4.93-4.931z" fill="#387eb8" />
    <path d="M64.914 123.938c29.215 0 27.424-12.673 27.424-12.673l-.035-13.129H64.455v-3.938h38.498s18.421-2.083 18.421-27.351c0-25.269-16.084-24.364-16.084-24.364h-9.605v13.48c0 15.429-13.313 15.013-13.313 15.013H54.878s-12.896.208-12.896 12.674v27.609s-2.648 12.679 22.932 12.679zm15.013-8.3c-2.709 0-4.931-2.222-4.931-4.931 0-2.708 2.222-4.93 4.931-4.93 2.708 0 4.93 2.222 4.93 4.93 0 2.709-2.222 4.931-4.93 4.931z" fill="#ffe052" />
  </svg>
);

const PostgresIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <path d="M32 6C18.745 6 8 16.745 8 30c0 8.837 4.776 16.559 12 20.73V58h24v-7.27C51.224 46.559 56 38.837 56 30 56 16.745 45.255 6 32 6z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    <path d="M24 24c0-4.418 3.582-8 8-8s8 3.582 8 8M20 34c0-2 2-4 6-4M44 34c0-2-2-4-6-4M28 42h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DockerIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <path d="M59.5 28.5c-.8-.6-3.8-1.5-7.5-.3-1.2-3.1-4.2-5.2-7.8-5.2h-2.2v4.8h-4.4V23H33v4.8h-4.4V23h-4.6v4.8h-4.4V23H15v14.4c0 9.2 7.4 16.6 16.6 16.6 12.3 0 22.8-8.2 25.7-20.1 2.3-.2 5-1.5 6.3-4.1-.7-.6-2.5-.8-4.1-.4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    <rect x="24" y="15" width="4.6" height="4.4" rx="1" fill="currentColor" />
    <rect x="33" y="15" width="4.6" height="4.4" rx="1" fill="currentColor" />
    <rect x="33" y="7" width="4.6" height="4.4" rx="1" fill="currentColor" />
  </svg>
);

const PrismaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M19.99 18.25L12.78 1.48C12.59 1.04 12.01 0.94 11.69 1.29L3.18 10.74C2.92 11.03 2.95 11.47 3.24 11.73L13.88 21.36C14.21 21.65 14.71 21.53 14.88 21.13L19.99 18.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const FastApiIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
    <path d="M13 3L6 14H12L11 21L18 10H12L13 3Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const RazorpayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 2L6 16.5H11.5L8.5 22L18 7.5H12.5L13.5 2Z" />
  </svg>
);

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    color: string;
    border: string;
    glow: string;
  };
}

// ─── SKILLS CATEGORY DATA ───
const frontendSkills: SkillItem[] = [
  { name: 'React', icon: ReactIcon, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
  { name: 'TypeScript', icon: TypeScriptIcon, accent: { color: 'text-[#3178c6]', border: 'group-hover:border-[#3178c6]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(49,120,198,0.12)]' } },
  { name: 'Next.js', icon: NextJsIcon, accent: { color: 'text-white', border: 'group-hover:border-white/40', glow: 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]' } },
  { name: 'JavaScript', icon: JavaScriptIcon, accent: { color: 'text-[#f7df1e]', border: 'group-hover:border-[#f7df1e]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(247,223,30,0.12)]' } },
  { name: 'Tailwind CSS', icon: TailwindIcon, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
  { name: 'HTML5', icon: Layout, accent: { color: 'text-[#f97316]', border: 'group-hover:border-[#f97316]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]' } },
  { name: 'CSS3', icon: Layers, accent: { color: 'text-[#3b82f6]', border: 'group-hover:border-[#3b82f6]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]' } },
  { name: 'Framer Motion', icon: FramerMotionIcon, accent: { color: 'text-[#c084fc]', border: 'group-hover:border-[#c084fc]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(192,132,252,0.12)]' } },
];

const backendSkills: SkillItem[] = [
  { name: 'Node.js', icon: NodeIcon, accent: { color: 'text-[#22c55e]', border: 'group-hover:border-[#22c55e]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]' } },
  { name: 'Express.js', icon: Server, accent: { color: 'text-slate-200', border: 'group-hover:border-slate-300/40', glow: 'group-hover:shadow-[0_0_20px_rgba(226,232,240,0.12)]' } },
  { name: 'Python', icon: PythonIcon, accent: { color: 'text-[#387eb8]', border: 'group-hover:border-[#387eb8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,126,184,0.12)]' } },
  { name: 'FastAPI', icon: FastApiIcon, accent: { color: 'text-[#009688]', border: 'group-hover:border-[#009688]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(0,150,136,0.12)]' } },
  { name: 'PostgreSQL', icon: PostgresIcon, accent: { color: 'text-[#60a5fa]', border: 'group-hover:border-[#60a5fa]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]' } },
  { name: 'SQL', icon: Database, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
  { name: 'Prisma', icon: PrismaIcon, accent: { color: 'text-[#2dd4bf]', border: 'group-hover:border-[#2dd4bf]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(45,212,191,0.12)]' } },
  { name: 'REST APIs', icon: Network, accent: { color: 'text-[#c084fc]', border: 'group-hover:border-[#c084fc]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(192,132,252,0.12)]' } },
];

const aimlSkills: SkillItem[] = [
  { name: 'Python', icon: PythonIcon, accent: { color: 'text-[#387eb8]', border: 'group-hover:border-[#387eb8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,126,184,0.12)]' } },
  { name: 'Machine Learning', icon: Brain, accent: { color: 'text-[#a855f7]', border: 'group-hover:border-[#a855f7]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]' } },
  { name: 'Data Processing', icon: Cpu, accent: { color: 'text-[#818cf8]', border: 'group-hover:border-[#818cf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(129,140,248,0.12)]' } },
  { name: 'ML APIs', icon: Sparkles, accent: { color: 'text-[#fbbf24]', border: 'group-hover:border-[#fbbf24]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]' } },
  { name: 'AI Systems', icon: Bot, accent: { color: 'text-[#c084fc]', border: 'group-hover:border-[#c084fc]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(192,132,252,0.12)]' } },
  { name: 'Prediction & Analysis', icon: LineChart, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
];

const cloudDevopsSkills: SkillItem[] = [
  { name: 'Docker', icon: DockerIcon, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
  { name: 'AWS', icon: Cloud, accent: { color: 'text-[#f97316]', border: 'group-hover:border-[#f97316]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]' } },
  { name: 'Vercel', icon: NextJsIcon, accent: { color: 'text-white', border: 'group-hover:border-white/40', glow: 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]' } },
  { name: 'Neon PostgreSQL', icon: PostgresIcon, accent: { color: 'text-[#00e699]', border: 'group-hover:border-[#00e699]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(0,230,153,0.12)]' } },
  { name: 'Git', icon: GitBranch, accent: { color: 'text-[#f05032]', border: 'group-hover:border-[#f05032]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(240,80,50,0.12)]' } },
  { name: 'GitHub', icon: GitHubIcon, accent: { color: 'text-white', border: 'group-hover:border-white/40', glow: 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]' } },
  { name: 'CI / Testing', icon: CheckCircle2, accent: { color: 'text-[#fbbf24]', border: 'group-hover:border-[#fbbf24]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]' } },
  { name: 'Deployment', icon: Rocket, accent: { color: 'text-[#a855f7]', border: 'group-hover:border-[#a855f7]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]' } },
];

const systemsSkills: SkillItem[] = [
  { name: 'JWT Authentication', icon: KeyRound, accent: { color: 'text-[#10b981]', border: 'group-hover:border-[#10b981]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]' } },
  { name: 'RBAC', icon: UserCheck, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
  { name: 'Multi-Tenant Systems', icon: Boxes, accent: { color: 'text-[#a855f7]', border: 'group-hover:border-[#a855f7]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]' } },
  { name: 'API Security', icon: ShieldCheck, accent: { color: 'text-[#10b981]', border: 'group-hover:border-[#10b981]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]' } },
  { name: 'Backend Architecture', icon: Workflow, accent: { color: 'text-[#60a5fa]', border: 'group-hover:border-[#60a5fa]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]' } },
  { name: 'Automated Testing', icon: CheckCheck, accent: { color: 'text-[#fbbf24]', border: 'group-hover:border-[#fbbf24]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]' } },
];

const toolsSkills: SkillItem[] = [
  { name: 'Razorpay', icon: RazorpayIcon, accent: { color: 'text-[#0284c7]', border: 'group-hover:border-[#0284c7]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(2,132,199,0.12)]' } },
  { name: 'Payment APIs', icon: Wallet, accent: { color: 'text-[#10b981]', border: 'group-hover:border-[#10b981]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]' } },
  { name: 'VS Code', icon: Code2, accent: { color: 'text-[#38bdf8]', border: 'group-hover:border-[#38bdf8]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]' } },
  { name: 'Figma', icon: PenTool, accent: { color: 'text-[#f43f5e]', border: 'group-hover:border-[#f43f5e]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.12)]' } },
  { name: 'npm', icon: Terminal, accent: { color: 'text-[#ef4444]', border: 'group-hover:border-[#ef4444]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.12)]' } },
  { name: 'Linux', icon: Globe, accent: { color: 'text-[#fbbf24]', border: 'group-hover:border-[#fbbf24]/40', glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]' } },
];

export const Skills = () => {
  const { setCursorType } = useCursorStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step 1: Heading reveal
      gsap.fromTo(
        '.stack-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Panels staggered reveal
      const panels = gsap.utils.toArray<HTMLElement>('.skill-panel');
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
            },
          }
        );
      });

      // Section Ending
      gsap.fromTo(
        '.stack-ending',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stack-ending',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderSkillItem = (skill: SkillItem) => {
    const Icon = skill.icon;
    return (
      <div 
        key={skill.name}
        className={`group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] ${skill.accent.border} ${skill.accent.glow} transition-all duration-300 hover:-translate-y-0.5`}
        onMouseEnter={() => setCursorType('hover')}
        onMouseLeave={() => setCursorType('default')}
      >
        <div className={`p-2 rounded-lg bg-white/[0.04] transition-all duration-300 group-hover:scale-105 ${skill.accent.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium tracking-wide text-white/75 group-hover:text-white transition-colors duration-300 truncate">
          {skill.name}
        </span>
      </div>
    );
  };

  return (
    <Section id="skills" className="relative bg-[#06060a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="stack-heading mb-14 md:mb-20 text-center md:text-left">
          <span className="text-[#a855f7] font-mono text-sm tracking-[0.2em] uppercase mb-3 block">
            MY STACK &amp; CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.2]">
            Architecting end-to-end applications with modern frontend, scalable backends, and intelligent systems.
          </h2>
        </div>

        {/* 6 Category Panels Grid */}
        <div className="flex flex-col gap-6">
          
          {/* 01 — FRONTEND (Full width on desktop) */}
          <div className="skill-panel w-full flex flex-col p-6 sm:p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10">
            <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4">
              <span className="text-white/40 font-mono text-xs sm:text-sm">01</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">FRONTEND</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {frontendSkills.map(renderSkillItem)}
            </div>
          </div>

          {/* 02 — BACKEND & DATA & 03 — AI & ML (Row 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 02 BACKEND & DATA */}
            <div className="skill-panel p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col">
              <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4">
                <span className="text-white/40 font-mono text-xs sm:text-sm">02</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">BACKEND &amp; DATA</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 flex-1 content-start">
                {backendSkills.map(renderSkillItem)}
              </div>
            </div>

            {/* 03 AI & ML */}
            <div className="skill-panel p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col">
              <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4">
                <span className="text-white/40 font-mono text-xs sm:text-sm">03</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">AI &amp; ML</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 flex-1 content-start">
                {aimlSkills.map(renderSkillItem)}
              </div>
            </div>

          </div>

          {/* 04 — CLOUD & DEVOPS (Full width on desktop) */}
          <div className="skill-panel w-full flex flex-col p-6 sm:p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10">
            <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4">
              <span className="text-white/40 font-mono text-xs sm:text-sm">04</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">CLOUD &amp; DEVOPS</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {cloudDevopsSkills.map(renderSkillItem)}
            </div>
          </div>

          {/* 05 — SYSTEMS & 06 — TOOLS & INTEGRATIONS (Row 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 05 SYSTEMS */}
            <div className="skill-panel p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col">
              <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4">
                <span className="text-white/40 font-mono text-xs sm:text-sm">05</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">SYSTEMS</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 flex-1 content-start">
                {systemsSkills.map(renderSkillItem)}
              </div>
            </div>

            {/* 06 TOOLS & INTEGRATIONS */}
            <div className="skill-panel p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 flex flex-col">
              <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4">
                <span className="text-white/40 font-mono text-xs sm:text-sm">06</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">TOOLS &amp; INTEGRATIONS</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 flex-1 content-start">
                {toolsSkills.map(renderSkillItem)}
              </div>
            </div>

          </div>

        </div>

        {/* Section Ending */}
        <div className="stack-ending mt-20 md:mt-28 text-center">
          <p className="text-lg md:text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            I learn by building — and every project adds another production-grade capability to my stack.
          </p>
        </div>

      </div>
    </Section>
  );
};

