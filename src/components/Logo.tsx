import React from 'react';
import { Link } from 'react-router-dom';
const Logo = () => {
  return <Link to="/" className="flex items-center gap-2">
      <img alt="Glassless Swap Logo" className="w-10 h-10 object-contain" src="/lovable-uploads/51f6ab74-7aae-4b3d-b039-a6bfefb5b08c.png" />
      
    </Link>;
};
export default Logo;