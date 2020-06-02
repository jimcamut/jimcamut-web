import React, { useState, useEffect } from 'react';
import './style.scss';
import { loadTOC } from '../utils';
import api from '../../../api/api';
import ResumeBody from './ResumeBody';
import { notification } from 'antd';
import Loader from '../../../components/Loader/Loader';
import Button from '../../../components/Button/Button';
import { connect } from 'react-redux';
import { setResume } from '../../../redux/actions/resume';

const Resume = props => {
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  const loadResume = async () => {
    try {
      const resumeData = props.resume || {};
      const lastFetch = resumeData.fetched;
      const now = new Date();

      const hasData =
        resumeData.data &&
        resumeData.data.name &&
        lastFetch &&
        new Date(lastFetch).getTime() >
          new Date(now).setDate(now.getDate() - 1);

      if (hasData) {
        loadTOC('resume');
        return;
      }

      setLoading(true);
      const data = await api.resources.getResume();

      props.setResume(data);
      setLoading(false);
      setErrored(false);
      loadTOC('resume');
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrored(true);
      notification.success({
        message: 'Success!',
        description: 'Could not load resume'
      });
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const { sections } = props.resume.data || {};

  return (
    <div className="inner resume">
      <div className="table-of-contents"></div>
      <div className="content">
        <div className="section">
          {loading && <Loader />}
          {!loading && sections && <ResumeBody sections={sections} />}
          {!loading && errored && (
            <Button loading={loading} onClick={loadResume} text="Try Again" />
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    resume: state.resume || {}
  }),
  dispatch => ({
    setResume: data => dispatch(setResume(data))
  })
)(Resume);
