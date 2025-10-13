import './App.css';
import Home from "./pages/Home";
import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import Messages from "./pages/Messages";

import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </main>
    </BrowserRouter>
    
  );
}

export default App;
