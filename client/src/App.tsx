/* import { useEffect, useState } from 'react';
import { socket } from './socket'; */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordForm from './components/ResetPasswordForm';
import VerifyEmailPage from './components/VerifyEmailPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="h-screen w-full py-3.5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/verify/:veryficationCode"
            element={<VerifyEmailPage />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
