
import React from 'react';
import { Button } from '@/components/ui/button';
import { TokenModel } from '@/models/TokenModel';

interface TokenButtonProps {
  selectedToken: TokenModel | null;
}

const TokenButton = ({ selectedToken }: TokenButtonProps) => {
  return (
    <Button
      variant="outline"
      className="glass-input w-full flex justify-between items-center gap-2 h-14 px-4 bg-glass-dark bg-opacity-30"
    >
      {selectedToken ? (
        <>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center">
              <img 
                src={selectedToken.logo} 
                alt={selectedToken.symbol} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <span className="font-medium">{selectedToken.symbol}</span>
          </div>
          <div className="text-xs text-gray-400">{selectedToken.name}</div>
        </>
      ) : (
        <span>Select Token</span>
      )}
    </Button>
  );
};

export default TokenButton;
