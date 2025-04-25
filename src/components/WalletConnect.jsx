
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWalletContext } from '../context/WalletContext';

const WalletConnect = () => {
  const { address, isConnected, web3dBalance, isEligible, isLoading, connectWallet, disconnect } = useWalletContext();
  
  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="glass-panel p-4 w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      {isConnected ? (
        <>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isEligible ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <p className="font-medium">{formatAddress(address)}</p>
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {isEligible ? (
                <span className="text-green-400">Eligible: {web3dBalance} WEB3D</span>
              ) : (
                <span className="text-red-400">Need {100 - web3dBalance} more WEB3D</span>
              )}
            </div>
          </div>
          <Button 
            onClick={disconnect}
            variant="outline" 
            size="sm"
            className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white"
          >
            Disconnect
          </Button>
        </>
      ) : (
        <>
          <div className="text-gray-300">Connect wallet to continue</div>
          <Button
            onClick={connectWallet}
            disabled={isLoading}
            className="neon-button"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        </>
      )}
    </div>
  );
};

export default WalletConnect;
