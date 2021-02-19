import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import Header from "../header";
import { ME_QUERY } from "../../hooks/useMe";

describe("<Header />", () => {
  it("renders ok with data", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    phoneNumber: "",
                    password: "",
                    role: "Admin",
                  },
                },
              },
            },
          ]}
        >
          <Header />
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText("Operator")).toBeNull;
    });
  });
  it("renders without data", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    phoneNumber: "",
                    password: "",
                    role: "Operater",
                  },
                },
              },
            },
          ]}
        >
          <Header />
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText("Operator")).toBeNull;
    });
  });
});
