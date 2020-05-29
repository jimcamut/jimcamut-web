import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import api from '../../api/api';
import { notification } from 'antd';
import Button from '../../components/Button/Button';

const Account = props => {
  const [requestingVerify, setRequestingVerify] = useState(false);

  useEffect(() => {
    if (!props.user.sessionToken) {
      api.users.me(props.setUser).catch(() => null);
    }
  }, [props]);

  const requestEmailVerification = e => {
    e.preventDefault();
    if (requestingVerify) return;

    setRequestingVerify(true);

    api.users
      .verifyEmail()
      .then(res => {
        console.log(res);
        setRequestingVerify(false);
        notification.success({
          message: 'Success!',
          description: res.message
        });

        if (res.result && res.result.emailVerified) {
          api.users
            .me()
            .then(props.setUser)
            .catch(() => null);
        }
      })
      .catch(err => {
        console.log(err);
        setRequestingVerify(false);
        notification.error({
          message: 'Error',
          description:
            (err && err.data && err.data.message) || 'Something went wrong'
        });
      });
    return;
  };

  return (
    <div className="page-about">
      <div className="container">
        <div className="inner">
          <div className="section">
            <h3>Manage Your Account</h3>
            {!props.user.emailVerified && (
              <Button
                className="small"
                loading={requestingVerify}
                onClick={requestEmailVerification}
                text="Verify Email"
              />
            )}
            <p>
              <Link to="/update-password">Update Password</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    user: state.user || {}
  }),
  dispatch => ({
    setUser: data => dispatch(setUser(data))
  })
)(Account);
