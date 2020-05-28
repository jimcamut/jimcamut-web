import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api/api';
import { setUser } from '../../redux/actions/user';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Login = props => {
  const [loadingLogout, setLoadingLogout] = useState(false);
  useEffect(() => {
    if (!props.user.sessionToken) {
      api.users
        .me()
        .then(me => {
          console.log('GOT ME', me);
          props.setUser(me);
        })
        .catch(console.log);
    }
  }, [props.user]);

  const logout = () => {
    console.log('LOGGIN OTU');
    setLoadingLogout(true);
    api.users
      .logout()
      .catch(err => {
        console.log(err);
        setLoadingLogout(false);
      })
      .then(res => {
        if (loadingLogout) {
          setLoadingLogout(false);
        }
        console.log(res);
        props.setUser(null);
      });
  };

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
          {props.user && props.user.sessionToken ? (
            <Button onClick={logout} loading={loadingLogout} text="Log Out" />
          ) : (
            <>
              <h1>Login</h1>
              <LoginForm />
              <p>
                <Link to="/register">Register</Link> if you've been given a pin
              </p>
              <p>
                <Link to="/recover-password">Lost password?</Link>
              </p>
            </>
          )}
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
