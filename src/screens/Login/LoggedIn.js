import React, { useState } from 'react';
import { setUser } from '../../redux/actions/user';
import api from '../../api/api';
import { connect } from 'react-redux';

// TODO: turn this into a component
const LoggedIn = props => {
  const [loading, setLoading] = useState(false);
  const logOut = () => {
    const token = props.user.sessionToken;
    setLoading(true);
    api.users
      .logout(token)
      .catch(() => null)
      .then(res => {
        setLoading(false);
        props.setUser(null);
      });
    return;
  };
  return <button onClick={logOut}>Log Out</button>;
};

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(LoggedIn);
