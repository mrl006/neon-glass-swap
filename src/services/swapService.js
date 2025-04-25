
import { tokens } from '../models/TokenModel';

// Initial state for the swap form
export const initialSwapState = {
  fromToken: tokens[0], // WBNB by default
  toToken: tokens[1], // BUSD by default
  amount: '1',
  quote: null,
  slippage: 5, // Default 5%
  useV2: true,
  useGlasslessSwap: true, // Changed to true by default
  isApproved: false
};

// Simulate getting a quote
export const getSwapQuote = async (
  fromToken,
  toToken,
  amount
) => {
  // This would be an API call to the backend in a real implementation
  // For now we'll simulate it with some math
  
  const inputAmount = parseFloat(amount);
  
  // Simulate different rates for different token pairs
  let rate = 0;
  if (fromToken.symbol === 'WBNB' && toToken.symbol === 'BUSD') {
    rate = 280 + Math.random() * 20; // Around $280-300 per BNB
  } else if (fromToken.symbol === 'BUSD' && toToken.symbol === 'WBNB') {
    rate = 1 / (280 + Math.random() * 20); // Inverse of above
  } else if (fromToken.symbol === 'WBNB' && toToken.symbol === 'CAKE') {
    rate = 120 + Math.random() * 10; // Around 120-130 CAKE per BNB
  } else if (fromToken.symbol === 'CAKE' && toToken.symbol === 'WBNB') {
    rate = 1 / (120 + Math.random() * 10); // Inverse of above
  } else if (fromToken.symbol === 'BUSD' && toToken.symbol === 'CAKE') {
    rate = 0.4 + Math.random() * 0.1; // Around 0.4-0.5 CAKE per BUSD
  } else if (fromToken.symbol === 'CAKE' && toToken.symbol === 'BUSD') {
    rate = 1 / (0.4 + Math.random() * 0.1); // Inverse of above
  } else if (fromToken.symbol === 'WEB3D') {
    rate = 0.001 + Math.random() * 0.0005; // Very low rate for WEB3D
  } else if (toToken.symbol === 'WEB3D') {
    rate = 1000 + Math.random() * 500; // Inverse of above
  } else {
    rate = 1; // Default 1:1 for unknown pairs
  }
  
  const outputAmount = inputAmount * rate;
  const fee = inputAmount * 0.003; // 0.3% fee
  const priceImpact = inputAmount > 10 ? 0.5 + Math.random() : 0.1 + Math.random() * 0.3; // Higher impact for larger amounts
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    inputAmount,
    outputAmount,
    rate,
    fee: fee * rate, // Fee in output token
    priceImpact,
    route: [fromToken.symbol, toToken.symbol] // Direct route for now
  };
};

// Simulate approval
export const approveToken = async (
  token,
  amount
) => {
  // This would be a contract call in a real implementation
  console.log(`Approving ${amount} ${token.symbol}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Always succeed in our simulation
  return true;
};

// Simulate swap
export const executeSwap = async (
  fromToken,
  toToken,
  amount,
  slippage,
  useV2,
  useGlasslessSwap
) => {
  // This would be a contract call in a real implementation
  console.log(`Swapping ${amount} ${fromToken.symbol} to ${toToken.symbol}`);
  console.log(`Settings: slippage=${slippage}%, useV2=${useV2}, useGlasslessSwap=${useGlasslessSwap}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate a fake transaction hash
  const hash = '0x' + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('');
  
  // Always succeed in our simulation
  return {
    success: true,
    hash
  };
};
