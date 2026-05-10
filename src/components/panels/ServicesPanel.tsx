'use client';

import { services } from '@/data/services';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export const ServicesPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service, i) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (Icons as any)[service.icon] || Icons.HelpCircle;
        return (
          <motion.div key={service.title} className="glass-card rounded-xl p-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${service.color}15`, color: service.color }}>
              <Icon size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mb-2">{service.title}</h4>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
