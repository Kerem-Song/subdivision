import React from "react";
import { render } from "@testing-library/react";
import FormError from "../formError";

describe("<FormError />", () => {
  it("renders Ok with Props", () => {
    const { getByText } = render(<FormError errorMessage="test" />);
    getByText("test");
  });
});
