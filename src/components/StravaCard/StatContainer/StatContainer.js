import React from "react";
import "./style.scss";
import { MdDirectionsBike, MdDirectionsRun } from "react-icons/md";

const StatContainer = ({ type, miles, duration, pace, paceType }) => (
  <div className="stat-container">
    <div className="stat-item">
      {type === "Run" && <MdDirectionsRun className="icon type-icon" />}
      {type === "Ride" && <MdDirectionsBike className="icon type-icon" />}
      <span className="subtitle">{type}</span>
    </div>
    <div className="stat-item">
      <span className="value">{miles.toFixed(2)}</span>
      <span className="subtitle">Miles</span>
    </div>
    <div className="stat-item">
      <span className="value">{duration}</span>
      <span className="subtitle">Duration</span>
    </div>
    <div className="stat-item">
      <span className="value">{pace}</span>
      <span className="subtitle">{paceType}</span>
    </div>
  </div>
);

export default StatContainer;
