import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import Form from '../Form/Form';
import InputGroup from '../Form/InputGroup';
import { notification } from 'antd';
import api from '../../api/api';
import { getURLParamsValue } from '../../utils/utils';

const defaultFormData = {
  email: ''
};

const RecoverPasswordForm = props => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const setFormDataWrapper = (key, value) => {
    const newFormData = Object.assign({}, formData, { [key]: value });
    setFormData(newFormData);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email } = formData;

    setLoading(true);

    api.users
      .recoverPassword({ email })
      .then(res => {
        console.log(res);
        setLoading(false);
        notification.success({
          message: 'Success!',
          description: res.message
        });

        console.log(res);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: 'Error',
          description:
            (err && err.data && err.data.message) || 'Could not submit'
        });
      });
    return;
  };

  useEffect(() => {}, []);

  const inputProps = {
    update: setFormDataWrapper,
    getValue: key => formData[key]
  };

  return (
    <Form
      className="recover-password-form"
      submitText="Submit"
      onSubmit={onSubmit}
      style={props.style}
      loading={loading}
    >
      <InputGroup label="Email" formKey="email" type="email" {...inputProps} />
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
)(RecoverPasswordForm);
