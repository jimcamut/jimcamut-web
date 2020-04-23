import React from 'react';
import './style.scss';
import { MdDirectionsBike, MdDirectionsRun } from 'react-icons/md';

const StatContainer = ({
  type,
  miles,
  duration,
  pace,
  paceType,
  toggleActivity
}) => (
  <div className="stat-container">
    {toggleActivity && (
      <div className="stat-item select-type">
        <div className="select-type">
          <MdDirectionsRun
            className={`icon type-icon${type === 'Run' ? ' active' : ''}`}
            onClick={() => toggleActivity('Run')}
          />

          <MdDirectionsBike
            className={`icon type-icon${type === 'Ride' ? ' active' : ''}`}
            onClick={() => toggleActivity('Ride')}
          />
        </div>
        <span className="subtitle">{type}s</span>
      </div>
    )}
    {!toggleActivity && (
      <div className="stat-item">
        {type === 'Run' && <MdDirectionsRun className="icon type-icon" />}
        {type === 'Ride' && <MdDirectionsBike className="icon type-icon" />}
        <span className="subtitle">{type}</span>
      </div>
    )}
    <div className="stat-item">
      <span className="value">{miles.toFixed(2)}</span>
      <span className="subtitle">Miles</span>
    </div>
    <div className="stat-item">
      <span className="value">{duration}</span>
      <span className="subtitle">Duration</span>
    </div>
    <div className="stat-item">
      <span className="value">{pace === 'NaN' ? '0' : pace}</span>
      <span className="subtitle">{paceType}</span>
    </div>
  </div>
);

export default StatContainer;
