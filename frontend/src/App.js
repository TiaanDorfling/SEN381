import logo from './logo.svg';
import './App.css';
import StudentCreator from './components/getStudent.js'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

