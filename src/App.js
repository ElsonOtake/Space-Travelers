import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

const App = () => (
  <React.StrictMode>
    <Router>
      <Header />
      {/* <Routes>
        <Route path="/" element={<Rockets />} />
        <Route path="categories" element={<Missions />} />
      </Routes> */}
    </Router>
  </React.StrictMode>
);

export default App;
