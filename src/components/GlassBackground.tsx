
import React from 'react';

const GlassBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0d0b1e]">
      {/* Dynamic gradient orbs with improved positioning and animations */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-neon-purple opacity-20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neon-blue opacity-15 blur-[100px] animate-pulse" />
      <div className="absolute top-[20%] right-[30%] w-[400px] h-[400px] rounded-full bg-neon-purple-vivid opacity-10 blur-[80px] animate-pulse" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassBackground;
