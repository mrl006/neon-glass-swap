
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return <footer className="mt-auto py-8">
      <Separator className="mb-8 opacity-10" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              Gasless Swap — Powered by Web3d <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-full ml-1">Zero Gas</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-neon-purple transition-colors" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-neon-purple transition-colors" target="_blank" rel="noopener noreferrer">
              Github
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-neon-purple transition-colors" target="_blank" rel="noopener noreferrer">
              Community
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
