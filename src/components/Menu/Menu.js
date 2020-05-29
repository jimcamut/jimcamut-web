import React from 'react';
import './style.scss';
import LogoPortrait from '../Logos/LogoPortrait';
import { FaStrava, FaInstagram } from 'react-icons/fa';
import { FiUser, FiTwitter } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItem';
import Submenu from './Submenu';

const Menu = () => {
  return (
    <div className="menu">
      <div className="top">
        <NavLink exact to="/" className="logo-container">
          <LogoPortrait />
        </NavLink>
        <ul className="sub-menu">
          <NavItem to="about" icon={<FiUser />} />
          <NavItem to="strava" icon={<FaStrava />} />
          <NavItem to="grams" icon={<FaInstagram />} />
          <NavItem to="tweets" icon={<FiTwitter />} />
        </ul>
        <svg width="0" height="0">
          <radialGradient id="rg" r="150%" cx="30%" cy="107%">
            <stop stopColor="#fdf497" offset="0" />
            <stop stopColor="#fdf497" offset="0.05" />
            <stop stopColor="#fd5949" offset="0.45" />
            <stop stopColor="#d6249f" offset="0.6" />
            <stop stopColor="#285AEB" offset="0.9" />
          </radialGradient>
        </svg>
      </div>
      <div className="bottom">
        <Submenu />
      </div>
    </div>
  );
};

export default Menu;
