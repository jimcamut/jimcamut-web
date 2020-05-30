import React from 'react';
import './style.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import NavItem from './NavItem';
import HeaderControls from '../Header/HeaderControls';

const Submenu = () => (
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
    <li className="header-controls">
      <HeaderControls />
    </li>
  </ul>
);

export default Submenu;
