import React, { useState, useEffect } from 'react';
import './style.scss';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import { setDash } from '../../redux/actions/dash';
import { connect } from 'react-redux';
import DashCenter from './DashCenter';

const Dashboard = props => {
  const [loading, setLoading] = useState(false);
  const [dashData, setDashData] = useState(props.dash.data || {});

  const getDash = opts => {
    if (loading) return;

    setLoading(true);
    api.dash
      .fetchDash(opts)
      .then(data => {
        props.setDash(data);
        setDashData(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDash();
  }, []);

  const hasData = Object.keys(dashData || {}).length;
  const showLoader = !hasData && loading;

  return (
    <div className="dashboard">
      <div className="about-column">
        <div className="container content">
          <div className="circle">
            <img src={require('../../assets/img/jimcamut.jpg')} alt="profile" />
          </div>
          <h1>Jim Camut</h1>
          <p>
            Hi, I'm the webmaster around here. You can read more about me{' '}
            <Link to="about">here</Link>. Otherwise, click around and see what I
            did with the <Link to="strava">Strava</Link>,{' '}
            <Link to="grams">Instagram</Link> and{' '}
            <Link to="tweets">Twitter</Link> APIs.
          </p>
          {/* <footer>
            <p>Like my website? I've open sourced it.</p>
          </footer> */}
        </div>
      </div>
      {showLoader && <Loader />}
      {!showLoader && <DashCenter dashData={dashData} />}
    </div>
  );
};

export default connect(
  state => ({
    dash: state.dash || {}
  }),
  dispatch => ({
    setDash: data => dispatch(setDash(data))
  })
)(Dashboard);
