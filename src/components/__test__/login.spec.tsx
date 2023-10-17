import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import { LoginPage, LOGIN_MUTATION } from "../../pages/LoginPage";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<LoginPage />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
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
  it("dispays phone validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const phoneNumber = getByPlaceholderText("휴대폰 번호 입력");

    await waitFor(() => {
      userEvent.type(phoneNumber, "asdf");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/숫자만 입력하세요/);
    await waitFor(() => {
      userEvent.clear(phoneNumber);
    });
    // debug();
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/휴대폰번호 입력은 필수입니다./);
  });
  it("display password required errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const phoneNumber = getByPlaceholderText("휴대폰 번호 입력");
    const submitBtn = getByRole("button");

    await waitFor(() => {
      userEvent.type(phoneNumber, "01012345678");
      userEvent.click(submitBtn);
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/비밀번호 입력은 필수입니다./);
    // debug();
  });
  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const phoneNumber = getByPlaceholderText("휴대폰 번호 입력");
    const password = getByPlaceholderText("비밀번호 입력");
    const submitBtn = getByRole("button");

    const formData = {
      phoneNumber: "01012345678",
      password: "1234567890",
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "xxx",
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await waitFor(() => {
      userEvent.type(phoneNumber, formData.phoneNumber);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      },
    });

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "subdivision-token",
      "xxx"
    );
  });
});
