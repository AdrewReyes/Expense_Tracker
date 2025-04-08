// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './dashboard/home'; // Home Page (Dashboard)
import LoginPage from './pages/LoginPage'; // Login Page
import SignUpPage from './pages/SignUpPage'; // Sign-Up Page
import AboutPage from './pages/AboutPage'; // About Page

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;