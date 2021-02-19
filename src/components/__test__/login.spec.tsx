import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import LoginPage from "../../pages/LoginPage";
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { debug } from "console";

describe("<LoginPage />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <LoginPage />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });
  it("shoud render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | 분양톡 관리자");
    });
  });
  it("dispays email validation errors", async () => {
    const { getByPlaceholderText } = renderResult;
    const phoneNumber = getByPlaceholderText("휴대폰 번호 입력");

    await waitFor(() => {
      userEvent.type(phoneNumber, "this@wonrt");
    });
    debug();
  });
});
