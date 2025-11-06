// buoc 1: import React va ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// buoc 1: tao root va render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

