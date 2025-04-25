
import React from 'react';

const GlassBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0d0b1e]">
      {/* Dynamic gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon-purple opacity-30 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-neon-blue opacity-20 blur-[100px] animate-pulse" />
      <div className="absolute top-[30%] left-[50%] w-[300px] h-[300px] rounded-full bg-neon-purple-vivid opacity-20 blur-[100px] animate-pulse" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default GlassBackground;
