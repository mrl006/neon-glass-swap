
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg" />
      <span className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
        Glassless
      </span>
    </div>
  );
};

export default Logo;
