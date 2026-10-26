import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Crew from './components/Crew';
import Launches from './components/Launches';
import './App.css';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';

const App = () => (
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Rockets />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/missions" element={<Navigate to="/launches" replace />} />
        <Route path="/my_profile" element={<MyProfile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
