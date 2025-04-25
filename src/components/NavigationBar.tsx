
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../services/walletService';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const { connectWallet, isConnected } = useWallet();
  const location = useLocation();

  return (
    <nav className="py-4 px-6 w-full backdrop-blur-md bg-black/10 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-neon-purple ${
                location.pathname === '/' ? 'text-neon-purple' : 'text-gray-300'
              }`}
            >
              Swap
            </Link>
            <Link
              to="/explorer"
              className={`text-sm font-medium transition-colors hover:text-neon-purple ${
                location.pathname === '/explorer' ? 'text-neon-purple' : 'text-gray-300'
              }`}
            >
              Explorer
            </Link>
          </div>
        </div>
        
        <Button 
          onClick={connectWallet} 
          className="bg-gray-800 text-white hover:bg-gray-700"
          disabled={isConnected}
        >
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
