import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ProjectPage,
  InfoPage,
  AlarmTalkPage,
  ReservationPage,
  OptionPage,
  CreateCustomerPage,
  // SearchPage,
} from "../pages";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";

const OperatorRoutes = [
  <Route key={1} exact path="/reservation">
    <ReservationPage />
  </Route>,
  <Route key={2} path="/Search">
    {/* <SearchPage /> */}
  </Route>,
];

const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-white">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        {/* {data.me.role === "Operator" && OperatorRoutes} */}
        <Redirect from="potato" to="/" />
        <Route exact path="/" component={ProjectPage} />
        <Route path="/project" component={ProjectPage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/alarmtalk" component={AlarmTalkPage} />
        <Route path="/reservation" component={ReservationPage} />
        <Route path="/option" component={OptionPage} />
        <Route path="/createCustomer" component={CreateCustomerPage} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
