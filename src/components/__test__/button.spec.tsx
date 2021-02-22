import { render } from "@testing-library/react";
import { debug } from "console";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should be render OK with Props", () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} actionText={"test"} />
    );
    getByText("test");
  });
  it("should display loading", () => {
    const { debug, getByText, container } = render(
      <Button canClick={false} loading={true} actionText={"test"} />
    );
    // debug();
    getByText("Loading...");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
