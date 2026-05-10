'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, School } from 'lucide-react';

const education = [
  { 
    degree: 'Bachelor of Technology — Computer Science', 
    institution: 'University of Technology', 
    year: '2020 – 2024', 
    description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with distinction. Focused on neural architectures and distributed systems.' 
  },
  { 
    degree: 'Higher Secondary (12th)', 
    institution: 'Science Stream', 
    year: '2018 – 2020', 
    description: 'Advanced coursework in Physics, Chemistry, Mathematics, and Computer Science. Secured top honors in regional competitive exams.' 
  },
];

export const EducationPanel = () => {
  return (
    <div className="space-y-12 py-10">
      <div className="space-y-3 mb-16">
        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-[#a855f7]">Academic Records</h3>
        <p className="text-white/40 text-lg font-light">Educational foundations and certifications.</p>
      </div>

      <div className="space-y-8">
        {education.map((edu, i) => (
          <motion.div 
            key={i} 
            className="group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col md:flex-row gap-10 items-start" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.15 }}
          >
            <div className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center bg-[#a855f7]/10 text-[#a855f7] group-hover:scale-110 transition-transform duration-500">
              <GraduationCap size={32} />
            </div>
            
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-[#a855f7] transition-colors">{edu.degree}</h4>
                <div className="flex flex-wrap gap-6 items-center pt-2">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                      <School size={14} className="text-[#a855f7]" /> {edu.institution}
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                      <Calendar size={14} className="text-[#a855f7]" /> {edu.year}
                   </div>
                </div>
              </div>
              
              <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-3xl">
                {edu.description}
              </p>
            </div>

            {/* Decorative Link Icon */}
            <div className="hidden md:block absolute top-10 right-10 opacity-10 group-hover:opacity-40 transition-opacity">
               <School size={60} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
