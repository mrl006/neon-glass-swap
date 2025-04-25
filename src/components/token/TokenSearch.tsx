
import React from 'react';
import { Search } from 'lucide-react';

interface TokenSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const TokenSearch = ({ value, onChange }: TokenSearchProps) => {
  return (
    <div className="relative mb-3">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search token name or symbol"
        className="glass-input w-full pl-10 pr-4 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TokenSearch;
