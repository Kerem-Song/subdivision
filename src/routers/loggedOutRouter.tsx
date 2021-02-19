import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateUserPage from "../pages/CreateUserPage";
import LoginPage from "../pages/LoginPage";
import { NotFound } from "../pages/404";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/createUser">
          <CreateUserPage />
        </Route>

        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

// export default LoggedOutRouter;
