
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown } from 'lucide-react';
import TokenSelector from '../TokenSelector';
import { SwapState } from '@/services/swapService';
import { TokenModel } from '@/models/TokenModel';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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
        <div className="glass-panel p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-200 hover:bg-white/10">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                id="from-amount"
                type="text"
                placeholder="0.0"
                value={state.amount}
                onChange={onAmountChange}
                className="glass-input text-lg h-14 bg-transparent border-none focus:ring-0 placeholder:text-gray-500"
                disabled={disabled}
              />
              {state.fromToken && (
                <div className="text-sm text-gray-400 mt-1">
                  ≈ ${(parseFloat(state.amount || "0") * 1.5).toFixed(2)}
                </div>
              )}
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
      </div>

      <div className="flex justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button 
              type="button" 
              size="icon"
              variant="outline"
              onClick={onSwitchTokens}
              className="rounded-full w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink border-none shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40 transition-all duration-300 hover:scale-110"
              disabled={disabled}
            >
              <ArrowDown className="h-5 w-5 text-white animate-bounce" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
            <p className="text-sm">Switch tokens</p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="space-y-2">
        <Label htmlFor="to-amount" className="text-sm text-gray-400">To</Label>
        <div className="glass-panel p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-200 hover:bg-white/10">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                id="to-amount"
                type="text"
                placeholder="0.0"
                value={isLoadingQuote ? "Loading..." : state.quote?.outputAmount.toFixed(6) || "0.0"}
                className="glass-input text-lg h-14 bg-transparent border-none focus:ring-0 placeholder:text-gray-500"
                disabled
              />
              {state.toToken && state.quote && (
                <div className="text-sm text-gray-400 mt-1">
                  ≈ ${(state.quote.outputAmount * 1.5).toFixed(2)}
                </div>
              )}
              {isLoadingQuote && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full border-2 border-neon-purple border-t-transparent animate-spin" />
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
    </div>
  );
};

export default SwapInputs;
