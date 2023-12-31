import { render, waitFor } from "@testing-library/react";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";

jest.mock("../../routers/loggedOutRouter", () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});

jest.mock("../../routers/loggedInRouter", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(<App />);
    getByText("logged-out");
  });
  it("renders LoggedInRouter", async () => {
    const { getByText, debug } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    // debug();
    getByText("logged-in");
  });
});
