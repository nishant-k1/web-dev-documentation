// import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import GroupTesting from "."; // Adjust the import path as necessary

// UI test using by forminmg groups using describe method of jest lib
describe.skip("UI test case group", () => {
  test("Should render an input field", () => {
    render(<GroupTesting />);
    const checkInput = screen.getByRole("textbox");
    const checkPlaceholder = screen.getByPlaceholderText("Name");
    expect(checkInput).toBeInTheDocument();
    expect(checkPlaceholder).toBeInTheDocument();
    expect(checkInput).toHaveAttribute("type", "text");
    expect(checkInput).toHaveAttribute("id", "name");
    expect(checkInput).toHaveAttribute("placeholder", "Name");
    expect(checkInput).toHaveAttribute("value", "Nishant Kumar");
  });
});


// business logic test using nested describe
describe.skip("Business logic test case", () => {
  test("should show Learn Testing text", () => {
    render(<GroupTesting />);
    const textElement = screen.getByText("Learn Testing");
    const altImage = screen.getByAltText("girl_image");
    const titleImage = screen.getByTitle("Girl Image");
    expect(textElement).toBeInTheDocument();
    expect(altImage).toBeInTheDocument();
    expect(titleImage).toBeInTheDocument();
  });

  describe("Nested logic test cases group", () => {
    test("should show Learn Testing text", () => {
      render(<GroupTesting />);
      const textElement = screen.getByText("Learn Testing");
      const altImage = screen.getByAltText("girl_image");
      const titleImage = screen.getByTitle("Girl Image");
      expect(textElement).toBeInTheDocument();
      expect(altImage).toBeInTheDocument();
      expect(titleImage).toBeInTheDocument();
    });
  });
});


// Event testing
describe("Test UI events", () => {
  test("On change event should work properly for the input field", () => {
    render(<GroupTesting />);
    const input = screen.getByRole("input_field") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abdslfjdsl" } });
    expect(input.value).toBe("abdslfjdsl");
  });
});
