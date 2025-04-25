
import React from 'react';
import GlassBackground from '@/components/GlassBackground';
import WalletConnect from '@/components/WalletConnect';
import SwapForm from '@/components/SwapForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <GlassBackground>
      <div className="container mx-auto flex flex-col items-center justify-center gap-6">
        <WalletConnect />
        <SwapForm />
        <Footer />
      </div>
    </GlassBackground>
  );
};

export default Index;
