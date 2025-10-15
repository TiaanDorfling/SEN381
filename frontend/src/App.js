import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
//pages
import Home from "./pages/Home";
import Login from "./pages/LogIn";
import Forum from "./pages/Forum";
import courses from "./pages/courses";

function App() {
   return (
    <Router>
      <div className="App">
        {/* navbar */}
        <nav className="navbar">
          <h2>BC Learning Hub</h2>
          <ul>
            <li>Home</li>
            <li>Login / Register</li>
            <li>Forum</li>
            <li>Courses</li>
          </ul>
        </nav>

        {/* Page Routes */}
        {/* <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="//LogIn" element={<Login />} />
          <Route path="/Forum" element={<Forum />} />
          <Route path="/courses" element={<Courses />} />
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;