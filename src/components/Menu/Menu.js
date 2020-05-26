import React from 'react';
import './style.scss';
import LogoPortrait from '../Logos/LogoPortrait';
import { FaGithub, FaStrava, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiUser, FiTwitter, FiLock } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon, label, ext }) => {
  const labelTxt = label || to;
  const labelTxtLower = labelTxt.toLowerCase();
  const labelDisplay = label || to.charAt(0).toUpperCase() + to.slice(1);
  const Chilren = (
    <>
      {icon}
      <span>{labelDisplay}</span>
    </>
  );
  const Inner = () =>
    ext ? (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        children={Chilren}
      />
    ) : (
      <NavLink to={to} children={Chilren} />
    );
  return (
    <li className={labelTxtLower}>
      <Inner />
    </li>
  );
};

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
        <ul className="sub-menu">
          <NavItem
            label="Github"
            to="https://github.com/jimcamut"
            icon={<FaGithub />}
            ext
          />
          <NavItem
            label="LinkedIn"
            to="https://www.linkedin.com/in/jimcamut"
            icon={<FaLinkedin />}
            ext
          />
          <NavItem exact label="Private" to="login" icon={<FiLock />} />
        </ul>
      </div>
    </div>
  );
};

export default Menu;
