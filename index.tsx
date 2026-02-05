
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Elemen #root tidak dijumpai dalam DOM.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Hilangkan loader selepas render pertama selesai
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.add('app-ready');
      }, 500);
    });
  } catch (error) {
    const consoleDiv = document.getElementById('error-console');
    if (consoleDiv) {
      consoleDiv.style.display = 'block';
      consoleDiv.innerText += `\n[REACT ERROR]: ${error.message}`;
    }
  }
};

// Pastikan skrip dijalankan selepas DOM sedia
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
