import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from './views/Home';
import CarPage from './views/CarPage';
import CarOrderPage from './views/CarOrderPage'
import Cart from './views/Cart';
import TestDrive from './views/TestDrive';

function App() {
  
  return (
    <div className="App">
      
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CarPage />} path="/:carName" />
        <Route element={<CarOrderPage />} path="/:carName/add" />
        <Route element={<Cart />} path="/cart/checkout" />
        <Route element={<TestDrive />} path="/test/drive" />

      </Routes>
    </div>
  );
}
export default App;

