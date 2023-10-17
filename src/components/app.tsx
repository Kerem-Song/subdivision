import React from "react";
import { useReactiveVar } from "@apollo/client";
import { LoggedOutRouter } from "../routers/loggedOutRouter";
import { LoggedInRouter } from "../routers/loggedInRouter";
import "../styles/tailwind.css";
import { isLoggedInVar } from "../apollo";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div id="App">{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</div>
  );
};
