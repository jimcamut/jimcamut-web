import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import SetNewPasswordForm from '../../components/SetNewPasswordForm/SetNewPasswordForm';
import FormPage from '../../components/FormPage/FormPage';

const SetNewPassword = () => (
  <FormPage>
    <SetNewPasswordForm />
  </FormPage>
);

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(SetNewPassword);
