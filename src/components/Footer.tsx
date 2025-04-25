
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 text-center text-sm text-gray-400">
      <p>Glassless Swap - BNB Chain | Glassmorphism UI</p>
      <div className="flex justify-center mt-2 space-x-4">
        <a 
          href="#" 
          className="hover:text-neon-purple transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a 
          href="#" 
          className="hover:text-neon-purple transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a 
          href="#" 
          className="hover:text-neon-purple transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Community
        </a>
      </div>
    </footer>
  );
};

export default Footer;
