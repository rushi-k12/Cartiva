/**
 *
 * index.js
 * This is the entry file for the application
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// ✅ Import ThemeProvider
import { ThemeProvider } from './contexts/Theme';

// ✅ Import your main SCSS (this pulls in _custom.scss which includes dark mode styles)
import './styles/_custom.scss';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
