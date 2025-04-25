
import React, { useState } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { TokenModel, tokens } from '../models/TokenModel';

interface TokenSelectorProps {
  selectedToken: TokenModel | null;
  onSelectToken: (token: TokenModel) => void;
  otherSelectedToken?: TokenModel | null; // To prevent selecting the same token
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ 
  selectedToken, 
  onSelectToken,
  otherSelectedToken
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const displayTokens = filteredTokens.filter(token => 
    !otherSelectedToken || token.id !== otherSelectedToken.id
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
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
                      target.src = '/placeholder.svg'; // Fallback image
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
      </PopoverTrigger>
      <PopoverContent className="glass-panel w-[300px] max-h-[400px] overflow-auto no-scrollbar">
        <div className="p-2">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search token name or symbol"
              className="glass-input w-full pl-10 pr-4 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            {displayTokens.length > 0 ? (
              displayTokens.map(token => (
                <div
                  key={token.id}
                  className="flex items-center justify-between p-2 hover:bg-glass-light rounded-lg cursor-pointer transition-colors"
                  onClick={() => {
                    onSelectToken(token);
                    setSearchQuery('');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center">
                      <img 
                        src={token.logo} 
                        alt={token.symbol}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg'; // Fallback image
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-xs text-gray-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {token.balance || '0.00'}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400">No tokens found</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TokenSelector;
