import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import UpdatePasswordForm from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import FormPage from '../../components/FormPage/FormPage';

const UpdatePassword = () => (
  <FormPage>
    <UpdatePasswordForm />
  </FormPage>
);

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(UpdatePassword);
