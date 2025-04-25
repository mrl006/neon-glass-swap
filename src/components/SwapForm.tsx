
import React from 'react';
import { Cog } from 'lucide-react';
import { useWallet } from '../services/walletService';
import { TokenModel } from '../models/TokenModel';
import { useSwapState } from '../hooks/useSwapState';
import { useSwapActions } from '../hooks/useSwapActions';
import SwapInputs from './swap/SwapInputs';
import SwapSettings from './swap/SwapSettings';
import SwapButton from './swap/SwapButton';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SwapForm: React.FC = () => {
  const { state, updateState, handleAmountChange, switchTokens, handleSlippageChange, handleCheckboxChange } = useSwapState();
  const { isLoadingQuote, isSwapping, isApproving, handleApprove, handleSwap } = useSwapActions(state, updateState);
  const { isConnected, isEligible } = useWallet();
  const { toast } = useToast();

  const handleTokenSelect = (key: 'fromToken' | 'toToken', token: TokenModel) => {
    updateState({ [key]: token, quote: null, isApproved: false });
  };

  const handleCopyBalance = (balance: string) => {
    navigator.clipboard.writeText(balance);
    toast({
      description: "Balance copied to clipboard",
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 via-black/50 to-pink-900/40 rounded-3xl p-6 border border-white/10 backdrop-blur-2xl shadow-2xl animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Swap Tokens
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Cog className="w-6 h-6 text-gray-300 animate-pulse" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Swap Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-8">
        <SwapInputs
          state={state}
          isLoadingQuote={isLoadingQuote}
          onAmountChange={handleAmountChange}
          onSwitchTokens={switchTokens}
          onTokenSelect={handleTokenSelect}
          disabled={!isConnected || !isEligible}
        />
        
        <SwapSettings
          state={state}
          onSlippageChange={handleSlippageChange}
          onCheckboxChange={handleCheckboxChange}
          disabled={!isConnected || !isEligible}
        />
        
        {state.isApproved !== undefined && (
          <div className="glass-panel p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10">
            <p className="text-sm text-center flex items-center justify-center gap-2">
              Status: 
              <span className={`${state.isApproved ? "text-green-400" : "text-red-400"} flex items-center gap-2`}>
                {state.isApproved ? "Approved ✓" : "Requires Approval"}
                {state.isApproved && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => handleCopyBalance(state.amount)}
                          className="hover:bg-white/5 p-1 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy amount</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <SwapButton
            isConnected={isConnected}
            isEligible={isEligible}
            state={state}
            isApproving={isApproving}
            isSwapping={isSwapping}
            onApprove={handleApprove}
            onSwap={handleSwap}
          />
        </div>
        
        {state.quote && (
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 via-black/20 to-pink-500/5 backdrop-blur-sm border border-white/10 animate-fade-in">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rate</span>
                <span className="text-white">{state.fromToken?.symbol} ≈ {state.quote.rate.toFixed(6)} {state.toToken?.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">USD Value</span>
                <span className="text-white">${(state.quote.outputAmount * 1.5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fee</span>
                <span className="text-white">{state.quote.fee.toFixed(6)} {state.toToken?.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Price Impact</span>
                <span className={state.quote.priceImpact > 1 ? 'text-red-400' : 'text-green-400'}>
                  {state.quote.priceImpact.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapForm;
