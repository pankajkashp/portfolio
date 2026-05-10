'use client';

import { useState } from 'react';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import { motion } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, MapPin, Mail, Clock } from 'lucide-react';

export const ContactPanel = () => {
  const { setCursorType } = useCursorStore();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setForm({ name: '', email: '', message: '' });
    alert('Message sent! (Demo)');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Info */}
      <div className="space-y-6">
        <div className="space-y-4">
          {[
            { icon: <Mail size={16} />, label: 'Email', value: personalInfo.email },
            { icon: <MapPin size={16} />, label: 'Location', value: personalInfo.location },
            { icon: <Clock size={16} />, label: 'Availability', value: 'Open for opportunities' },
          ].map((item, i) => (
            <motion.div key={item.label} className="flex items-center gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb),0.1)', color: 'var(--accent)' }}>
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                <p className="text-sm text-white font-medium">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener" className="glass-card px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-accent/30 transition-colors" style={{ color: 'var(--text-muted)' }}
              onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')}>
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', type: 'text', key: 'name' as const, placeholder: 'Your name' },
          { label: 'Email', type: 'email', key: 'email' as const, placeholder: 'your@email.com' },
        ].map(f => (
          <div key={f.key} className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
            <input type={f.type} required value={form[f.key]} onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors" />
          </div>
        ))}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>Message</label>
          <textarea required rows={4} value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} placeholder="Tell me about your project..."
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors resize-none" />
        </div>
        <button type="submit" disabled={sending} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          onMouseEnter={() => setCursorType('pointer')} onMouseLeave={() => setCursorType('default')}>
          {sending ? 'SENDING...' : 'SEND MESSAGE'} <Send size={14} />
        </button>
      </form>
    </div>
  );
};
