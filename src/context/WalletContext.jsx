
import React, { createContext, useContext } from 'react';
import { useWallet } from '../services/walletService';

const WalletContext = createContext(undefined);

export const WalletProvider = ({ children }) => {
  const walletData = useWallet();
  
  return (
    <WalletContext.Provider value={walletData}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
