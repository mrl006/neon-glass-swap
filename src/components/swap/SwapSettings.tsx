
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SwapState } from '@/services/swapService';

interface SwapSettingsProps {
  state: SwapState;
  onSlippageChange: (value: number[]) => void;
  onCheckboxChange: (key: 'useV2' | 'useGlasslessSwap') => void;
  disabled?: boolean;
}

const SwapSettings: React.FC<SwapSettingsProps> = ({
  state,
  onSlippageChange,
  onCheckboxChange,
  disabled
}) => {
  return (
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
        onValueChange={onSlippageChange}
        disabled={disabled}
        className="mb-4"
      />
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="use-v2"
            checked={state.useV2}
            onCheckedChange={() => onCheckboxChange('useV2')}
            disabled={disabled}
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
            onCheckedChange={() => onCheckboxChange('useGlasslessSwap')}
            disabled={disabled}
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
  );
};

export default SwapSettings;
