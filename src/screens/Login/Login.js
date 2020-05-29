import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../api/api';
import { setUser } from '../../redux/actions/user';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';

const Login = props => {
  useEffect(() => {
    if (!props.user.sessionToken) {
      api.users.me(props.setUser).catch(() => null);
    }
  }, [props]);

  return (
    <>
      <div
        className="page-login"
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: '1 1',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <div
          className="center-container"
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: 400,
            flexDirection: 'column'
          }}
        >
          <LoginForm />
          <p>
            <Link to="/register">Register</Link> if you've been given a pin
          </p>
          <p>
            <Link to="/recover-password">Lost password?</Link>
          </p>
        </div>
      </div>
    </>
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
