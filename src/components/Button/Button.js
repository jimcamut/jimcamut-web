import React from 'react';
// import './style.scss';

const Button = props => (
  <button
    className={(props.className || '') + (props.loading ? ' loading' : '')}
    disabled={props.loading}
    type={props.isForm ? 'submit' : undefined}
    name={props.isForm ? 'submit' : undefined}
    onClick={props.onClick}
  >
    {props.text || 'Submit'}
  </button>
);

export default Button;
