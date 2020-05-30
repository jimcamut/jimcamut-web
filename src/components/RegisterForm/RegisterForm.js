import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import Form from '../Form/Form';
import InputGroup from '../Form/InputGroup';
import PinInput from 'react-pin-input';
import { notification } from 'antd';
import api from '../../api/api';

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
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPass,
      pin
    } = formData;
    const submitData = { first_name, last_name, email, password, pin };

    if (password !== confirmPass) {
      return notification.error({
        message: 'Error',
        description: 'Your passwords do not match'
      });
    }

    setLoading(true);

    api.users
      .register(submitData)
      .then(user => {
        setLoading(false);
        props.setUser(user);
        notification.success({
          message: 'Success!',
          description: 'Your account is created'
        });
        setFormData(defaultFormData);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: 'Error',
          description:
            (err && err.data && err.data.message) || 'Could now submit'
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
      className="registration-form"
      submitText="Register"
      onSubmit={onSubmit}
      style={props.style}
      loading={loading}
    >
      <InputGroup label="First Name" formKey="first_name" {...inputProps} />
      <InputGroup label="Last Name" formKey="last_name" {...inputProps} />
      <InputGroup label="Email" formKey="email" type="email" {...inputProps} />
      <InputGroup
        label="Password"
        formKey="password"
        type="password"
        isPassword
        {...inputProps}
      />
      <InputGroup
        label="Confirm Password"
        formKey="confirmPass"
        type="password"
        isPassword
        {...inputProps}
      />
      <div className="input-group">
        <label>Pin Number</label>
        <PinInput
          length={6}
          type="numeric"
          onChange={n => setFormDataWrapper('pin', n)}
          initialValue={formData['pin']}
        />
        <span style={{ fontSize: 12, marginTop: 10 }}>
          You must have a valid pin number to register
        </span>
      </div>
      {/* <InputGroup
        label="Pin Number"
        formKey="pin"
        type="phone"
        maxLength="6"
        pattern="\d{6}"
        after={
          <span style={{ fontSize: 12, marginTop: 10 }}>
            You must have a valid pin number to register
          </span>
        }
        {...inputProps}
      /> */}
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
