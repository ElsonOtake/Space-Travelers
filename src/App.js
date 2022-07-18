import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Missions from './components/Missions';
import './App.css';

const App = () => (
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Rockets />} /> */}
        <Route path="/missions" element={<Missions />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
