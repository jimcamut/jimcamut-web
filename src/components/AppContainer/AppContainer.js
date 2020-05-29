import React from 'react';
import './style.scss';
import Routes from '../../routes/Routes';
import Menu from '../Menu/Menu';
import MobileHeader from '../MobileHeader/MobileHeader';
import Header from '../Header/Header';

const AppContainer = () => (
  <div className="app-container">
    <Menu />
    <div className="pane-container">
      <Routes />
      <Header />
    </div>
    <MobileHeader />
  </div>
);

export default AppContainer;
