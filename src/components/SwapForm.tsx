
import React from 'react';
import { useWallet } from '../services/walletService';
import { TokenModel } from '../models/TokenModel';
import { useSwapState } from '../hooks/useSwapState';
import { useSwapActions } from '../hooks/useSwapActions';
import SwapInputs from './swap/SwapInputs';
import SwapSettings from './swap/SwapSettings';
import SwapButton from './swap/SwapButton';
import { useToast } from '@/hooks/use-toast';

const SwapForm: React.FC = () => {
  const { state, updateState, handleAmountChange, switchTokens, handleSlippageChange, handleCheckboxChange } = useSwapState();
  const { isLoadingQuote, isSwapping, isApproving, handleApprove, handleSwap } = useSwapActions(state, updateState);
  const { isConnected, isEligible } = useWallet();
  const { toast } = useToast();

  // Add the missing handleTokenSelect function
  const handleTokenSelect = (key: 'fromToken' | 'toToken', token: TokenModel) => {
    updateState({ [key]: token, quote: null, isApproved: false });
  };

  return (
    <div className="glass-panel p-8 w-full max-w-md rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl bg-black/40">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Glassless Swap
      </h2>
      
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
        <div className="mb-6 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <p className="text-sm text-center">
            Status: <span className={state.isApproved ? "text-green-400" : "text-red-400"}>
              {state.isApproved ? "Approved ✓" : "Requires Approval"}
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
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Rate</span>
              <span>1 {state.fromToken?.symbol} ≈ {state.quote.rate.toFixed(6)} {state.toToken?.symbol}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Fee</span>
              <span>{state.quote.fee.toFixed(6)} {state.toToken?.symbol}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Price Impact</span>
              <span className={state.quote.priceImpact > 1 ? 'text-red-400' : 'text-green-400'}>
                {state.quote.priceImpact.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapForm;
