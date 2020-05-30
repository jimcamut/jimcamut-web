import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const InputGroup = ({
  label,
  formKey,
  name,
  type = 'text',
  maxLength,
  pattern,
  update,
  getValue,
  error,
  before,
  after,
  isPassword
}) => {
  const [useType, setUseType] = useState(type);

  const toggleType = () => {
    if (isPassword) {
      setUseType(useType === 'password' ? 'text' : 'password');
    }
  };

  return (
    <div className="input-group">
      {before}
      <label htmlFor={formKey}>{label}</label>
      <div
        className={`input-row${isPassword ? ' password' : ''}${
          isPassword && useType === 'text' ? ' show-pass' : ''
        }`}
      >
        <input
          type={useType}
          name={label || formKey}
          value={getValue(formKey)}
          onChange={e => update(formKey, e.target.value)}
          maxLength={maxLength}
          pattern={pattern}
        />
        {isPassword && <FaEye onClick={toggleType} />}
      </div>

      {error && error !== '' && <p className="error">{error}</p>}
      {after}
    </div>
  );
};
export default InputGroup;
