import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_URL_LOCAL || process.env.REACT_APP_URL_REMOTA


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
