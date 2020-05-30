import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import RecoverPasswordForm from '../../components/RecoverPasswordForm/RecoverPasswordForm';
import { Link } from 'react-router-dom';
import FormPage from '../../components/FormPage/FormPage';

const RecoverPassword = () => (
  <FormPage>
    <RecoverPasswordForm />
    <p>
      <Link to="/login">Log in</Link> if you already have an account
    </p>
  </FormPage>
);

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(RecoverPassword);
