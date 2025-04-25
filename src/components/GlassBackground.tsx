
import React from 'react';

const GlassBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Gradient orbs in the background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-neon-purple opacity-30 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-neon-blue opacity-20 blur-[100px] animate-pulse" />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-neon-purple-vivid opacity-20 blur-[100px] animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
};

export default GlassBackground;
