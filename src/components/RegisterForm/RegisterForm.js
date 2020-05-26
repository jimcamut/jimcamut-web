import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import Form from '../Form/Form';
import InputGroup from '../Form/InputGroup';

const defaultFormData = {
  pin: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPass: ''
};

const RegisterForm = props => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const setFormDataWrapper = (key, value) => {
    const newFormData = Object.assign({}, formData, { [key]: value });
    setFormData(newFormData);
  };

  const onSubmit = e => {
    e.preventDefault();
    return;
  };

  useEffect(() => {}, []);

  const inputProps = {
    update: setFormDataWrapper,
    getValue: key => formData[key]
  };

  return (
    <Form
      className="registration-form"
      submitText="Register"
      onSubmit={onSubmit}
      style={props.style}
    >
      <InputGroup
        label="Pin Number"
        formKey="pin"
        type="phone"
        maxLength="4"
        pattern="\d{4}"
        {...inputProps}
      />
      <InputGroup label="First Name" formKey="first_name" {...inputProps} />
      <InputGroup label="Last Name" formKey="last_name" {...inputProps} />
      <InputGroup label="Email" formKey="email" type="email" {...inputProps} />
      <InputGroup
        label="Password"
        formKey="password"
        type="password"
        {...inputProps}
      />
      <InputGroup
        label="Confirm Password"
        formKey="confirmPass"
        type="password"
        {...inputProps}
      />
    </Form>
  );
};

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(RegisterForm);
