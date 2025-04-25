
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../services/walletService';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../models/TokenModel';

const NavigationBar = () => {
  const { connectWallet, isConnected, web3dBalance } = useWallet();
  const location = useLocation();
  const web3dToken = getToken('web3d');

  return (
    <nav className="sticky top-0 z-50 py-3 px-4 w-full backdrop-blur-2xl bg-black/30 border-b border-white/5 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/"
              className={`relative text-sm font-medium tracking-wide transition-all group ${
                location.pathname === '/' 
                  ? 'text-neon-purple font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              <span className="relative z-10">Swap</span>
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 transform scale-x-0 transition-transform duration-200 bg-neon-purple 
                ${location.pathname === '/' ? 'scale-x-100' : ''} group-hover:scale-x-100`}></span>
            </Link>
            <Link
              to="/explorer"
              className={`relative text-sm font-medium tracking-wide transition-all group ${
                location.pathname === '/explorer' 
                  ? 'text-neon-purple font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              <span className="relative z-10">Explorer</span>
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 transform scale-x-0 transition-transform duration-200 bg-neon-purple 
                ${location.pathname === '/explorer' ? 'scale-x-100' : ''} group-hover:scale-x-100`}></span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
              <img 
                src={web3dToken?.logo} 
                alt="WEB3D" 
                className="w-5 h-5 rounded-full"
              />
              <span className="text-sm font-medium text-neon-purple">
                {web3dBalance} WEB3D
              </span>
            </div>
          )}
          
          <Button 
            onClick={connectWallet} 
            className={`
              relative overflow-hidden font-medium px-6 py-2 transition-all duration-300 before:absolute before:inset-0 before:transition-transform before:duration-300
              ${isConnected 
                ? 'bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 before:bg-neon-purple/5'
                : 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:from-neon-purple-light hover:to-neon-pink-light before:scale-x-0 hover:before:scale-x-100'
              }
            `}
            disabled={isConnected}
          >
            <span className="relative z-10">
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

