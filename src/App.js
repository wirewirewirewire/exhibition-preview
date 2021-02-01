import React from "react";
import "./scss/app.scss";
import ResponseQuestion from "components/ResponseQuestion";
import Draw from "components/Draw";
import ResponseType from "components/ResponseType";
import Login from "components/Login";
import ResponseSelect from "components/ResponseSelect";
import Gallery from "components/Gallery";
import Write from "components/Write";
import { HashRouter, Route, Switch, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

import fadeTransition from "./scss/pagetransition.module.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { DataLoader } from "ducks/data";
import ThankYou from "components/ThankYou";
import Uploader from "components/ResponseSelect/Uploader";

const history = createBrowserHistory();

// basename="/partizipativ-app/0.1.0"
function App() {
  return (
    <div className="App">
      <DataLoader />
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
      <Uploader />
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
            <Route path="/draw/:id?" component={Draw} />
            <Route path="/write/:id?" component={Write} />
            <Route path="/thankyou/:id?" component={ThankYou} />
            <Route path="/gallery/:id?/:entry?" component={Gallery} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
