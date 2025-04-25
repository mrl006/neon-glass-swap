
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '../services/walletService';
import Logo from './Logo';
import NavigationItems from './NavigationItems';

const NavigationBar = () => {
  const { connectWallet, isConnected } = useWallet();

  return (
    <nav className="py-4 px-6 w-full backdrop-blur-md bg-black/10 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <NavigationItems />
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
