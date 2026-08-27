'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, Download, Terminal, FolderTree, Activity, Rocket, Code2, Coffee, Heart } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import Image from 'next/image';

// ─── HIGH-FIDELITY TECH ICONS ───
const ReactIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
    <ellipse rx="11" ry="4.2" stroke="#38bdf8" strokeWidth="1.4" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" stroke="#38bdf8" strokeWidth="1.4" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" stroke="#38bdf8" strokeWidth="1.4" />
    <circle r="2" fill="#38bdf8" />
  </svg>
);

const NodeIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3L3.88 10v14L16 31l12.12-7V10L16 3z"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="rgba(34, 197, 94, 0.12)"
    />
    <path
      d="M16 11v10M11 13.5l5 2.5 5-2.5"
      stroke="#4ade80"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TypeScriptIcon = () => (
  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#3178c6] flex items-center justify-center text-white font-bold text-sm md:text-base shadow-sm select-none font-mono">
    TS
  </div>
);

const PythonIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 128 128" fill="none">
    <path
      d="M63.086 4.062c-29.215 0-27.424 12.673-27.424 12.673l.035 13.129h27.848v3.938H25.047s-18.421 2.083-18.421 27.351c0 25.269 16.084 24.364 16.084 24.364h9.605v-13.48c0-15.429 13.313-15.013 13.313-15.013h27.494s12.896-.208 12.896-12.674V16.735S88.666 4.062 63.086 4.062zm-15.013 8.3c2.709 0 4.931 2.222 4.931 4.931 0 2.708-2.222 4.93-4.931 4.93-2.708 0-4.93-2.222-4.93-4.93 0-2.709 2.222-4.931 4.93-4.931z"
      fill="#387eb8"
    />
    <path
      d="M64.914 123.938c29.215 0 27.424-12.673 27.424-12.673l-.035-13.129H64.455v-3.938h38.498s18.421-2.083 18.421-27.351c0-25.269-16.084-24.364-16.084-24.364h-9.605v13.48c0 15.429-13.313 15.013-13.313 15.013H54.878s-12.896.208-12.896 12.674v27.609s-2.648 12.679 22.932 12.679zm15.013-8.3c-2.709 0-4.931-2.222-4.931-4.931 0-2.708 2.222-4.93 4.931-4.93 2.708 0 4.93 2.222 4.93 4.93 0 2.709-2.222 4.931-4.93 4.931z"
      fill="#ffe052"
    />
  </svg>
);

const PostgresIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 64 64" fill="none">
    <path
      d="M32 6C18.745 6 8 16.745 8 30c0 8.837 4.776 16.559 12 20.73V58h24v-7.27C51.224 46.559 56 38.837 56 30 56 16.745 45.255 6 32 6z"
      stroke="#60a5fa"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(96, 165, 250, 0.1)"
    />
    <path
      d="M24 24c0-4.418 3.582-8 8-8s8 3.582 8 8M20 34c0-2 2-4 6-4M44 34c0-2-2-4-6-4M28 42h8"
      stroke="#93c5fd"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const DockerIcon = () => (
  <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 64 64" fill="none">
    <path
      d="M59.5 28.5c-.8-.6-3.8-1.5-7.5-.3-1.2-3.1-4.2-5.2-7.8-5.2h-2.2v4.8h-4.4V23H33v4.8h-4.4V23h-4.6v4.8h-4.4V23H15v14.4c0 9.2 7.4 16.6 16.6 16.6 12.3 0 22.8-8.2 25.7-20.1 2.3-.2 5-1.5 6.3-4.1-.7-.6-2.5-.8-4.1-.4z"
      stroke="#38bdf8"
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="rgba(56, 189, 248, 0.1)"
    />
    <rect x="24" y="15" width="4.6" height="4.4" rx="1" fill="#38bdf8" />
    <rect x="33" y="15" width="4.6" height="4.4" rx="1" fill="#38bdf8" />
    <rect x="33" y="7" width="4.6" height="4.4" rx="1" fill="#38bdf8" />
  </svg>
);

