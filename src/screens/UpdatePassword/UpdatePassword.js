import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import UpdatePasswordForm from '../../components/UpdatePasswordForm/UpdatePasswordForm';
import { Link } from 'react-router-dom';

const UpdatePassword = props => {
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
          <h1>Update Password</h1>
          <UpdatePasswordForm />
          <p>
            <Link to="/login">Log in</Link> if you already have an account
          </p>
          <p>
            <Link to="/register">Register</Link> if you don't
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
)(UpdatePassword);
