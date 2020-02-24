import React, { useState } from "react";
import "./style.scss";

const Menu = () => {
  const foo = "bar";
  return (
    <div className="menu">
      <a href="#">Logo</a>
      <ul className="main-menu">
        <li>About</li>
        <li>Strava</li>
        <li>Instagram</li>
        <li>Twitter</li>
      </ul>
      <ul className="bottom-menu">
        <li>Github</li>
      </ul>
    </div>
  );
};

export default Menu;
