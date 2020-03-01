import React from "react";
import "./style.scss";
import LogoPortrait from "../Logos/LogoPortrait";
// import { FaGithub, FaLinkedin } from "react-icons/fa";
// import { FiLock } from "react-icons/fi";
import { NavLink } from "react-router-dom";

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

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      <div className="left">
        <NavLink exact to="/" className="logo-container">
          <LogoPortrait />
        </NavLink>
      </div>

      {/* <div className="right">
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
          <NavItem exact label="Private" to="private-login" icon={<FiLock />} />
        </ul>
      </div> */}
    </div>
  );
};

export default MobileHeader;
