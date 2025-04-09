import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; // This one we confirmed is good

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
