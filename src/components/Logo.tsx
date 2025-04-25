
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return <Link to="/" className="flex items-center gap-2">
      <img 
        alt="Web3D Logo" 
        className="w-9 h-9 object-contain"  // Changed from w-10 h-10 to w-9 h-9 to match button size
        src="/lovable-uploads/51f6ab74-7aae-4b3d-b039-a6bfefb5b08c.png" 
      />
    </Link>;
};

export default Logo;
