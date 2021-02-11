import React from "react";
import "./scss/app.scss";
import Overview from "components/Overview";
import Preview from "components/Preview";
import Details from "components/Details";
import Login from "components/Login";
import ResponseSelect from "components/ResponseSelect";
import { HashRouter, Route, Switch, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

import fadeTransition from "./scss/pagetransition.module.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { DataLoader } from "ducks/data";
import PrivateRoute from "components/Login/PrivateRoute";
import Logout from "components/Login/Logout";

const history = createBrowserHistory();

// basename="/partizipativ-app/0.1.0"
function App() {
  return (
    <div className="App">
      {/*<DataLoader />*/}
      <HashRouter history={history}>
        <Switch>
          <Route path="*">
            <AnimatedRoutes />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

function AnimatedRoutes() {
  let location = useLocation();
  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames={fadeTransition}
          timeout={500}
        >
          <Switch location={location}>
            {/*<Redirect from="/" to="responsetype" />*/}
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/preview/:id?" component={Preview} />
            <PrivateRoute path="/:type?/:id?" component={Overview} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
