import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <>
    <nav>
      <div>
        <h1>Space Travelers</h1>
      </div>
      <ul className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        Rockets
      </NavLink>
      <NavLink
        to="/missions"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        Missions
      </NavLink>
      <NavLink
        to="/my_profile"
        className={({ isActive }) => (isActive ? 'active' : 'notActive')}
      >
        My Profile
      </NavLink>

    </ul> 
    </nav>

    {/* <Outlet /> */}
  </>
);

export default Header;