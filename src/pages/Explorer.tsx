
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import GlassBackground from '@/components/GlassBackground';
import Footer from '@/components/Footer';
import { tokens } from '@/models/TokenModel';
import TokenListItem from '@/components/token/TokenListItem';

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <GlassBackground>
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent">
              Token Explorer
            </h1>
            <p className="text-xl text-gray-400">
              Explore the available tokens in our ecosystem
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tokens by name or symbol"
                className="glass-input w-full pl-12 pr-4 py-4 text-lg rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              {filteredTokens.length > 0 ? (
                filteredTokens.map(token => (
                  <TokenListItem
                    key={token.id}
                    token={token}
                    onSelect={() => {}}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">No tokens found</div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </GlassBackground>
  );
};

export default Explorer;
