
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Ensure this is set in your .env file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
