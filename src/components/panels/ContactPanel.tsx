'use client';

import { useState } from 'react';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import { motion } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, MapPin, Mail, ShieldCheck, MessageSquare, User } from 'lucide-react';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { LinkedinIcon } from '@/components/icons/LinkedinIcon';
import { LeetcodeIcon } from '@/components/icons/LeetcodeIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { toast } from 'sonner';

const getSocialIcon = (name: string, size: number) => {
  const n = name.toLowerCase();
  if (n.includes('github')) return <GithubIcon size={size} />;
  if (n.includes('linkedin')) return <LinkedinIcon size={size} />;
  if (n.includes('leetcode')) return <LeetcodeIcon size={size} />;
  if (n.includes('instagram')) return <InstagramIcon size={size} />;
  return <Mail size={size} />;
};

export const ContactPanel = () => {
  const { setCursorType } = useCursorStore();
  const [form, setForm] = useState({ name: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error('Please complete all fields before transmitting.');
      return;
    }

    setSending(true);
    const toastId = toast.loading('Establishing secure connection...');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Signal transmitted successfully! I will reach out soon.', { id: toastId });
        setForm({ name: '', message: '' });
      } else {
        toast.error('Transmission failed. Direct email: ' + personalInfo.email, { id: toastId });
      }
    } catch (error) {
      toast.error('Network interruption detected. Please try again.', { id: toastId });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-12 py-6">

      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        {/* Left: Contact Info */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: <Mail size={18} />, label: 'Direct Mail', value: personalInfo.email, color: '#3b82f6' },
              { icon: <MapPin size={18} />, label: 'Current Base', value: personalInfo.location, color: '#3b82f6' },
              { icon: <ShieldCheck size={18} />, label: 'Availability', value: 'Open for Projects', color: '#22c55e' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${item.color}10`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Get in touch</p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#3b82f6] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/5 transition-all duration-300"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  {getSocialIcon(s.name, 20)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Modern Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative p-1 space-y-6"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 space-y-8 relative overflow-hidden group">
            {/* Input Groups */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  <User size={12} className="text-[#3b82f6]" /> Your Identity
                </div>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  <MessageSquare size={12} className="text-[#3b82f6]" /> Enter The Message
                </div>
                <textarea
                  required
                  rows={8}
                  value={form.message}
                  onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                  placeholder="What shall we build? Share your ideas, project goals, or just say hi..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.05] transition-all duration-300 resize-none leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group/btn relative w-full h-16 rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#2563eb] flex items-center justify-center gap-4 text-white font-bold uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              {sending ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Transmitting...
                </div>
              ) : (
                <>
                  Let’s Connect <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};
