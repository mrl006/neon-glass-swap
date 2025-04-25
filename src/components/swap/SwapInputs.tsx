
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown } from 'lucide-react';
import TokenSelector from '../TokenSelector';
import { SwapState } from '@/services/swapService';
import { TokenModel } from '@/models/TokenModel';

interface SwapInputsProps {
  state: SwapState;
  isLoadingQuote: boolean;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchTokens: () => void;
  onTokenSelect: (key: 'fromToken' | 'toToken', token: TokenModel) => void;
  disabled?: boolean;
}

const SwapInputs: React.FC<SwapInputsProps> = ({
  state,
  isLoadingQuote,
  onAmountChange,
  onSwitchTokens,
  onTokenSelect,
  disabled
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="from-amount" className="text-sm text-gray-400">From</Label>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              id="from-amount"
              type="text"
              placeholder="0.0"
              value={state.amount}
              onChange={onAmountChange}
              className="glass-input text-lg h-14 bg-gradient-to-br from-purple-900/10 to-pink-900/10 border-white/10 focus:border-neon-purple/50 focus:ring-neon-purple/20"
              disabled={disabled}
            />
          </div>
          <div>
            <TokenSelector
              selectedToken={state.fromToken}
              onSelectToken={(token) => onTokenSelect('fromToken', token)}
              otherSelectedToken={state.toToken}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          type="button" 
          size="icon"
          variant="outline"
          onClick={onSwitchTokens}
          className="rounded-full w-10 h-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-pulse"
          disabled={disabled}
        >
          <ArrowDown className="h-5 w-5 text-white" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="to-amount" className="text-sm text-gray-400">To</Label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              id="to-amount"
              type="text"
              placeholder="0.0"
              value={isLoadingQuote ? "Loading..." : state.quote?.outputAmount.toFixed(6) || "0.0"}
              className="glass-input text-lg h-14 bg-gradient-to-br from-purple-900/10 to-pink-900/10 border-white/10"
              disabled
            />
            {isLoadingQuote && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-neon-purple"></div>
              </div>
            )}
          </div>
          <div>
            <TokenSelector
              selectedToken={state.toToken}
              onSelectToken={(token) => onTokenSelect('toToken', token)}
              otherSelectedToken={state.fromToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapInputs;
