import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NpsInfiniteAutoComplete } from "./index";

describe("NpsInfiniteAutoComplete", () => {
  it("renders correctly", () => {
    render(<NpsInfiniteAutoComplete />);
    expect(
      screen.getByText("NpsInfiniteAutoComplete Component"),
    ).toBeInTheDocument();
  });
});
