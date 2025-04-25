
import { useState, useEffect } from 'react';
import { getSwapQuote, approveToken, executeSwap } from '../services/swapService';
import { toast } from 'sonner';
import { initialSwapState } from '../services/swapService';

export const useSwapActions = (state, updateState) => {
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    if (!state.fromToken) return;
    
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
    if (!state.fromToken || !state.toToken || !state.isApproved) {
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

  // Quote fetching effect
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

  return {
    isLoadingQuote,
    isSwapping,
    isApproving,
    handleApprove,
    handleSwap
  };
};
