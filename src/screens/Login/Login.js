import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import api from '../../api/api';
import { setUser } from '../../redux/actions/user';

const Login = props => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');

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

  console.log('USER RENDERED', props.user);

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
          {props.user.sessionToken ? (
            <LoggedIn />
          ) : (
            <LoggedOut mode={mode} setMode={setMode} />
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
