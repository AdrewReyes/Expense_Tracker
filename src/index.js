import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional, if you want to include some styles
import App from './App';  // Import your main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Make sure this matches the div in your index.html
);