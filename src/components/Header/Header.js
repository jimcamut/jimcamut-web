import React from 'react';
import './style.scss';
import HeaderControls from './HeaderControls';
import { useLocation } from 'react-router-dom';
import routeConfig from '../../routes/routeConfig';

const Header = () => {
  let location = useLocation();
  const path = location.pathname;
  const config = routeConfig.find(it => it.path === path) || {};
  const { name, color } = config;
  const style = color ? { color } : {};

  return (
    <div id="header">
      {name && <h1 style={style}>{name}</h1>}
      <HeaderControls />
    </div>
  );
};

export default Header;
