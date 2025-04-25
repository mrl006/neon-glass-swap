
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center">
        <img 
          src="/lovable-uploads/51795e6b-e18f-4286-8f11-9b28f751754c.png" 
          alt="Web3D Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-xl font-bold gradient-text">Web3D Glassless Swap</span>
    </Link>
  );
};

export default Logo;
