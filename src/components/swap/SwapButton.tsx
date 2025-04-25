
import React from 'react';
import { Button } from '@/components/ui/button';
import { SwapState } from '@/services/swapService';

interface SwapButtonProps {
  isConnected: boolean;
  isEligible: boolean;
  state: SwapState;
  isApproving: boolean;
  isSwapping: boolean;
  onApprove: () => void;
  onSwap: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({
  isConnected,
  isEligible,
  state,
  isApproving,
  isSwapping,
  onApprove,
  onSwap
}) => {
  if (!isConnected) {
    return (
      <Button 
        className="w-full neon-button" 
        disabled={true}
      >
        Connect Wallet to Swap
      </Button>
    );
  }

  if (!isEligible) {
    return (
      <Button 
        className="w-full neon-button" 
        disabled={true}
      >
        Need 100 WEB3D to Use
      </Button>
    );
  }

  if (!state.isApproved) {
    return (
      <Button 
        className="w-full neon-button" 
        onClick={onApprove}
        disabled={isApproving || !state.fromToken || !state.toToken || !state.amount || parseFloat(state.amount) <= 0}
      >
        {isApproving ? "Approving..." : `Approve ${state.fromToken?.symbol}`}
      </Button>
    );
  }

  return (
    <Button 
      className="w-full neon-button" 
      onClick={onSwap}
      disabled={
        isSwapping || 
        !state.fromToken || 
        !state.toToken || 
        !state.amount || 
        parseFloat(state.amount) <= 0 ||
        !state.quote
      }
    >
      {isSwapping ? "Swapping..." : "Swap Now"}
    </Button>
  );
};

export default SwapButton;
