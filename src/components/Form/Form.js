import React from 'react';
import './style.scss';

const Form = props => (
  <form
    className={`form-control${(props.className && ' ' + props.className) ||
      ''}`}
    onSubmit={props.onSubmit}
    style={props.style}
  >
    {props.children}
    <div className="input-group">
      <button
        className={(props.loading && ' loading') || ''}
        disabled={props.loading}
        type="submit"
        name="submit"
        onClick={props.onSubmit}
      >
        {props.submitText || 'Submit'}
      </button>
    </div>
  </form>
);

export default Form;
