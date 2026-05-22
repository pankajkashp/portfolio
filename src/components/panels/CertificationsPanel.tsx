import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Award, ShieldCheck, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { useCursorStore } from '@/store/useCursorStore';
import { certifications, Certification } from '@/data/certifications';

function CertificationDetail({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const { setCursorType } = useCursorStore();

  const isPdf = cert.fileUrl?.toLowerCase().endsWith('.pdf');

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#06060a]/98 backdrop-blur-3xl" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-6xl h-[85vh] bg-[#0d0d12] rounded-[3rem] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Left: Credential Preview */}
        <div className="relative bg-black/40 overflow-hidden flex flex-col">
          <div className="flex-1 relative group m-6 md:m-10 rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10">
            {cert.fileUrl ? (
              isPdf ? (
                <iframe
                  src={`${cert.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-none"
                  title={cert.title}
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image src={cert.fileUrl} alt={cert.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-contain" />
                </div>
              )
            ) : cert.image ? (
              <div className="relative w-full h-full">
                <Image src={cert.image} alt={cert.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-contain" />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/10">
                <Award size={120} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-[0.5em] font-black">Credential Preview</span>
              </div>
            )}
            
            {/* Interactive Overlay for PDF */}
            {cert.fileUrl && isPdf && (
              <div className="absolute top-4 right-4 z-10">
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener"
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#eab308] hover:text-black transition-all duration-300 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <ExternalLink size={14} /> View Full
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Details */}
        <div className="p-8 md:p-16 overflow-y-auto modal-scroll flex flex-col" data-lenis-prevent>
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#eab308]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#eab308] font-black">Certification Details</span>
            </div>
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1]">
                {cert.title}
              </h3>
              <p className="text-lg text-white/40 font-light leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
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
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Status</h4>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#22c55e] font-black">
                  <ShieldCheck size={12} /> Standard Authenticated
                </div>
              </div>
            </div>

            <div className="pt-12 space-y-4 mt-auto">
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener"
                  className="w-full h-16 rounded-2xl bg-[#eab308] flex items-center justify-center gap-3 text-black font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Verify Online <ExternalLink size={16} />
                </a>
              )}
              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  download
                  className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all duration-300"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Download Document
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
            className="group relative p-10 rounded-[2.5rem] bg-[#0b0b13]/55 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.28)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(c)}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-[#eab308]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015)_35%,transparent_70%)] pointer-events-none" />

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
