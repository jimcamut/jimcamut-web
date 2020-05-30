import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Link } from 'react-router-dom';
import FormPage from '../../components/FormPage/FormPage';

const Register = () => (
  <FormPage>
    <h2>Create Your Account</h2>
    <p>
      Create a new account if you have a valid pin number. All fields are
      required.
    </p>

    <RegisterForm />
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
)(Register);
