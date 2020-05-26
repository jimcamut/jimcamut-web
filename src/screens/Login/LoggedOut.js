import React from 'react';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoggedOut = props => (
  <>
    {props.mode === 'login' && (
      <>
        <h1>Login</h1>
        <LoginForm />
        <p>
          <span onClick={() => props.setMode('register')}>Register</span> if
          you've been given a pin
        </p>
        <p>
          <span onClick={() => props.setMode('lost-password')}>
            Lost password?
          </span>
        </p>
      </>
    )}
    {props.mode === 'register' && (
      <>
        <h1>Register</h1>
        <RegisterForm />
        <p>
          <span onClick={() => props.setMode('login')}>Log in</span> if you
          already have an account
        </p>
      </>
    )}
  </>
);

export default LoggedOut;
