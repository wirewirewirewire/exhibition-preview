import React, { useEffect } from "react";
import "./scss/app.scss";
import Overview from "components/Overview";
import Preview from "components/Preview";
import Details from "components/Details";
import Login from "components/Login";
import ResponseSelect from "components/ResponseSelect";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import fadeTransition from "./scss/pagetransition.module.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from "components/Login/PrivateRoute";
import Logout from "components/Login/Logout";
import axiosInterceptors from "components/Login/axiosInterceptors";

const history = createBrowserHistory();

// basename="/partizipativ-app/0.1.0"
function App() {
  useEffect(() => {
    axiosInterceptors.setupInterceptors(history);
  }, []);
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {/*<Redirect from="/" to="responsetype" />*/}
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/preview/:id?" component={Preview} />
          <PrivateRoute path="/p/:id?" component={Preview} />
          <PrivateRoute path="/:type?/:id?" component={Overview} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
