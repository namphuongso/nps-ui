import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NpsButton } from "./index";

describe("NpsButton", () => {
  it("renders correctly with text", () => {
    render(<NpsButton>Click me</NpsButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<NpsButton onClick={handleClick}>Click me</NpsButton>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary type from Ant Design", () => {
    const { container } = render(<NpsButton type="primary">Primary</NpsButton>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("ant-btn-primary");
  });

  it("applies custom rounded-full class when rounded='full'", () => {
    const { container } = render(<NpsButton rounded="full">Rounded</NpsButton>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("!rounded-full");
  });

  it("is disabled when disabled prop is true", () => {
    render(<NpsButton disabled>Disabled</NpsButton>);
    const button = screen.getByText("Disabled").closest("button");
    expect(button).toBeDisabled();
  });
});
