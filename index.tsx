
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for the LionReader application.
 * This file initializes the React root and renders the main App component.
 * It assumes a 'root' element exists in the host HTML file.
 */
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('LionReader: Failed to find the root element in the DOM.');
}
