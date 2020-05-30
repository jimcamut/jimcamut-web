import React, { useEffect } from 'react';
import './style.scss';

import { loadTOC } from './utils';

const Resume = () => {
  useEffect(() => {
    loadTOC('resume');
  }, []);
  return (
    <div className="inner resume">
      <div className="table-of-contents"></div>
      <div className="content">
        <div className="section">
          <h2>Coming Soon</h2>

          <p>
            It's been 6 years since I've had to update my resume, so needless to
            say, it's under construction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
