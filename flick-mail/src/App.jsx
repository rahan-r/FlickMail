import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../src/pages/Home';
import Mail from '../src/pages/Mail';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mail" element={
          <ProtectedRoute>
            <Mail/>
          </ProtectedRoute>
        } />
        <Route path="/authenticate" element={<Auth/>}/>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </Router>
  );
}

export default App;