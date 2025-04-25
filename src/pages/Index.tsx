
import React from 'react';
import { Cog } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import GlassBackground from '@/components/GlassBackground';
import WalletConnect from '@/components/WalletConnect';
import SwapForm from '@/components/SwapForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <GlassBackground>
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent animate-gradient">
              Glassless Token Swap
            </h1>
            <p className="text-lg text-gray-400">
              Experience the Future of DeFi
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <WalletConnect />
            
            <div className="glass-panel p-5 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Swap Tokens</h2>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Cog className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <SwapForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </GlassBackground>
  );
};

export default Index;
