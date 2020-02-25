import React, { useState } from "react";
import "./style.scss";
import LogoPortrait from "../Logos/LogoPortrait";
import { FaGithub, FaStrava, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiUser, FiTwitter, FiLock } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const foo = "bar";
  return (
    <div className="menu">
      <div className="top">
        <NavLink to="/" className="logo-container">
          <LogoPortrait />
        </NavLink>
        <ul className="sub-menu">
          <li>
            <NavLink to="about">
              <FiUser />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="strava">
              <FaStrava />
              <span>Strava</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="grams">
              <FaInstagram />
              <span>Grams</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="tweets">
              <FiTwitter />
              <span>Tweets</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="sub-menu">
          <li>
            <a
              href="https://github.com/jimcamut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>Github</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jimcamut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jimcamut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLock />
              <span>Protected</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
