import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccout from "../pages/CreateAccountPage";
import LoginPage from "../pages/LoginPage";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/createAccount">
          <CreateAccout />
        </Route>

        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
