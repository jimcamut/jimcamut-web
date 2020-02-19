import React, { useLayoutEffect } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { getURLParams, parseError } from "../utils/utils";

import Home from "../screens/Home";
import Header from "../components/Header/Header";

const Routes = props => {
  const { user } = props;
  const { id, sessionToken } = user || {};

  // Tracking GA
  props.history.listen(location => console.log(location));

  // Add "isAuthenticated" to props for PrivateRoute
  const isAuthenticated = !!sessionToken;
  const data = Object.assign({}, props, { isAuthenticated });
  let token;

  try {
    const urlParams = getURLParams() || [];
    token = ((urlParams || []).find(it => it && it.key === "session") || {})
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
    ["/", "/register", "/login"].includes(props.location.pathname)
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
    <>
      <Header {...props} />
      <Switch>
        <Route {...data} path="/" exact component={Home} />
        {/* <Route {...data} path="/login" component={Login} />
        <PrivateRoute {...data} path="/dashboard" component={Dashboard} /> */}
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default withRouter(connect(props => ({ ...props }))(Routes));
