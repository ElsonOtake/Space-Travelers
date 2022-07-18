import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = () => (
  <>
    <nav>
      <div>
        <h1>Space Travelers</h1>
      </div>
    </nav>

    <Outlet />
  </>
);

export default Header;