
import React from 'react';
import { Cog, Zap } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import GlassBackground from '@/components/GlassBackground';
import WalletConnect from '@/components/WalletConnect';
import SwapForm from '@/components/SwapForm';
import Footer from '@/components/Footer';

const Index = () => {
  return <GlassBackground>
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-neon-pink animate-pulse" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent animate-gradient">
                Gasless Swap
              </h1>
              <Zap className="w-8 h-8 text-neon-purple animate-pulse" />
            </div>
            <p className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
              Experience the Future of DeFi with <span className="font-bold text-neon-pink">Zero Gas Fees</span>
            </p>
            <div className="mt-4 bg-black/20 backdrop-blur-sm border border-neon-purple/20 rounded-full px-4 py-1 inline-flex items-center gap-2 animate-fade-in">
              <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              <span className="text-sm text-gray-300">Gasless Transactions Enabled</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <WalletConnect />
            
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40 relative overflow-hidden">
              {/* Animated gradient orbs */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-neon-pink/20 rounded-full blur-3xl animate-pulse" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Swap Tokens
                  </h2>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
                    <Cog className="w-6 h-6 text-gray-400 group-hover:text-neon-purple transition-colors" />
                  </button>
                </div>
                
                <SwapForm />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </GlassBackground>;
};
export default Index;
