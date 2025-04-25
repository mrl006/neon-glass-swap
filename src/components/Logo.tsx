
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
        <Globe className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold gradient-text">
        SwapX
      </span>
    </Link>
  );
};

export default Logo;
