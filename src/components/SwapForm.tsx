
import React, { useState, useEffect } from 'react';
import { useWallet } from '../services/walletService';
import { TokenModel } from '../models/TokenModel';
import { getSwapQuote, approveToken, executeSwap } from '../services/swapService';
import { toast } from 'sonner';
import { useSwapState } from '../hooks/useSwapState';
import SwapInputs from './swap/SwapInputs';
import SwapSettings from './swap/SwapSettings';
import SwapButton from './swap/SwapButton';

const SwapForm: React.FC = () => {
  const { state, updateState, handleAmountChange, switchTokens, handleSlippageChange, handleCheckboxChange } = useSwapState();
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { isConnected, isEligible } = useWallet();

  const handleTokenSelect = (key: 'fromToken' | 'toToken', token: TokenModel) => {
    updateState({ 
      [key]: token, 
      quote: null, 
      ...(key === 'fromToken' ? { isApproved: false } : {}) 
    });
  };

  const handleApprove = async () => {
    if (!state.fromToken || !isConnected || !isEligible) return;
    
    setIsApproving(true);
    try {
      const approved = await approveToken(state.fromToken, state.amount);
      if (approved) {
        updateState({ isApproved: true });
        toast.success(`${state.fromToken?.symbol} approved for swap!`);
      } else {
        toast.error("Approval failed. Please try again.");
      }
    } catch (error) {
      console.error("Error approving token", error);
      toast.error("Error approving token");
    } finally {
      setIsApproving(false);
    }
  };

  const handleSwap = async () => {
    if (!state.fromToken || !state.toToken || !isConnected || !isEligible || !state.isApproved) {
      return;
    }
    
    setIsSwapping(true);
    try {
      const result = await executeSwap(
        state.fromToken,
        state.toToken,
        state.amount,
        state.slippage,
        state.useV2,
        state.useGlasslessSwap
      );
      
      if (result.success) {
        toast.success(
          "Swap completed successfully!", 
          { 
            description: `Swapped ${state.amount} ${state.fromToken.symbol} to approximately ${state.quote?.outputAmount.toFixed(6)} ${state.toToken.symbol}`,
            action: {
              label: "View Transaction",
              onClick: () => window.open(`https://testnet.bscscan.com/tx/${result.hash}`, "_blank")
            }
          }
        );
        
        updateState({
          ...initialSwapState,
          fromToken: state.toToken,
          toToken: state.fromToken
        });
      } else {
        toast.error("Swap failed. Please try again.");
      }
    } catch (error) {
      console.error("Error executing swap", error);
      toast.error("Error executing swap");
    } finally {
      setIsSwapping(false);
    }
  };

  // Fetch quote when inputs change
  useEffect(() => {
    const fetchQuote = async () => {
      if (!state.fromToken || !state.toToken || !state.amount || parseFloat(state.amount) <= 0) {
        updateState({ quote: null });
        return;
      }
      
      setIsLoadingQuote(true);
      try {
        const quote = await getSwapQuote(state.fromToken, state.toToken, state.amount);
        updateState({ quote });
      } catch (error) {
        console.error("Error fetching quote", error);
        toast.error("Error fetching price quote");
        updateState({ quote: null });
      } finally {
        setIsLoadingQuote(false);
      }
    };
    
    const timer = setTimeout(fetchQuote, 500); // Debounce
    return () => clearTimeout(timer);
  }, [state.fromToken, state.toToken, state.amount]);

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
