
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '../services/walletService';

const NavigationBar = () => {
  const { connectWallet, isConnected } = useWallet();

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Bridge', href: '/bridge' },
    { label: 'Swap', href: '/' },
    { label: 'Pools', href: '/pools' },
    { label: 'Stake', href: '/stake' },
    { label: 'Explorer', href: '/explorer' },
  ];

  return (
    <nav className="py-4 px-6 w-full backdrop-blur-md bg-black/10 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg" />
          <span className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Glassless
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Button 
          onClick={connectWallet} 
          className="neon-button"
          disabled={isConnected}
        >
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
