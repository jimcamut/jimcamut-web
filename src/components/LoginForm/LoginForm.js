import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import Form from '../Form/Form';
import InputGroup from '../Form/InputGroup';
import api from '../../api/api';
import { notification } from 'antd';

const defaultFormData = {
  email: '',
  password: ''
};

const LoginForm = props => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const setFormDataWrapper = (key, value) => {
    const newFormData = Object.assign({}, formData, { [key]: value });
    setFormData(newFormData);
  };

  const onSubmit = e => {
    e.preventDefault();

    const { email, password } = formData;
    console.log('SUBMITTING', email, password);
    setLoading(true);
    api.users
      .login({ email, password })
      .then(res => {
        setLoading(false);
        props.setUser(res);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: 'Error',
          description:
            (err && err.data && err.data.message) || 'Could not log in'
        });
      });
    return;
  };

  const inputProps = {
    update: setFormDataWrapper,
    getValue: key => formData[key]
  };

  return (
    <Form
      className="login-form"
      submitText="Login"
      onSubmit={onSubmit}
      style={props.style}
      loading={loading}
    >
      <InputGroup label="Email" formKey="email" type="email" {...inputProps} />
      <InputGroup
        label="Password"
        formKey="password"
        type="password"
        isPassword
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
)(LoginForm);
