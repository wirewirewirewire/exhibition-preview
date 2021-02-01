import React from "react";
import { Switch, Route } from "react-router-dom";

import Overview from "./Overview";
import Details from "./Details";
import styles from "./styles.module.scss";

export default function Settings() {
  return (
    <div className={styles.responseSelect}>
      <Switch>
        <Route path="/responseselect" exact component={Overview} />
        <Route path="/responseselect/:entry" component={Details} />
      </Switch>
    </div>
  );
}