export const HeroLanding = () => {
  const { setCursorType } = useCursorStore();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-[#06060a] pt-24 md:pt-28 pb-8 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* ─── AMBIENT ATMOSPHERE (Low intensity 60-70% reduced vs harsh neon) ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Purple Ambience Behind Character Workspace */}
        <div
          className="absolute top-[15%] right-[5%] w-[50vw] max-w-[700px] aspect-square rounded-full opacity-25 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.1) 45%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Soft Blue/Cyan Ambient Behind Left */}
        <div
          className="absolute top-[25%] left-[2%] w-[40vw] max-w-[550px] aspect-square rounded-full opacity-18 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(30,58,138,0.08) 50%, transparent 70%)',
            filter: 'blur(110px)',
          }}
        />
        {/* Soft Warm Orange Touch Behind Desk */}
        <div
          className="absolute bottom-[10%] right-[25%] w-[30vw] max-w-[380px] aspect-square rounded-full opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ─── 3D FAINT PERSPECTIVE GRID AT THE BOTTOM ─── */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] pointer-events-none z-[1] overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            perspective: '550px',
            perspectiveOrigin: '50% 100%',
          }}
        >
          <div
            className="w-[200%] -left-[50%] h-[200%] absolute origin-bottom"
            style={{
              transform: 'rotateX(72deg) translateY(20%)',
              backgroundImage: `
                linear-gradient(rgba(168,85,247,0.16) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.16) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, transparent 85%)',
            }}
          />
        </div>
      </div>

      {/* ─── 3D DEVELOPER WORKSPACE BACKGROUND PANELS (Moved Right Behind Character) ─── */}
      <div className="absolute inset-0 pointer-events-none z-[5] hidden md:block">
        {/* Main Center Code Window (developer.ts) */}
        <motion.div
          animate={!prefersReducedMotion ? { y: [-6, 6, -6], rotateZ: [-0.5, 0.5, -0.5] } : undefined}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[12%] right-[16%] lg:right-[18%] xl:right-[20%] w-[380px] lg:w-[440px] xl:w-[490px] rounded-xl bg-[#080910]/85 border border-white/[0.08] shadow-2xl backdrop-blur-md overflow-hidden opacity-75"
          style={{
            transform: 'perspective(800px) rotateY(-6deg) rotateX(3deg)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(168,85,247,0.06)',
          }}
        >
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/70" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/45 font-mono">
              <Terminal size={11} className="text-[#a855f7]/70" />
              <span>developer.ts</span>
            </div>
            <div className="w-8" />
          </div>

          {/* Editor Code Content */}
          <div className="p-3.5 font-mono text-[11px] lg:text-[12px] leading-relaxed text-white/75 overflow-hidden">
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">1</span>
              <span><span className="text-[#c084fc]">const</span> <span className="text-[#60a5fa]">developer</span> = &#123;</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">2</span>
              <span className="pl-4"><span className="text-[#93c5fd]">name</span>: <span className="text-[#34d399]">&quot;Pankaj&quot;</span>,</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">3</span>
              <span className="pl-4"><span className="text-[#93c5fd]">role</span>: <span className="text-[#34d399]">&quot;Full-Stack Engineer&quot;</span>,</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">4</span>
              <span className="pl-4"><span className="text-[#93c5fd]">stack</span>: [</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">5</span>
              <span className="pl-8 text-[#34d399]">&quot;React&quot;, &quot;Node.js&quot;,</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">6</span>
              <span className="pl-8 text-[#34d399]">&quot;TypeScript&quot;, &quot;Python&quot;,</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">7</span>
              <span className="pl-8 text-[#34d399]">&quot;PostgreSQL&quot;, &quot;Docker&quot;</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">8</span>
              <span className="pl-4">],</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">9</span>
              <span className="pl-4"><span className="text-[#93c5fd]">focus</span>: <span className="text-[#34d399]">&quot;AI &amp; scalable systems&quot;</span></span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">10</span>
              <span>&#125;;</span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">11</span>
              <span></span>
            </div>
            <div className="flex">
              <span className="w-6 text-white/20 select-none text-right pr-2">12</span>
              <span><span className="text-[#c084fc]">export default</span> developer;</span>
            </div>
          </div>
        </motion.div>

        {/* Small Left Explorer Panel (Shifted right near character left side) */}
        <motion.div
          animate={!prefersReducedMotion ? { y: [5, -5, 5], rotateZ: [-0.5, 0.5, -0.5] } : undefined}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute top-[22%] right-[44%] lg:right-[47%] xl:right-[48%] w-[160px] rounded-lg bg-[#07080e]/85 border border-white/[0.06] shadow-xl backdrop-blur-sm p-3 font-mono text-[10px] text-white/50 opacity-60"
          style={{
            transform: 'perspective(700px) rotateY(-10deg)',
          }}
        >
          <div className="flex items-center gap-1.5 text-white/70 font-semibold mb-2 border-b border-white/[0.06] pb-1.5">
            <FolderTree size={12} className="text-[#38bdf8]" />
            <span className="tracking-wider">EXPLORER</span>
          </div>
          <div className="space-y-1 pl-1">
            <div className="text-white/80 font-medium flex items-center gap-1">▾ src</div>
            <div className="pl-3 text-[#38bdf8]/80">▸ components</div>
            <div className="pl-3 text-[#38bdf8]/80">▸ pages</div>
            <div className="pl-3 text-[#38bdf8]/80">▸ api</div>
            <div className="pl-3 text-[#38bdf8]/80">▸ styles</div>
            <div className="pl-3 text-[#fbbf24]/90">📄 App.tsx</div>
            <div className="pl-3 text-[#34d399]/90">📄 index.tsx</div>
            <div className="pl-3 text-[#f43f5e]/80">📄 server.js</div>
            <div className="text-white/40">⚙ package.json</div>
            <div className="text-white/40">⚙ tsconfig.json</div>
          </div>
        </motion.div>

        {/* Small Right Server Code Window (Shifted to upper right) */}
        <motion.div
          animate={!prefersReducedMotion ? { y: [-6, 6, -6], rotateZ: [0.5, -0.5, 0.5] } : undefined}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[22%] right-[1%] lg:right-[3%] xl:right-[4%] w-[260px] xl:w-[300px] rounded-xl bg-[#080910]/80 border border-white/[0.07] shadow-2xl backdrop-blur-md overflow-hidden opacity-65"
          style={{
            transform: 'perspective(700px) rotateY(10deg) rotateX(2deg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(56,189,248,0.05)',
          }}
        >
          <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ef4444]/70" />
              <div className="w-2 h-2 rounded-full bg-[#eab308]/70" />
              <div className="w-2 h-2 rounded-full bg-[#22c55e]/70" />
            </div>
            <span className="text-[10px] text-white/40 font-mono">server.js</span>
            <div className="w-4" />
          </div>
          <div className="p-3 font-mono text-[10px] xl:text-[11px] leading-relaxed text-white/75">
            <div><span className="text-[#c084fc]">const</span> express = <span className="text-[#60a5fa]">require</span>(<span className="text-[#34d399]">&apos;express&apos;</span>);</div>
            <div><span className="text-[#c084fc]">const</span> app = <span className="text-[#60a5fa]">express</span>();</div>
            <div className="my-1 text-white/30">// REST API Route</div>
            <div>app.<span className="text-[#60a5fa]">get</span>(<span className="text-[#34d399]">&apos;/api/hello&apos;</span>, (req, res) =&gt; &#123;</div>
            <div className="pl-3">res.<span className="text-[#60a5fa]">json</span>(&#123; <span className="text-[#38bdf8]">message</span>: <span className="text-[#34d399]">&quot;Hello World!&quot;</span> &#125;);</div>
            <div>&#125;);</div>
            <div className="mt-1">app.<span className="text-[#60a5fa]">listen</span>(<span className="text-[#fb923c]">3000</span>, () =&gt; &#123;</div>
            <div className="pl-3">console.<span className="text-[#60a5fa]">log</span>(<span className="text-[#34d399]">&apos;Server running&apos;</span>);</div>
            <div>&#125;);</div>
          </div>
        </motion.div>

        {/* Small Bottom Right System Monitor Card */}
        <motion.div
          animate={!prefersReducedMotion ? { y: [5, -5, 5] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[14%] right-[1%] lg:right-[3%] xl:right-[4%] w-[210px] rounded-lg bg-[#07080e]/85 border border-white/[0.06] p-3 font-mono text-[10px] text-white/60 shadow-xl opacity-60"
          style={{
            transform: 'perspective(600px) rotateY(8deg)',
          }}
        >
          <div className="flex items-center justify-between text-white/80 mb-1.5 border-b border-white/[0.06] pb-1">
            <div className="flex items-center gap-1.5">
              <Activity size={11} className="text-[#22c55e]" />
              <span className="font-semibold text-[9px] tracking-wider">SYSTEM MONITOR</span>
            </div>
            <span className="text-[#22c55e] text-[9px]">ONLINE</span>
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between">
              <span className="text-white/40">Uptime</span>
              <span className="text-white/80">99.98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Latency</span>
              <span className="text-[#38bdf8]">18ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">AI Engine</span>
              <span className="text-[#a855f7]">Active</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── CHARACTER PORTRAIT (Prominent Right Side) ─── */}
      <div className="absolute inset-0 z-10 select-none pointer-events-none flex items-center justify-end">
        <motion.div
          className="relative w-full h-full flex items-end justify-end pr-0 md:pr-[2%] lg:pr-[3%]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Ambient Back Glow Behind Character */}
          <div
            className="absolute top-[25%] right-[2%] w-[45vw] max-w-[620px] aspect-square rounded-full opacity-35 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(56,189,248,0.06) 45%, transparent 70%)',
              filter: 'blur(75px)',
            }}
          />

          {/* Character Image */}
          <Image
            src="/pankaj.png"
            alt={personalInfo.name}
            width={1200}
            height={1600}
            priority
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 52vw, 42vw"
            className="h-[68vh] sm:h-[74vh] md:h-[82vh] max-h-[820px] w-auto object-contain object-bottom brightness-[0.98] contrast-[1.03] will-change-transform z-10"
          />

          {/* Seamless Edge Blends */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06060a] via-[#06060a]/70 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#06060a] to-transparent z-20 pointer-events-none hidden md:block" />
        </motion.div>
      </div>

      {/* ─── FLOATING TECHNOLOGY ICONS (Moved Right Framing Character) ─── */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
        {/* 1. React (Upper Left of Character) */}
        <motion.div
          className="absolute top-[16%] right-[41%] lg:right-[43%] xl:right-[44%]"
          animate={!prefersReducedMotion ? { y: [-6, 6, -6], rotateZ: [-2, 2, -2] } : undefined}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="group relative p-3 rounded-2xl bg-[#0c0d16]/85 border border-[#38bdf8]/30 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-default">
            <div className="absolute -inset-0.5 bg-[#38bdf8]/20 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <ReactIcon />
            </div>
          </div>
        </motion.div>

        {/* 2. Node.js (Mid Left of Character) */}
        <motion.div
          className="absolute top-[38%] right-[44%] lg:right-[46%] xl:right-[47%]"
          animate={!prefersReducedMotion ? { y: [6, -6, 6], rotateZ: [2, -2, 2] } : undefined}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="group relative p-3 rounded-2xl bg-[#0c0d16]/85 border border-[#22c55e]/30 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-default">
            <div className="absolute -inset-0.5 bg-[#22c55e]/20 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <NodeIcon />
            </div>
          </div>
        </motion.div>

        {/* 3. TypeScript (Lower Left of Character) */}
        <motion.div
          className="absolute top-[60%] right-[42%] lg:right-[44%] xl:right-[45%]"
          animate={!prefersReducedMotion ? { y: [-5, 5, -5], rotateZ: [-1.5, 1.5, -1.5] } : undefined}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="group relative p-3 rounded-2xl bg-[#0c0d16]/85 border border-[#3178c6]/40 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-default">
            <div className="absolute -inset-0.5 bg-[#3178c6]/20 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <TypeScriptIcon />
            </div>
          </div>
        </motion.div>

        {/* 4. Python (Upper Right of Character) */}
        <motion.div
          className="absolute top-[14%] right-[11%] lg:right-[13%] xl:right-[14%]"
          animate={!prefersReducedMotion ? { y: [6, -6, 6], rotateZ: [2, -2, 2] } : undefined}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <div className="group relative p-3 rounded-2xl bg-[#0c0d16]/85 border border-[#ffe052]/30 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-default">
            <div className="absolute -inset-0.5 bg-[#ffe052]/20 rounded-2xl blur-md opacity-35 group-hover:opacity-65 transition-opacity" />
            <div className="relative">
              <PythonIcon />
            </div>
          </div>
        </motion.div>

        {/* 5. PostgreSQL (Mid Right of Character) */}
        <motion.div
          className="absolute top-[38%] right-[5%] lg:right-[7%] xl:right-[8%]"
          animate={!prefersReducedMotion ? { y: [-6, 6, -6], rotateZ: [-2, 2, -2] } : undefined}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        >
          <div className="group relative p-3 rounded-2xl bg-[#0c0d16]/85 border border-[#60a5fa]/30 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-default">
            <div className="absolute -inset-0.5 bg-[#60a5fa]/20 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <PostgresIcon />
            </div>
          </div>
        </motion.div>

        {/* 6. Docker (Lower Right of Character) */}
        <motion.div
          className="absolute top-[58%] right-[7%] lg:right-[9%] xl:right-[10%]"
          animate={!prefersReducedMotion ? { y: [6, -6, 6], rotateZ: [1.5, -1.5, 1.5] } : undefined}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        >
          <div className="group relative p-3 rounded-2xl bg-[#0c0d16]/85 border border-[#38bdf8]/30 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-default">
            <div className="absolute -inset-0.5 bg-[#38bdf8]/20 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative">
              <DockerIcon />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── HERO CONTENT (Left Side - Fully Covering & Balancing Left Space) ─── */}
      <div className="relative z-30 max-w-[1700px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl xl:max-w-[780px] space-y-6 md:space-y-8">
          {/* Status Pill Badge */}
          <Reveal variant="fadeUp" delay={0.15}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a855f7]"></span>
              </span>
              <span className="text-[11px] md:text-[12px] font-mono font-bold tracking-[0.25em] text-white/80 uppercase">
                System Ready
              </span>
            </div>
          </Reveal>

          {/* Heading (Large & Bold Covering Left Area) */}
          <Reveal variant="fadeUp" delay={0.25}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[108px] font-black tracking-tight text-white leading-[0.98]">
              Hey, I&apos;m <br />
              <span className="bg-gradient-to-r from-white via-white to-[#a855f7] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.38)]">
                Pankaj
              </span>
            </h1>
          </Reveal>

          {/* Role / Title (Larger & Prominent) */}
          <Reveal variant="fadeUp" delay={0.35}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white/95">
              Full-Stack Engineer &amp; <span className="text-[#c084fc] drop-shadow-[0_0_25px_rgba(192,132,252,0.45)]">AI Enthusiast</span>
            </div>
          </Reveal>

          {/* Description (Enhanced Readability & Size) */}
          <Reveal variant="fadeUp" delay={0.45}>
            <p className="text-base sm:text-lg md:text-xl text-white/65 leading-relaxed font-normal max-w-xl lg:max-w-2xl">
              I build scalable web applications and AI powered solutions that solve real-world problems and create exceptional digital experiences.
            </p>
          </Reveal>

          {/* Action CTA Buttons (Larger & More Impactful) */}
          <Reveal variant="fadeUp" delay={0.55}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA: View Projects */}
              <a
                href="#projects"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className="group relative inline-flex items-center justify-center h-14 md:h-15 px-9 rounded-full bg-[#a855f7] text-white font-bold text-sm md:text-base tracking-[0.16em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-[1.03] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>View Projects</span>
                  <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#9333ea] to-[#c084fc] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* Secondary CTA: Download Resume */}
              <a
                href={personalInfo.resumeUrl}
                download
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className="group inline-flex items-center justify-center h-14 md:h-15 px-8 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 hover:text-white border border-white/12 hover:border-white/25 font-bold text-sm md:text-base tracking-[0.16em] uppercase backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95 gap-3"
              >
                <span>Download Resume</span>
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300 text-white/70 group-hover:text-white" />
              </a>
            </div>
          </Reveal>

          {/* Stats Glass Cards (Larger & Beautifully Proportioned) */}
          <Reveal variant="fadeUp" delay={0.65}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-2xl">
              {/* Stat 1 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md text-center group hover:bg-white/[0.06] hover:border-[#a855f7]/40 transition-all duration-300">
                <div className="flex justify-center mb-1 text-[#a855f7]/80 group-hover:text-[#a855f7] transition-colors">
                  <Rocket size={18} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">20+</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/45 font-medium mt-0.5">Projects Built</div>
              </div>

              {/* Stat 2 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md text-center group hover:bg-white/[0.06] hover:border-[#a855f7]/40 transition-all duration-300">
                <div className="flex justify-center mb-1 text-[#38bdf8]/80 group-hover:text-[#38bdf8] transition-colors">
                  <Code2 size={18} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">2+</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/45 font-medium mt-0.5">Years Exp</div>
              </div>

              {/* Stat 3 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md text-center group hover:bg-white/[0.06] hover:border-[#a855f7]/40 transition-all duration-300">
                <div className="flex justify-center mb-1 text-[#fb923c]/80 group-hover:text-[#fb923c] transition-colors">
                  <Coffee size={18} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">∞</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/45 font-medium mt-0.5">Cups Coffee</div>
              </div>

              {/* Stat 4 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md text-center group hover:bg-white/[0.06] hover:border-[#a855f7]/40 transition-all duration-300">
                <div className="flex justify-center mb-1 text-[#f43f5e]/80 group-hover:text-[#f43f5e] transition-colors">
                  <Heart size={18} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/45 font-medium mt-0.5">Dedication</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── BOTTOM SCROLL TO EXPLORE INDICATOR ─── */}
      <div className="relative z-30 w-full flex flex-col items-center justify-center pt-6 pointer-events-none">
        <Reveal variant="fadeIn" delay={0.9}>
          <div className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
            {/* Scroll Mouse Icon */}
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={!prefersReducedMotion ? { y: [0, 8, 0], opacity: [1, 0.2, 1] } : undefined}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1.5 rounded-full bg-[#a855f7]"
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-medium">Scroll to Explore</span>
          </div>
        </Reveal>
      </div>

      {/* Very Subtle Ambient Noise Overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
    </section>
  );
};


