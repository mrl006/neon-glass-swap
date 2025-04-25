
import React from 'react';
import { useWallet } from '../services/walletService';
import { TokenModel } from '../models/TokenModel';
import { useSwapState } from '../hooks/useSwapState';
import { useSwapActions } from '../hooks/useSwapActions';
import SwapInputs from './swap/SwapInputs';
import SwapSettings from './swap/SwapSettings';
import SwapButton from './swap/SwapButton';

const SwapForm: React.FC = () => {
  const { state, updateState, handleAmountChange, switchTokens, handleSlippageChange, handleCheckboxChange } = useSwapState();
  const { isLoadingQuote, isSwapping, isApproving, handleApprove, handleSwap } = useSwapActions(state, updateState);
  const { isConnected, isEligible } = useWallet();

  const handleTokenSelect = (key: 'fromToken' | 'toToken', token: TokenModel) => {
    updateState({ 
      [key]: token, 
      quote: null, 
      ...(key === 'fromToken' ? { isApproved: false } : {}) 
    });
  };

  return (
    <div className="glass-panel p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
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
      
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-300">
          Approved: <span className={state.isApproved ? "text-green-400" : "text-red-400"}>{state.isApproved ? "Yes" : "No"}</span>
        </p>
      </div>
      
      <div className="mb-4">
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
        <div className="text-xs text-gray-400 text-center">
          1 {state.fromToken?.symbol} ≈ {state.quote.rate.toFixed(6)} {state.toToken?.symbol}, 
          Fee {state.quote.fee.toFixed(6)} {state.toToken?.symbol}
        </div>
      )}
    </div>
  );
};

export default SwapForm;
