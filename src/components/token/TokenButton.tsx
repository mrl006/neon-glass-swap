
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { TokenModel } from '@/models/TokenModel';

interface TokenButtonProps {
  selectedToken: TokenModel | null;
}

const TokenButton = ({
  selectedToken
}: TokenButtonProps) => {
  return (
    <Button 
      variant="outline" 
      className="glass-input w-full flex justify-between items-center gap-2 h-14 px-4 bg-glass-dark bg-opacity-30 hover:bg-glass-light"
    >
      <div className="flex items-center gap-2 flex-1">
        {selectedToken ? (
          <>
            <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shadow-sm">
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
          </>
        ) : (
          <span className="text-gray-400">Select Token</span>
        )}
      </div>
      <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
    </Button>
  );
};

export default TokenButton;
