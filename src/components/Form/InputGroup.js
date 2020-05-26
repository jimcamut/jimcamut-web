import React from 'react';

const InputGroup = ({
  label,
  formKey,
  type = 'text',
  maxLength,
  pattern,
  update,
  getValue,
  error
}) => (
  <div className="input-group">
    <label htmlFor={formKey}>{label}</label>
    <input
      type={type}
      name={formKey}
      value={getValue(formKey)}
      onChange={e => update(formKey, e.target.value)}
      maxLength={maxLength}
      pattern={pattern}
    />
    {error && error !== '' && <p className="error">{error}</p>}
  </div>
);
export default InputGroup;
