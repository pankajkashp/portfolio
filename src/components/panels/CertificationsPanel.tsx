'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';
import { useCursorStore } from '@/store/useCursorStore';

import { certifications } from '@/data/certifications';

export const CertificationsPanel = () => {
  const { setCursorType } = useCursorStore();

  return (
    <div className="space-y-12 py-10">
      <div className="space-y-3 mb-16">
        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-[#eab308]">Professional Dossier</h3>
        <p className="text-white/40 text-lg font-light">Verified credentials and technical certifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((c, i) => (
          <motion.div 
            key={i} 
            className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#eab308]/10 text-[#eab308] group-hover:scale-110 transition-transform duration-500">
                <Award size={32} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-[#eab308] transition-colors">
                ID: {c.id}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">{c.title}</h4>
              <p className="text-xs font-bold uppercase tracking-widest text-[#eab308]/60">{c.issuer} • {c.year}</p>
              <p className="text-sm text-white/30 leading-relaxed font-light">
                {c.description}
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#22c55e]">
                  <ShieldCheck size={12} /> Verified
                </div>
                <div className="h-3 w-px bg-white/10" />
                <button 
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  View Credential <ExternalLink size={10} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
