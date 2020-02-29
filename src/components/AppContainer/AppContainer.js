import React, { useState } from "react";
import "./style.scss";
import Routes from "../../routes/Routes";
import Menu from "../Menu/Menu";

const AppContainer = () => {
  const foo = "bar";
  return (
    <div className="app-container">
      <Menu />
      <div className="pane-container">
        <Routes />
      </div>
    </div>
  );
};

export default AppContainer;
