import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Link } from 'react-router-dom';

const Register = props => {
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
          <h1>Register</h1>
          <RegisterForm />
          <p>
            <Link to="/login">Log in</Link> if you already have an account
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
)(Register);
