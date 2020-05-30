import React from 'react';
import './style.scss';

const ContentPage = props => (
  <div className="form-page">
    <div className="container">{props.children}</div>
  </div>
);
export default ContentPage;
