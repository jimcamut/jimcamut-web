import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../api/api';
import { setUser } from '../../redux/actions/user';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import FormPage from '../../components/FormPage/FormPage';

const Login = props => {
  useEffect(() => {
    if (!props.user.sessionToken) {
      api.users.me(props.setUser).catch(() => null);
    }
  }, [props]);

  return (
    <FormPage>
      <LoginForm />
      <p>
        <Link to="/register">Register</Link> if you've been given a pin
      </p>
      <p>
        <Link to="/recover-password">Lost password?</Link>
      </p>
    </FormPage>
  );
};

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(Login);
