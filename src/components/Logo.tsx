
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/b6468d90-2231-4e88-8aa4-af036fd15a1a.png" 
        alt="Glassless Swap Logo" 
        className="w-10 h-10 object-contain"
      />
      <span className="text-xl font-bold text-white">Glassless</span>
    </Link>
  );
};

export default Logo;
