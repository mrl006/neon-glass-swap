
export interface TokenModel {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  balance?: string;
  decimals: number;
}

export const tokens: TokenModel[] = [
  {
    id: 'wbnb',
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    logo: '/tokens/wbnb.png',
    decimals: 18
  },
  {
    id: 'busd',
    symbol: 'BUSD',
    name: 'Binance USD',
    logo: '/tokens/busd.png',
    decimals: 18
  },
  {
    id: 'cake',
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    logo: '/tokens/cake.png',
    decimals: 18
  },
  {
    id: 'web3d',
    symbol: 'WEB3D',
    name: 'Web3D Token',
    logo: '/tokens/web3d.png',
    decimals: 18
  }
];

export const getToken = (id: string): TokenModel | undefined => {
  return tokens.find(token => token.id === id);
};
