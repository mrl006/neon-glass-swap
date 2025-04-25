
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <Avatar>
        <AvatarImage 
          src="/lovable-uploads/89053613-a449-47b3-a5d1-39b1e595d107.png" 
          alt="Web3D Logo" 
        />
        <AvatarFallback>
          <User className="w-6 h-6 text-white" />
        </AvatarFallback>
      </Avatar>
      <span className="text-xl font-bold gradient-text">WEB3D GASLESS SWAP</span>
    </Link>
  );
};

export default Logo;

