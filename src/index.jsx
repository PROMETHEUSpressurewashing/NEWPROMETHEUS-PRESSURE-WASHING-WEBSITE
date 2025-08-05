import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Removed: import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Removed: If you want to start measuring performance in your app, pass a function
// Removed: to log results (for example: reportWebVitals(console.log))
// Removed: or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// Removed: reportWebVitals();
