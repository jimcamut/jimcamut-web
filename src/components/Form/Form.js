import React from 'react';
import './style.scss';
import Button from '../Button/Button';

const Form = props => (
  <form
    className={`form-control${(props.className && ' ' + props.className) ||
      ''}`}
    onSubmit={props.onSubmit}
    style={props.style}
  >
    {props.children}
    <div className="input-group">
      <Button
        isForm
        loading={props.loading}
        onClick={props.onSubmit}
        text={props.submitText}
      />
    </div>
  </form>
);

export default Form;
