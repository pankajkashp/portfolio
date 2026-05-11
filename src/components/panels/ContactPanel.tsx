'use client';

import { useState } from 'react';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import { motion } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, MapPin, Mail, Clock, ShieldCheck, Globe } from 'lucide-react';

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
    alert('Signal transmitted successfully.');
  };

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-black uppercase tracking-[0.5em] text-[#3b82f6]">Get In Touch</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20">
        {/* Connection Intel */}
        <div className="space-y-12">
          <div className="space-y-8">
            {[
              { icon: <Mail size={20} />, label: 'Mail Id', value: personalInfo.email, color: '#3b82f6' },
              { icon: <MapPin size={20} />, label: 'Location', value: personalInfo.location, color: '#3b82f6' },
              { icon: <ShieldCheck size={20} />, label: 'Status', value: 'Ready to Work', color: '#22c55e' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{ background: `${item.color}10`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{item.label}</p>
                  <p className="text-sm md:text-base text-white font-medium group-hover:text-[#3b82f6] transition-colors">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.5em] text-[#3b82f6]">Feel Free To Reach Out</h4>
            <div className="flex flex-wrap gap-4">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:border-[#3b82f6]/40 transition-all duration-300"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {s.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Transmission Interface */}
        <form onSubmit={handleSubmit} className="space-y-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Name', type: 'text', key: 'name' as const, placeholder: 'Enter your name' },
              { label: 'Gmail', type: 'email', key: 'email' as const, placeholder: 'Enter your email' },
            ].map(f => (
              <div key={f.key} className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{f.label}</label>
                <input
                  type={f.type}
                  required
                  value={form[f.key]}
                  onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-[#3b82f6]/40 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">What do you want to discuss</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
              placeholder="Share your idea, project requirements, or collaboration goals."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-[#3b82f6]/40 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full h-20 rounded-2xl bg-[#3b82f6] flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.4em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            {sending ? 'TRANSMITTING...' : 'Send Mail'} <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
