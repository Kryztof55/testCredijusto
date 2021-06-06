import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/dashboard";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
