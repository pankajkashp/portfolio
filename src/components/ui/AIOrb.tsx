'use client';

import React from 'react';

const AIOrb: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-36 h-36 rounded-full border-2 border-[#ff6b00]/30 flex items-center justify-center relative">
        <div className="w-20 h-20 rounded-full bg-[#ff6b00] opacity-20 blur-xl" />
        <div className="absolute w-3 h-3 rounded-full bg-[#ff6b00] shadow-[0_0_15px_#ff6b00]" />
      </div>
    </div>
  );
};

export default AIOrb;
