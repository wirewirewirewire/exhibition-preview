import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "data-handler/store";

import { connect } from "react-redux";

export default class Auth {
  /*static authenticateUser = (userData, password) => {
    store.dispatch({
      type: "LOGIN",
      data: userData,
      password: password,
    });
    return true;
  };*/

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated = () => {
    const user = store.getState().auth.token;
    //return true;
    return user !== undefined;
  };

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserLocalAuthenticated = () => {
    const user = store.getState().auth && store.getState().auth.token;
    return user;
  };

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser = () => {
    store.dispatch({ type: "LOGOUT" });
  };
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isUserAuthenticated() && Auth.isUserLocalAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : Auth.isUserAuthenticated() && !Auth.isUserLocalAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/locallogin/",
              state: { from: props.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/login/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.token,
  };
};

connect(mapStateToProps)(PrivateRoute);
