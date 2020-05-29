import React, { useState } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import api from '../../api/api';
import { setUser } from '../../redux/actions/user';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const HeaderControls = props => {
  const [loadingLogout, setLoadingLogout] = useState(false);

  const logout = () => {
    setLoadingLogout(true);
    api.users
      .logout()
      .catch(err => {
        console.log(err);
        setLoadingLogout(false);
      })
      .then(res => {
        setLoadingLogout(false);
        props.setUser(null);
      });
  };

  return (
    <>
      {props.user && props.user.sessionToken ? (
        <Button
          className="btn small outline"
          onClick={logout}
          loading={loadingLogout}
          text="Log Out"
        />
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default connect(
  state => ({ user: state.user || {} }),
  dispatch => ({ setUser: data => dispatch(setUser(data)) })
)(HeaderControls);
