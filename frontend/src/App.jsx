import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationForm from './pages/RegistrationPage/index';
import LoginForm from './pages/LoginPage/index';
import Dashboard from './pages/DashboardPage/index';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>

  );
}
