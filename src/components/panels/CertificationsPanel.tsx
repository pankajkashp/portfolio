import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { useCursorStore } from '@/store/useCursorStore';
import { certifications, Certification } from '@/data/certifications';

function CertificationDetail({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const { setCursorType } = useCursorStore();

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#06060a]/98 backdrop-blur-3xl" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-5xl bg-[#0d0d12] rounded-[3rem] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_1fr]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Left: Credential Preview */}
        <div className="relative bg-black/40 overflow-hidden flex items-center justify-center p-8 md:p-16">
          <div className="w-full aspect-[1.4/1] rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden group">
            {cert.image ? (
              <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-white/10">
                <Award size={80} />
                <span className="text-[10px] uppercase tracking-[0.5em] font-black">Credential Preview</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/60 to-transparent" />
          </div>
        </div>

        {/* Right: Technical Details */}
        <div className="p-8 md:p-16 overflow-y-auto modal-scroll flex flex-col pb-24" data-lenis-prevent>
          <button
            onClick={onClose}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            className="self-end w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300 mb-12"
          >
            <X size={20} />
          </button>

          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#eab308]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#eab308] font-black">Certificate Verified</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                {cert.title}
              </h3>
              <p className="text-base text-white/40 font-light leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Issuer</h4>
                <p className="text-sm text-white font-medium">{cert.issuer}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Issued Year</h4>
                <p className="text-sm text-white font-medium">{cert.year}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Credential ID</h4>
                <p className="text-xs text-[#eab308] font-mono break-all">{cert.id}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Security</h4>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#22c55e] font-black">
                  <ShieldCheck size={12} /> Standard Authenticated
                </div>
              </div>
            </div>

            <div className="pt-8">
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener"
                  className="w-full h-16 rounded-2xl bg-[#eab308] flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Verify Credential <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const CertificationsPanel = () => {
  const { setCursorType } = useCursorStore();
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <div className="space-y-12 py-10">
      <div className="space-y-3 mb-16">
        <h3 className="text-lg font-black uppercase tracking-[0.5em] text-[#eab308]">My Certificates</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((c, i) => (
          <motion.div
            key={i}
            className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(c)}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-[#eab308]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#eab308]/10 text-[#eab308] group-hover:bg-[#eab308] group-hover:text-black transition-all duration-500">
                <Award size={32} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">
                ID: {c.id}
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#eab308] transition-colors">{c.title}</h4>
              <p className="text-xs font-bold uppercase tracking-widest text-[#eab308]/60 group-hover:text-white/60">{c.issuer} • {c.year}</p>
              <p className="text-sm text-white/30 leading-relaxed font-light line-clamp-2">
                {c.description}
              </p>

              <div className="pt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#22c55e]">
                  <ShieldCheck size={12} /> Verified
                </div>
                <div className="h-3 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/20 group-hover:text-white transition-colors">
                  Details <ArrowUpRight size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <CertificationDetail cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
