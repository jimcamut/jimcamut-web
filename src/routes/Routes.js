import React, { useLayoutEffect } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import ReactGA from 'react-ga';
import routeConfig from './routeConfig';

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
  const authRedirects = routeConfig
    .filter(it => it.redirectForAuth)
    .map(it => it.path);

  if (isAuthenticated && authRedirects.includes(props.location.pathname)) {
    // Get where we need to redirect to
    const redirectTo = (
      routeConfig.find(it => it.path === props.location.pathname) || {}
    ).redirectForAuth;

    return (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: props.location }
        }}
      />
    );
  }

  return (
    <Switch>
      {routeConfig.map((route, i) => {
        const RouteType = route.private ? PrivateRoute : Route;
        return <RouteType key={i} {...data} {...route} />;
      })}
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(connect(props => ({ ...props }))(Routes));
