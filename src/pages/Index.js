
import React from 'react';
import { Cog, Zap } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import GlassBackground from '@/components/GlassBackground';
import WalletConnect from '@/components/WalletConnect';
import SwapForm from '@/components/SwapForm';
import Footer from '@/components/Footer';

const Index = () => {
  return React.createElement(
    GlassBackground,
    null,
    React.createElement(
      "div",
      { className: "min-h-screen flex flex-col" },
      React.createElement(NavigationBar, null),
      
      React.createElement(
        "main",
        { className: "flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center" },
        React.createElement(
          "div",
          { className: "max-w-4xl w-full text-center mb-12" },
          React.createElement(
            "div",
            { className: "inline-flex items-center gap-3 mb-6 justify-center w-full" },
            React.createElement(Zap, { className: "w-8 h-8 text-neon-pink animate-pulse" }),
            React.createElement(
              "h1",
              { className: "text-6xl font-bold bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent animate-gradient" },
              "Gasless Swap"
            ),
            React.createElement(Zap, { className: "w-8 h-8 text-neon-purple animate-pulse" })
          ),
          React.createElement(
            "p",
            { className: "text-xl text-gray-400 max-w-lg mx-auto leading-relaxed mb-4" },
            "Experience the Future of DeFi with ",
            React.createElement("span", { className: "font-bold text-neon-pink" }, "Zero Gas Fees")
          ),
          React.createElement(
            "div",
            { className: "mt-4 bg-black/20 backdrop-blur-sm border border-neon-purple/20 rounded-full px-4 py-1 inline-flex items-center gap-2 animate-fade-in mx-auto" },
            React.createElement("span", { className: "inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse" }),
            React.createElement("span", { className: "text-sm text-gray-300" }, "Gasless Transactions Enabled")
          )
        ),

        React.createElement(
          "div",
          { className: "w-full max-w-2xl" },
          React.createElement(WalletConnect, null),
          
          React.createElement(
            "div",
            { className: "glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40 relative overflow-hidden" },
            // Animated gradient orbs
            React.createElement("div", { className: "absolute -top-24 -left-24 w-48 h-48 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" }),
            React.createElement("div", { className: "absolute -bottom-24 -right-24 w-48 h-48 bg-neon-pink/20 rounded-full blur-3xl animate-pulse" }),
            
            React.createElement(
              "div",
              { className: "relative z-10" },
              React.createElement(
                "div",
                { className: "flex justify-between items-center mb-6" },
                React.createElement(
                  "h2",
                  { className: "text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" },
                  "Swap Tokens"
                ),
                React.createElement(
                  "button",
                  { className: "p-2 hover:bg-white/5 rounded-lg transition-colors group" },
                  React.createElement(Cog, { className: "w-6 h-6 text-gray-400 group-hover:text-neon-purple transition-colors" })
                )
              ),
              
              React.createElement(SwapForm, null)
            )
          )
        )
      ),

      React.createElement(Footer, null)
    )
  );
};

export default Index;
