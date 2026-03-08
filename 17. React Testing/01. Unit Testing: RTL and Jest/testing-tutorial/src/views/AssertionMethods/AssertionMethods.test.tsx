import { screen, render, configure } from "@testing-library/react";
import AssertionMethods from ".";
// Assertion methods
describe("Assertion methods", () => {
  test("Assertion methods", () => {
    render(<AssertionMethods />);
    const inputField = screen.getByRole("textbox");
    // test if element is rendering
    expect(inputField).toBeInTheDocument();

    // test if element has any value
    expect(inputField).toHaveValue();

    // test if the element's value matches
    expect(inputField).toHaveValue("Nishant Kumar");

    // test if element is enabled
    expect(inputField).toBeEnabled();

    // test if element is disabled
    // expect(inputField).toBeDisabled);

    // test if element has attribute
    expect(inputField).toHaveAttribute("id");

    // test if element has class
    expect(inputField).toHaveClass("testStyle");
  });
});

describe("Test Assertion Not Methods", () => {
  test("Test Assertion Not Methods", () => {
    render(<AssertionMethods />);
    const btn = screen.getByRole("button");
    // expect(btn).toBeInTheDocument();
    // expect(btn).not.toBeInTheDocument();
    expect(btn).not.toHaveClass("btn-btn");
    expect(btn).not.toHaveAttribute("id-id");
    expect(btn).not.toBeDisabled();
  });
});
