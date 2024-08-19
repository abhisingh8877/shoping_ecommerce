import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import ShopContext from './Context/ShopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContext>
    <App />
    </ShopContext>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

