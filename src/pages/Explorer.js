
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
  
  return React.createElement(
    GlassBackground, 
    null,
    React.createElement(
      "div", 
      { className: "min-h-screen flex flex-col" },
      React.createElement(NavigationBar, null),
      
      React.createElement(
        "main", 
        { className: "flex-1 container mx-auto px-4 py-12" },
        React.createElement(
          "div", 
          { className: "max-w-3xl mx-auto text-center mb-12" },
          React.createElement(
            "h1", 
            { className: "text-5xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent" },
            "Token Explorer"
          ),
          React.createElement(
            "p", 
            { className: "text-xl text-gray-400" },
            "Explore the available tokens in our ecosystem"
          )
        ),

        React.createElement(
          "div", 
          { className: "max-w-2xl mx-auto" },
          React.createElement(
            "div", 
            { className: "relative mb-6" },
            React.createElement(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }),
            React.createElement("input", {
              type: "text",
              placeholder: "Search tokens by name or symbol",
              className: "glass-input w-full pl-12 pr-4 py-4 text-lg rounded-xl",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value)
            })
          ),
          
          React.createElement(
            "div", 
            { className: "glass-panel p-6 rounded-2xl border border-white/10 space-y-2" },
            filteredTokens.length > 0 ? 
              filteredTokens.map(token => 
                React.createElement(TokenListItem, {
                  key: token.id,
                  token: token,
                  onSelect: () => {}
                })
              ) : 
              React.createElement("div", { className: "text-center py-8 text-gray-400" }, "No tokens found")
          )
        )
      ),

      React.createElement(Footer, null)
    )
  );
};

export default Explorer;
