
import React, { useState } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TokenModel, tokens } from '../models/TokenModel';
import TokenButton from './token/TokenButton';
import TokenSearch from './token/TokenSearch';
import TokenListItem from './token/TokenListItem';

interface TokenSelectorProps {
  selectedToken: TokenModel | null;
  onSelectToken: (token: TokenModel) => void;
  otherSelectedToken?: TokenModel | null;
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

  const handleSelectToken = (token: TokenModel) => {
    onSelectToken(token);
    setSearchQuery('');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <TokenButton selectedToken={selectedToken} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="glass-panel w-[300px] max-h-[400px] overflow-auto no-scrollbar">
        <div className="p-2">
          <TokenSearch 
            value={searchQuery}
            onChange={setSearchQuery}
          />
          
          <div className="space-y-1">
            {displayTokens.length > 0 ? (
              displayTokens.map(token => (
                <TokenListItem
                  key={token.id}
                  token={token}
                  onSelect={handleSelectToken}
                />
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
