
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  web3dBalance: number;
  isEligible: boolean;
}

const initialState: WalletState = {
  address: null,
  chainId: null,
  isConnected: false,
  web3dBalance: 0,
  isEligible: false
};

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not installed");
      return false;
    }

    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (accounts.length > 0) {
        // Simulate Web3D token balance check
        // In a real implementation, this would be a contract call
        const web3dBalance = simulateWeb3DBalance(accounts[0]);
        const isEligible = web3dBalance >= 100;
        
        setWalletState({
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          isConnected: true,
          web3dBalance,
          isEligible
        });
        
        return true;
      }
    } catch (error) {
      console.error("Error connecting to wallet", error);
    } finally {
      setIsLoading(false);
    }
    
    return false;
  };

  const disconnect = () => {
    setWalletState(initialState);
  };

  // Simulate Web3D token balance based on address
  const simulateWeb3DBalance = (address: string): number => {
    // This would be replaced with actual contract call in production
    // Using the last digit of the address to simulate a balance
    const lastChar = address.slice(-1);
    const lastDigit = parseInt(lastChar, 16);
    
    // If lastDigit is 8 or higher, they have 100+ tokens
    return lastDigit >= 8 ? 100 + lastDigit * 10 : lastDigit * 10;
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          disconnect();
        } else if (walletState.address !== accounts[0]) {
          // Account changed, update state
          await connectWallet();
        }
      };

      const handleChainChanged = () => {
        // Chain changed, refresh the page as recommended by MetaMask
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [walletState.address]);

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error("Error checking connection", error);
        }
      }
    };

    checkConnection();
  }, []);

  return {
    ...walletState,
    isLoading,
    connectWallet,
    disconnect
  };
};
