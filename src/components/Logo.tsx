
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/tokens/web3d.png" 
        alt="Glassless Swap Logo" 
        className="w-10 h-10 object-contain"
      />
      <span className="text-xl font-bold text-white">Glassless</span>
    </Link>
  );
};

export default Logo;
