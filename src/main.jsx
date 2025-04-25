
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { WalletProvider } from './context/WalletContext';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
