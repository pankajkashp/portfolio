'use client';

import { motion } from 'framer-motion';
import { FlaskConical, ExternalLink } from 'lucide-react';

const experiments = [
  { title: 'Autonomous Code Reviewer', description: 'LLM-powered agent that reviews pull requests, detects anti-patterns, and suggests refactors autonomously.', tech: ['LangChain', 'GPT-4', 'GitHub API'], status: 'Active' },
  { title: 'Voice-Driven UI Builder', description: 'Experimental system that generates React components from natural language voice commands in real-time.', tech: ['Whisper', 'React', 'WebSockets'], status: 'Prototype' },
  { title: 'Neural Style Transfer Engine', description: 'Real-time artistic style transfer on webcam feeds using optimized neural networks running in the browser.', tech: ['TensorFlow.js', 'WebGL', 'ONNX'], status: 'Archived' },
];

export const AILabPanel = () => (
  <div className="space-y-4">
    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
      Cutting-edge AI experiments and prototypes. These are passion projects exploring the boundaries of what&apos;s possible.
    </p>
    {experiments.map((exp, i) => (
      <motion.div key={i} className="glass-card rounded-xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>
            <FlaskConical size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{exp.title}</h4>
              <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${exp.status === 'Active' ? 'bg-green-500/10 text-green-400' : exp.status === 'Prototype' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-white/5 text-white/30'}`}>{exp.status}</span>
            </div>
            <p className="text-[12px] leading-relaxed mt-1.5" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {exp.tech.map(t => (
                <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/[0.04]" style={{ color: 'var(--text-muted)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);
