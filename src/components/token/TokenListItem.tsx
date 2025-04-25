
import React from 'react';
import { TokenModel } from '@/models/TokenModel';

interface TokenListItemProps {
  token: TokenModel;
  onSelect: (token: TokenModel) => void;
}

const TokenListItem = ({ token, onSelect }: TokenListItemProps) => {
  return (
    <div
      className="flex items-center justify-between p-3 hover:bg-glass-light rounded-lg cursor-pointer transition-colors"
      onClick={() => onSelect(token)}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shadow-sm">
          <img 
            src={token.logo} 
            alt={token.symbol}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <div>
          <div className="font-medium text-white">{token.symbol}</div>
          <div className="text-xs text-gray-400">{token.name}</div>
        </div>
      </div>
      <div className="text-sm text-gray-300 font-medium">
        {token.balance ? token.balance : '0.00'}
      </div>
    </div>
  );
};

export default TokenListItem;
