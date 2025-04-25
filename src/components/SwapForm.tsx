
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowDown } from 'lucide-react';
import TokenSelector from './TokenSelector';
import { useWallet } from '../services/walletService';
import { 
  SwapState, 
  initialSwapState, 
  getSwapQuote, 
  approveToken,
  executeSwap
} from '../services/swapService';
import { toast } from 'sonner';

const SwapForm: React.FC = () => {
  const [state, setState] = useState<SwapState>(initialSwapState);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { isConnected, isEligible } = useWallet();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
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
  
  const handleApprove = async () => {
    if (!state.fromToken || !isConnected || !isEligible) return;
    
    setIsApproving(true);
    try {
      const approved = await approveToken(state.fromToken, state.amount);
      if (approved) {
        setState(prev => ({ ...prev, isApproved: true }));
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
        
        // Reset form
        setState(prev => ({
          ...initialSwapState,
          fromToken: prev.toToken,
          toToken: prev.fromToken
        }));
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
        setState(prev => ({ ...prev, quote: null }));
        return;
      }
      
      setIsLoadingQuote(true);
      try {
        const quote = await getSwapQuote(state.fromToken, state.toToken, state.amount);
        setState(prev => ({ ...prev, quote }));
      } catch (error) {
        console.error("Error fetching quote", error);
        toast.error("Error fetching price quote");
        setState(prev => ({ ...prev, quote: null }));
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
      
      {/* From Token */}
      <div className="mb-4">
        <Label htmlFor="from-amount" className="text-sm text-gray-300 mb-1 block">From</Label>
        <div className="flex gap-2">
          <div className="w-full">
            <Input
              id="from-amount"
              type="text"
              placeholder="0.0"
              value={state.amount}
              onChange={handleAmountChange}
              className="glass-input text-lg h-14"
              disabled={!isConnected || !isEligible}
            />
          </div>
          <div className="w-36">
            <TokenSelector
              selectedToken={state.fromToken}
              onSelectToken={(token) => setState(prev => ({ ...prev, fromToken: token, quote: null, isApproved: false }))}
              otherSelectedToken={state.toToken}
            />
          </div>
        </div>
      </div>
      
      {/* Swap Direction Button */}
      <div className="flex justify-center my-4">
        <Button 
          type="button" 
          size="icon"
          variant="outline"
          onClick={switchTokens}
          className="rounded-full w-8 h-8 bg-glass-dark border-glass-border hover:bg-glass-light"
          disabled={!isConnected || !isEligible}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
      
      {/* To Token */}
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
              onSelectToken={(token) => setState(prev => ({ ...prev, toToken: token, quote: null }))}
              otherSelectedToken={state.fromToken}
            />
          </div>
        </div>
      </div>
      
      {/* Slippage Settings */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-sm text-gray-300">Slippage Tolerance: {state.slippage}%</Label>
        </div>
        <Slider
          defaultValue={[5]}
          max={50}
          min={0.1}
          step={0.1}
          value={[state.slippage]}
          onValueChange={handleSlippageChange}
          disabled={!isConnected || !isEligible}
          className="mb-4"
        />
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-v2"
              checked={state.useV2}
              onCheckedChange={() => handleCheckboxChange('useV2')}
              disabled={!isConnected || !isEligible}
            />
            <Label
              htmlFor="use-v2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use PancakeSwap V2
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-gasless"
              checked={state.useGlasslessSwap}
              onCheckedChange={() => handleCheckboxChange('useGlasslessSwap')}
              disabled={!isConnected || !isEligible}
            />
            <Label
              htmlFor="use-gasless"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use Glassless Swap (Gasless)
            </Label>
          </div>
        </div>
      </div>
      
      {/* Approval Status */}
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-300">
          Approved: <span className={state.isApproved ? "text-green-400" : "text-red-400"}>{state.isApproved ? "Yes" : "No"}</span>
        </p>
      </div>
      
      {/* Action Button */}
      <div className="mb-4">
        {!isConnected ? (
          <Button 
            className="w-full neon-button" 
            disabled={true}
          >
            Connect Wallet to Swap
          </Button>
        ) : !isEligible ? (
          <Button 
            className="w-full neon-button" 
            disabled={true}
          >
            Need 100 WEB3D to Use
          </Button>
        ) : !state.isApproved ? (
          <Button 
            className="w-full neon-button" 
            onClick={handleApprove}
            disabled={isApproving || !state.fromToken || !state.toToken || !state.amount || parseFloat(state.amount) <= 0}
          >
            {isApproving ? "Approving..." : `Approve ${state.fromToken?.symbol}`}
          </Button>
        ) : (
          <Button 
            className="w-full neon-button" 
            onClick={handleSwap}
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
        )}
      </div>
      
      {/* Swap Info */}
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
