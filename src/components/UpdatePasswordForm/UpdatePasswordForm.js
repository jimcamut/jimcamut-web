import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import Form from '../Form/Form';
import InputGroup from '../Form/InputGroup';
import { notification } from 'antd';
import api from '../../api/api';
import { useHistory } from 'react-router-dom';

const defaultFormData = {
  password: '',
  confirmPass: ''
};

const UpdatePasswordForm = props => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  let history = useHistory();
  const goToLogin = () => history.push('/login');

  const setFormDataWrapper = (key, value) => {
    const newFormData = Object.assign({}, formData, { [key]: value });
    setFormData(newFormData);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { password, confirmPass } = formData;
    if (password !== confirmPass) {
      return notification.error({
        message: 'Error',
        description: 'Your passwords do not match'
      });
    }

    setLoading(true);

    api.users
      .updatePassword({ password })
      .then(res => {
        setLoading(false);
        notification.success({
          message: 'Success!',
          description: 'Your password was updated'
        });

        setFormData(defaultFormData);
        goToLogin();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: 'Error',
          description: (err && err.data && err.data.message) || 'Could submit'
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
      className="change-password-form"
      submitText="Update"
      onSubmit={onSubmit}
      style={props.style}
      loading={loading}
    >
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
)(UpdatePasswordForm);
