
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
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent">
              Glassless Token Swap
            </h1>
            <p className="text-xl text-gray-400">
              Experience the Future of DeFi
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            <WalletConnect />
            
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center mb-6">
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
