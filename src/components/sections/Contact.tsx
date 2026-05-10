'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Magnetic } from '@/components/animations/Magnetic';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import { useCursorStore } from '@/store/useCursorStore';
import { Send, MapPin, Mail, Clock } from 'lucide-react';

export const Contact = () => {
  const { setCursorType } = useCursorStore();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1500));
    setIsSending(false);
    setFormState({ name: '', email: '', message: '' });
    alert('Message sent! (Demo — connect your backend for production)');
  };

  return (
    <Section id="contact" className="relative">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Contact Info */}
        <div className="space-y-8">
          <Reveal variant="fadeUp">
            <span className="section-label">Get In Touch</span>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <Typography variant="title" as="h2" className="text-4xl md:text-5xl text-gradient">
              Let&apos;s Build<br />
              <span className="text-gradient-accent text-glow">Something Great</span>
            </Typography>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.2}>
            <Typography className="text-text-secondary text-lg leading-relaxed max-w-md">
              Available for freelance projects, full-time roles, and creative collaborations. I respond within 24 hours.
            </Typography>
          </Reveal>

          {/* Contact Details */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <Typography className="text-xs text-text-muted uppercase tracking-widest">Email</Typography>
                  <Typography className="text-white text-sm font-medium">{personalInfo.email}</Typography>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <Typography className="text-xs text-text-muted uppercase tracking-widest">Location</Typography>
                  <Typography className="text-white text-sm font-medium">{personalInfo.location}</Typography>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Clock size={16} className="text-accent" />
                </div>
                <div>
                  <Typography className="text-xs text-text-muted uppercase tracking-widest">Availability</Typography>
                  <Typography className="text-accent text-sm font-medium">Open for opportunities</Typography>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Socials */}
          <Reveal variant="fadeUp" delay={0.4}>
            <div className="flex gap-4 pt-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className="w-10 h-10 glass-card-hover rounded-xl flex items-center justify-center text-text-muted hover:text-accent text-xs font-bold"
                >
                  {social.name.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: Form */}
        <Reveal variant="fadeUp" delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-card-hover animated-border rounded-3xl p-8 md:p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-text-muted uppercase tracking-widest font-bold">Name</label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                placeholder="Your name"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-white text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-text-muted uppercase tracking-widest font-bold">Email</label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                placeholder="your@email.com"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-white text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-text-muted uppercase tracking-widest font-bold">Message</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                placeholder="Tell me about your project..."
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-white text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>

            <Magnetic strength={0.2}>
              <button
                type="submit"
                disabled={isSending}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSending ? 'SENDING...' : 'SEND MESSAGE'}
                <Send size={16} />
              </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </Section>
  );
};
