import { render, screen, act } from "@testing-library/react";
import CallAPITesting from ".";

describe("API Call Testing", () => {
  test("test for mock APIs", async () => {
    render(<CallAPITesting />);
    const els = await screen.findAllByRole("listitem");
    expect(els).toHaveLength(4);
  });
});
