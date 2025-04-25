
import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowDown, Search, Copy, ChevronDown, Zap } from 'lucide-react';

// Create Wallet Context
const WalletContext = createContext();

// Create QueryClient
const queryClient = new QueryClient();

// Wallet Provider Component
const WalletProvider = ({ children }) => {
  const [walletState, setWalletState] = useState({
    address: null,
    isConnected: false,
    web3dBalance: 0,
    isEligible: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return false;
    
    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3dBalance = Math.random() * 200; // Simulate balance
      const isEligible = web3dBalance >= 100;
      
      setWalletState({
        address: accounts[0],
        isConnected: true,
        web3dBalance,
        isEligible
      });
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setWalletState({
      address: null,
      isConnected: false,
      web3dBalance: 0,
      isEligible: false
    });
  };

  return (
    <WalletContext.Provider value={{
      ...walletState,
      isLoading,
      connectWallet,
      disconnect
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// Home Page Component
const Home = () => {
  const { isConnected, web3dBalance, isEligible, connectWallet, disconnect } = useContext(WalletContext);
  const [swapState, setSwapState] = useState({
    fromToken: { symbol: 'WBNB', logo: '/tokens/wbnb.png' },
    toToken: { symbol: 'BUSD', logo: '/tokens/busd.png' },
    amount: '',
    quote: null
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto glass-panel p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">Swap Tokens</h2>
          <Button 
            onClick={isConnected ? disconnect : connectWallet}
            className="neon-button"
          >
            {isConnected ? `Connected (${web3dBalance.toFixed(2)} WEB3D)` : 'Connect Wallet'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* From Token Input */}
          <div className="glass-input-container">
            <input
              type="text"
              placeholder="0.0"
              value={swapState.amount}
              onChange={(e) => setSwapState(prev => ({ ...prev, amount: e.target.value }))}
              className="glass-input"
            />
            <Button className="token-select-button">
              <img src={swapState.fromToken.logo} alt={swapState.fromToken.symbol} className="w-6 h-6" />
              <span>{swapState.fromToken.symbol}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center">
            <Button 
              className="swap-direction-button"
              onClick={() => setSwapState(prev => ({
                ...prev,
                fromToken: prev.toToken,
                toToken: prev.fromToken
              }))}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>

          {/* To Token Input */}
          <div className="glass-input-container">
            <input
              type="text"
              placeholder="0.0"
              value={swapState.quote || ''}
              readOnly
              className="glass-input"
            />
            <Button className="token-select-button">
              <img src={swapState.toToken.logo} alt={swapState.toToken.symbol} className="w-6 h-6" />
              <span>{swapState.toToken.symbol}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Swap Button */}
          <Button 
            className="w-full neon-button"
            disabled={!isConnected || !isEligible}
          >
            {!isConnected ? 'Connect Wallet' : 
             !isEligible ? 'Need 100 WEB3D to Swap' : 'Swap Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Not Found Page
const NotFound = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <Link to="/" className="text-blue-500 hover:text-blue-600">Go Home</Link>
  </div>
);

// Main App Component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
