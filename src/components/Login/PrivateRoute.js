import React from "react";
import { Redirect, Route } from "react-router";

export function isUserAuthenticated() {
  const accesstoken = localStorage.getItem("access-token");
  return accesstoken;
}

export function logout() {
  localStorage.removeItem("access-token");
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated() ? (
          <Component {...props} {...rest} />
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

export default PrivateRoute;
