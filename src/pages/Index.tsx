
import React from 'react';
import { ArrowRight } from 'lucide-react';
import GlassBackground from '@/components/GlassBackground';
import WalletConnect from '@/components/WalletConnect';
import SwapForm from '@/components/SwapForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <GlassBackground>
      <div className="container mx-auto px-4 min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="py-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-blue rounded-lg animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Glassless Swap
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://docs.example.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Documentation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center gap-6 py-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent">
                Trade Instantly
              </h2>
              <p className="text-gray-400">
                Swap tokens with zero gas fees on BNB Chain
              </p>
            </div>
            
            <WalletConnect />
            <SwapForm />
          </div>
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </GlassBackground>
  );
};

export default Index;
