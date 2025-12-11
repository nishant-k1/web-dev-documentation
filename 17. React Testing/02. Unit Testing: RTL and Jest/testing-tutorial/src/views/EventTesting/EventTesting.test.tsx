// import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import EventTesting from "."; // Adjust the import path as necessary

describe("Test UI events", () => {
  // On Change Event testing
  test("On change event should work properly for the input field", () => {
    render(<EventTesting />);
    const input = screen.getByRole("input_field") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "a" } });
    expect(input.value).toBe("a");
  });

  // Click Event testing
  test("On Click event should work properly for the input field", () => {
    render(<EventTesting />);
    const button = screen.getByRole("btn") as HTMLButtonElement;
    fireEvent.click(button);
    expect(screen.getByText("Hello! Nishant")).toBeInTheDocument();
  });
});
