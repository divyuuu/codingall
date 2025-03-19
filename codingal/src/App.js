// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import './styles/global.css'; // Make sure this path is correct for your setup

const Home = () => (
  <div className="content" style={{ marginTop: "70px", padding: "20px" }}>
    <h1>Lesson Content</h1>
    <p>This is where your lesson content would appear.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;