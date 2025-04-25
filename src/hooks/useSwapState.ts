
import { useState } from 'react';
import { SwapState, initialSwapState } from '../services/swapService';

export const useSwapState = () => {
  const [state, setState] = useState<SwapState>(initialSwapState);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^$|^[0-9]*\.?[0-9]*$/.test(value)) {
      setState(prev => ({ ...prev, amount: value }));
    }
  };

  const switchTokens = () => {
    setState(prev => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      amount: prev.quote ? prev.quote.outputAmount.toString() : prev.amount,
      quote: null,
      isApproved: false
    }));
  };

  const handleSlippageChange = (value: number[]) => {
    setState(prev => ({ ...prev, slippage: value[0] }));
  };

  const handleCheckboxChange = (key: 'useV2' | 'useGlasslessSwap') => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateState = (updates: Partial<SwapState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return {
    state,
    updateState,
    handleAmountChange,
    switchTokens,
    handleSlippageChange,
    handleCheckboxChange,
  };
};
