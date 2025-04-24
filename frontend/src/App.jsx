// import { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import EmailVerify from './pages/EmailVerify';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element="Home" />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<EmailVerify />} />
      </Routes>
    </div>
  )
}

export default App
