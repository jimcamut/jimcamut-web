import React from 'react';

const InputGroup = ({
  label,
  formKey,
  type = 'text',
  maxLength,
  pattern,
  update,
  getValue,
  error,
  before,
  after
}) => (
  <div className="input-group">
    {before}
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
    {after}
  </div>
);
export default InputGroup;
