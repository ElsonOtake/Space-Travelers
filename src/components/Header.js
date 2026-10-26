import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/planet.png';

const Header = () => (
  <nav>
    <div>
      <img src={logo} alt="planet logo" />
      <h2>Space Travelers&apos; Hub</h2>
    </div>
    <ul className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        Rockets
      </NavLink>
      <NavLink
        to="/launches"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        Launches
      </NavLink>
      <NavLink
        to="/crew"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        Crew
      </NavLink>
      <NavLink
        to="/my_profile"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        My Profile
      </NavLink>
    </ul>
  </nav>
);

export default Header;
