
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
    <>
      <div className="mb-4">
        <Label htmlFor="from-amount" className="text-sm text-gray-300 mb-1 block">From</Label>
        <div className="flex gap-2">
          <div className="w-full">
            <Input
              id="from-amount"
              type="text"
              placeholder="0.0"
              value={state.amount}
              onChange={onAmountChange}
              className="glass-input text-lg h-14"
              disabled={disabled}
            />
          </div>
          <div className="w-36">
            <TokenSelector
              selectedToken={state.fromToken}
              onSelectToken={(token) => onTokenSelect('fromToken', token)}
              otherSelectedToken={state.toToken}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Button 
          type="button" 
          size="icon"
          variant="outline"
          onClick={onSwitchTokens}
          className="rounded-full w-8 h-8 bg-glass-dark border-glass-border hover:bg-glass-light"
          disabled={disabled}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6">
        <Label htmlFor="to-amount" className="text-sm text-gray-300 mb-1 block">To</Label>
        <div className="flex gap-2">
          <div className="w-full relative">
            <Input
              id="to-amount"
              type="text"
              placeholder="0.0"
              value={isLoadingQuote ? "Loading..." : state.quote?.outputAmount.toFixed(6) || "0.0"}
              className="glass-input text-lg h-14"
              disabled
            />
            {isLoadingQuote && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-neon-purple"></div>
              </div>
            )}
          </div>
          <div className="w-36">
            <TokenSelector
              selectedToken={state.toToken}
              onSelectToken={(token) => onTokenSelect('toToken', token)}
              otherSelectedToken={state.fromToken}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwapInputs;
