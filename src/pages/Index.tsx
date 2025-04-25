
import React from 'react';
import { Activity, TrendingUp, Wallet, BarChart3, ArrowRight } from 'lucide-react';
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Side Stats */}
            <div className="md:col-span-3 space-y-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 backdrop-blur-lg">
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm">24h Volume</p>
                      <p className="text-white font-medium">$1.2B</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm">Total Trades</p>
                      <p className="text-white font-medium">2.5M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Wallet className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm">Total Value Locked</p>
                      <p className="text-white font-medium">$850M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Main Swap Interface */}
            <div className="md:col-span-6 space-y-6">
              <div className="max-w-3xl mx-auto text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent">
                  Glassless Token Swap
                </h1>
                <p className="text-xl text-gray-400">
                  Experience the Future of DeFi
                </p>
              </div>

              <WalletConnect />
              
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Swap Tokens</h2>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                <SwapForm />
              </div>
            </div>

            {/* Right Side - Popular Pairs */}
            <div className="md:col-span-3 space-y-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Popular Pairs</h3>
                  <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    View all <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { pair: 'ETH/USDT', change: '+2.5%', positive: true },
                    { pair: 'BNB/BUSD', change: '-1.2%', positive: false },
                    { pair: 'CAKE/BNB', change: '+4.3%', positive: true },
                  ].map((item) => (
                    <div key={item.pair} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <span className="text-gray-300">{item.pair}</span>
                      <span className={item.positive ? 'text-green-400' : 'text-red-400'}>
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 backdrop-blur-lg">
                <h3 className="text-lg font-semibold mb-4 text-white">Network Status</h3>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm">Network Active</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Block: #18245633</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </GlassBackground>
  );
};

export default Index;
