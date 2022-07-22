import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Missions from './components/Missions';
import './App.css';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';

const App = () => (
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/my_profile" element={<MyProfile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
