import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional, if you want to add global CSS
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals'; // Optional, for performance logging

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to log performance results (for example: reportWebVitals(console.log))
reportWebVitals();
