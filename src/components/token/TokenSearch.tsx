
import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface TokenSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const TokenSearch = ({ value, onChange }: TokenSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Auto focus the search input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div className="relative mb-3">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search token name or symbol"
        className="glass-input w-full pl-10 pr-4 py-3 text-sm rounded-xl focus:ring-2 focus:ring-neon-purple focus:border-neon-purple-light transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TokenSearch;
