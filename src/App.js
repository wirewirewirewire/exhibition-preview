import React from "react";
import "./scss/app.scss";
import ResponseQuestion from "components/ResponseQuestion";
import Preview from "components/Preview";
import ResponseType from "components/ResponseType";
import Login from "components/Login";
import ResponseSelect from "components/ResponseSelect";
import { HashRouter, Route, Switch, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

import fadeTransition from "./scss/pagetransition.module.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { DataLoader } from "ducks/data";

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
            <Route exact path="/" component={ResponseQuestion} />
            <Route path="/login" component={Login} />
            <Route path="/responseselect" component={ResponseSelect} />
            <Route path="/type/:id?" component={ResponseType} />

            <Route path="/preview/:id?" component={Preview} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
