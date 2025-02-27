import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';

const root = document.getElementById('root');
if (!root) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);