import React from 'react';
import './style.scss';
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

export default NavItem;
