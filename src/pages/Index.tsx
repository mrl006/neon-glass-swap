
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
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent animate-gradient">
              Glassless Token Swap
            </h1>
            <p className="text-xl text-gray-400">
              Experience the Future of DeFi
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <WalletConnect />
            
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Swap Tokens
                </h2>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Cog className="w-6 h-6 text-gray-400" />
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
