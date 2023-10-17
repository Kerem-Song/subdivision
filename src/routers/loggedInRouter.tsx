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
  CreateUserPage,
  // SearchPage,
} from "../pages";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";

const operatorRoutes = [
  {
    path: "/reservation",
    component: <ReservationPage />,
  },
  {
    path: "/option",
    component: <OptionPage />,
  },
  // {
  //   path: "/search",
  //   component: <SearchPage />,
  // },
];

const commonRoutes = [
  {
    path: "/",
    component: <ProjectPage />,
  },
  {
    path: "/info",
    component: <InfoPage />,
  },
  {
    path: "/alarmtalk",
    component: <AlarmTalkPage />,
  },
  {
    path: "/project",
    component: <ProjectPage />,
  },
  {
    path: "/reservation",
    component: <ReservationPage />,
  },
  {
    path: "/option",
    component: <OptionPage />,
  },
  {
    path: "/createCustomer",
    component: <CreateCustomerPage />,
  },
];

export const LoggedInRouter = () => {
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
        {/* {data.me.role === "Operator" &&
          operatorRoutes.map((route) => (
            <Route key={route.path} exact path={route.path}>
              {route.component}
            </Route>
          ))} */}
        {commonRoutes.map((route) => (
          <Route key={route.path} exact path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
