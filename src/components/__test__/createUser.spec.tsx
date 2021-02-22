import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import {
  CreateUserPage,
  CREATE_USER_MUTATION,
} from "../../pages/CreateUserPage";
import { render, RenderResult, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateUserPage />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateUserPage />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("회원가입 | 분양톡 관리자");
    });
  });
  it("renders validation error", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const phoneNumber = getByPlaceholderText("휴대폰 번호 입력");
    const password = getByPlaceholderText("비밀번호 입력");
    const button = getByRole("button");

    await waitFor(() => {
      userEvent.type(phoneNumber, "won't work");
    });

    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/숫자만 입력하세요/);

    await waitFor(() => {
      userEvent.clear(phoneNumber);
    });

    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/휴대폰번호 입력은 필수입니다./);

    await waitFor(() => {
      userEvent.type(phoneNumber, "01012345678");
      userEvent.click(button);
    });

    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/비밀번호 입력은 필수입니다./);
  });
  it("submits mutation with form values", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const phoneNumber = getByPlaceholderText("휴대폰 번호 입력");
    const password = getByPlaceholderText("비밀번호 입력");
    const button = getByRole("button");
    const formData = {
      phoneNumber: "01012345678",
      password: "1234567890",
    };
    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createUser: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_USER_MUTATION,
      mockedLoginMutationResponse
    );
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(phoneNumber, formData.phoneNumber);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
      createUserInput: {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      },
    });
    expect(window.alert).toHaveBeenCalledWith(
      "계정이 생성되었습니다. 로그인 하세요."
    );
    const mutationError = getByRole("alert");
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mutationError).toHaveTextContent("mutation-error");
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
