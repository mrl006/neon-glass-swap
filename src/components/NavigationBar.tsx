
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../services/walletService';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const { connectWallet, isConnected } = useWallet();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 py-4 px-6 w-full backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium tracking-wide transition-all hover:text-neon-purple hover:scale-105 ${
                location.pathname === '/' 
                  ? 'text-neon-purple font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              Swap
            </Link>
            <Link
              to="/explorer"
              className={`text-sm font-medium tracking-wide transition-all hover:text-neon-purple hover:scale-105 ${
                location.pathname === '/explorer' 
                  ? 'text-neon-purple font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              Explorer
            </Link>
          </div>
        </div>
        
        <Button 
          onClick={connectWallet} 
          className={`
            font-medium px-6 transition-all duration-300
            ${isConnected 
              ? 'bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30'
              : 'bg-neon-purple text-white hover:bg-neon-purple-light hover:scale-105'
            }
          `}
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
