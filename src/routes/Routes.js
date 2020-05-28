import React, { useLayoutEffect } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

import Dashboard from '../screens/Dashboard/Dashboard';
import About from '../screens/About/About';
import Strava from '../screens/Strava/Strava';
import Grams from '../screens/Grams/Grams';
import Tweets from '../screens/Tweets/Tweets';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ReactGA from 'react-ga';
import RecoverPassword from '../screens/RecoverPassword/RecoverPassword';
import UpdatePassword from '../screens/UpdatePassword/UpdatePassword';
import Account from '../screens/Account/Account';

const trackGA = location => {
  const page = location && location.pathname;
  if (!page) return;
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const Routes = props => {
  const { user } = props;
  const { /*id,*/ sessionToken } = user || {};

  // Tracking GA
  props.history.listen(location => trackGA(location));
  useLayoutEffect(() => trackGA(window.location), []);

  // Add "isAuthenticated" to props for PrivateRoute
  const isAuthenticated = !!sessionToken;
  const data = Object.assign({}, props, { isAuthenticated });

  // const hideToken = () => {
  //   window.history.replaceState(
  //     {},
  //     document.title,
  //     window.location.origin + window.location.pathname
  //   );
  // };

  // Don't make the user login again
  if (
    isAuthenticated &&
    ['/register', '/login'].includes(props.location.pathname)
  ) {
    return (
      <Redirect
        to={{
          pathname: '/account',
          state: { from: props.location }
        }}
      />
    );
  }

  return (
    <Switch>
      <Route {...data} path="/" exact component={Dashboard} />
      <Route {...data} path="/about" exact component={About} />
      <Route {...data} path="/strava" exact component={Strava} />
      <Route {...data} path="/grams" exact component={Grams} />
      <Route {...data} path="/tweets" exact component={Tweets} />
      <Route {...data} path="/login" component={Login} />
      <Route {...data} path="/register" component={Register} />
      <Route {...data} path="/recover-password" component={RecoverPassword} />
      <Route {...data} path="/update-password" component={UpdatePassword} />
      <PrivateRoute {...data} path="/account" component={Account} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(connect(props => ({ ...props }))(Routes));
