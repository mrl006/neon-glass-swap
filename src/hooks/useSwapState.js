
import { useState } from 'react';
import { initialSwapState } from '../services/swapService';

export const useSwapState = () => {
  const [state, setState] = useState(initialSwapState);

  const handleAmountChange = (e) => {
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

  const handleSlippageChange = (value) => {
    setState(prev => ({ ...prev, slippage: value[0] }));
  };

  const handleCheckboxChange = (key) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateState = (updates) => {
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
