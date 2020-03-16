import React, { useLayoutEffect } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { getURLParams, parseError } from '../utils/utils';

import Dashboard from '../screens/Dashboard/Dashboard';
import About from '../screens/About/About';
import Strava from '../screens/Strava/Strava';
import Grams from '../screens/Grams/Grams';
import Tweets from '../screens/Tweets/Tweets';
import ReactGA from 'react-ga';

const trackGA = location => {
  const page = location && location.pathname;
  if (!page) return;
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const Routes = props => {
  const { user } = props;
  const { id, sessionToken } = user || {};

  // Tracking GA
  props.history.listen(location => trackGA(location));
  useLayoutEffect(() => trackGA(window.location), []);

  // Add "isAuthenticated" to props for PrivateRoute
  const isAuthenticated = !!sessionToken;
  const data = Object.assign({}, props, {
    isAuthenticated
  });
  let token;

  try {
    const urlParams = getURLParams() || [];
    token = ((urlParams || []).find(it => it && it.key === 'session') || {})
      .value;
  } catch (e) {}

  const hideToken = () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.origin + window.location.pathname
    );
  };

  // Enable Ability to assume session
  if (token) {
    // const tokenMatch = sessionToken === token;
    // const preLogin = () => (tokenMatch ? Promise.resolve() : API.logout());
    // preLogin()
    //   .catch(() => null)
    //   .then(() => API.loginAndSet({ token: token }))
    //   .then(hideToken)
    //   .catch(err => {
    //     hideToken();
    //     notification.error({
    //       message: "Error",
    //       description: parseError(err)
    //     });
    //   });
  }

  // Don't make the user login again
  if (
    isAuthenticated &&
    ['/', '/register', '/login'].includes(props.location.pathname)
  ) {
    // return (
    //   <Redirect
    //     to={{
    //       pathname: "/dashboard",
    //       state: { from: props.location }
    //     }}
    //   />
    // );
  }

  return (
    <Switch>
      <Route {...data} path="/" exact component={Dashboard} />
      <Route {...data} path="/about" exact component={About} />
      <Route {...data} path="/strava" exact component={Strava} />
      <Route {...data} path="/grams" exact component={Grams} />
      <Route {...data} path="/tweets" exact component={Tweets} />
      {/* <Route {...data} path="/login" component={Login} />
        <PrivateRoute {...data} path="/dashboard" component={Dashboard} /> */}
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(connect(props => ({ ...props }))(Routes));
