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
    <nav className="sticky top-0 z-50 py-5 px-4 w-full">
      {/* Glowing background effect */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/30 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-pink/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-[-50%] left-[25%] w-[200px] h-[200px] bg-neon-purple/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-50%] right-[25%] w-[200px] h-[200px] bg-neon-pink/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-8">
          <Logo />
          
          <div className="hidden sm:flex items-center gap-8 mt-2">
            <Link
              to="/"
              className={`group relative overflow-hidden px-6 py-3 transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'text-neon-purple font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              <span className="relative z-10">Swap</span>
              <span className={`absolute inset-0 rounded-lg transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100
                ${location.pathname === '/' ? 'bg-neon-purple/10 scale-x-100' : 'bg-white/5'}`} />
            </Link>
            <Link
              to="/explorer"
              className={`group relative overflow-hidden px-6 py-3 transition-all duration-300 ${
                location.pathname === '/explorer' 
                  ? 'text-neon-purple font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              <span className="relative z-10">Explorer</span>
              <span className={`absolute inset-0 rounded-lg transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100
                ${location.pathname === '/explorer' ? 'bg-neon-purple/10 scale-x-100' : 'bg-white/5'}`} />
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-neon-purple/5 border border-neon-purple/10 backdrop-blur-md animate-fade-in shadow-lg shadow-neon-purple/5">
              <div className="w-8 h-8 rounded-full bg-neon-purple/10 p-1.5 ring-1 ring-neon-purple/20">
                <img 
                  src={web3dToken?.logo} 
                  alt="WEB3D" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-300">Balance</span>
                <span className="text-base font-semibold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  {web3dBalance} WEB3D
                </span>
              </div>
            </div>
          )}
          
          <Button 
            onClick={connectWallet} 
            className={`
              relative overflow-hidden px-6 py-2.5 rounded-xl font-medium transition-all duration-300 
              ${isConnected 
                ? 'bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 shadow-lg shadow-neon-purple/10'
                : 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:opacity-90 shadow-lg shadow-neon-pink/20'
              }
              before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500
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
