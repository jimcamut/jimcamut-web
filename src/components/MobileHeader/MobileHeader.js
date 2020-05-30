import React from 'react';
import './style.scss';
import LogoPortrait from '../Logos/LogoPortrait';
import { NavLink } from 'react-router-dom';
import Submenu from '../Menu/Submenu';

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      <div className="left">
        <NavLink exact to="/" className="logo-container">
          <LogoPortrait />
        </NavLink>
      </div>

      <div className="right">
        <Submenu />
      </div>
    </div>
  );
};

export default MobileHeader;
