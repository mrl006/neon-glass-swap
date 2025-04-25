
import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet, WalletState } from '../services/walletService';

interface WalletContextType extends WalletState {
  isLoading: boolean;
  connectWallet: () => Promise<boolean>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const walletData = useWallet();
  
  return (
    <WalletContext.Provider value={walletData}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
