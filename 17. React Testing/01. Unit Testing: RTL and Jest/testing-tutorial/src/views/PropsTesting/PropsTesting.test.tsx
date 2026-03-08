import { render, screen } from "@testing-library/react";
import PropsTesting from ".";
import userEvent from "@testing-library/user-event";
const clickHandler = () => {};

describe("props testing", () => {
  test("props testing", async () => {
    // to create mock function, name of the mock function should be same as the prop name
    const clickHandler = jest.fn();
    const user = userEvent.setup();
    render(<PropsTesting name="SomeName" clickHandler={clickHandler} />);
    const nameProp = screen.getByText("SomeName");
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(clickHandler).toHaveBeenCalled();
    expect(nameProp).toBeInTheDocument();
  });
});
