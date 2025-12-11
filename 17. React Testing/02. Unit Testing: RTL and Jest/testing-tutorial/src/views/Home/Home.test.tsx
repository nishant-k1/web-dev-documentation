import { screen, render, configure, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from ".";

// Testing using `getbyRole` RTL query for semantic elements
describe.skip("Testing using `getbyRole` RTL query for semantic elements", () => {
  test("Testing using `getbyRole` RTL query for semantic elements", () => {
    render(<Home />);
    const inputField = screen.getByRole("textbox");
    const btn = screen.getByRole("button");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("Hello");
    expect(inputField).toBeDisabled();
    expect(btn).toBeInTheDocument();
  });
});

// Testing using `getbyRole` RTL query for mulitple semantic elements with same role
describe.skip("Testing using `getbyRole` RTL query for mulitple semantic elements with same role", () => {
  test("Testing using `getbyRole` RTL query for mulitple semantic elements with same role", () => {
    render(<Home />);
    const input1 = screen.getByRole("textbox", { name: "User 1" });
    const input2 = screen.getByRole("textbox", { name: "User 2" });

    const btn1 = screen.getByRole("button", { name: "Click 1" });
    const btn2 = screen.getByRole("button", { name: "Click 2" });

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
  });
});

// Testing using custom `getByRole` RTL query for non semantic elements
describe("Testing using custom `getByRole` RTL query for non semantic elements", () => {
  test("Testing using custom `getByRole` RTL query for non semantic elements", () => {
    render(<Home />);
    const div1 = screen.getByRole("div1");
    const btn1 = screen.getByRole("cutom-role-for-btn");
    expect(div1).toBeInTheDocument();
    expect(btn1).toBeInTheDocument();
  });
});

// Testing using `getAllByRole` RTL query
describe("Testing using `getAllByRole` RTL query", () => {
  test("Testing using `getAllByRole` RTL query", () => {
    render(<Home />);
    const btns = screen.getAllByRole("button");
    const options = screen.getAllByRole("combobox");
    for (let i = 0; i < btns.length; i++) {
      expect(btns[i]).toBeInTheDocument();
    }
    for (let i = 0; i < options.length; i++) {
      expect(options[i]).toBeInTheDocument();
    }
  });
});

// Testing using `getByLabelText` RTL role query
describe.skip("Testing using `getByLabelText` RTL role query", () => {
  test("Testing using `getByLabelText` RTL role query", () => {
    render(<Home />);
    const checkbox = screen.getByLabelText("Username");
    expect(checkbox).toBeInTheDocument();
  });
});

// Testing using `getAllByLabelText` RTL role query
describe("Testing using `getAllByLabelText` RTL role query", () => {
  test("Testing using `getAllByLabelText` RTL role query", () => {
    render(<Home />);
    const checkboxes = screen.getAllByLabelText("Username");
    for (let i = 0; i < checkboxes.length; i++) {
      expect(checkboxes[i]).toBeInTheDocument();
    }
  });
});

// Testing using `getByPlaceholderText` RTL role query
describe("Testing using `getByPlaceholderText` RTL role query", () => {
  test("Testing using `getByPlaceholderText` RTL role query", () => {
    render(<Home />);
    const inputField = screen.getByPlaceholderText("Username");
    expect(inputField).toBeInTheDocument();
  });
});

// Testing using `getAllByPlaceholderText` RTL role query
describe("Testing using `getAllByPlaceholderText` RTL role query", () => {
  test("Testing using `getAllByPlaceholderText` RTL role query", () => {
    render(<Home />);
    const inputFields = screen.getAllByPlaceholderText("Userage");
    for (let i = 0; i < inputFields.length; i++) {
      expect(inputFields[i]).toBeInTheDocument();
    }
  });
});

// Testing using `getByText` RTL role query
describe("Testing using `getByText` RTL role query", () => {
  test("Testing using `getByText` RTL role query", () => {
    render(<Home />);
    const button = screen.getByText(/Click Me Once/i);
    const heading = screen.getByText(/This is a heading/i);
    const paragraph = screen.getByText(/This is paragraph/i);
    expect(button).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});

// Testing using `getAllByText` RTL role query
describe("Testing using `getAllByText` RTL role query", () => {
  test("Testing using `getAllByText` RTL role query", () => {
    render(<Home />);
    const buttons = screen.getAllByText(/Click Me/i);
    for (let i = 0; i < buttons.length; i++) {
      expect(buttons[i]).toBeInTheDocument();
    }
  });
});

// Testing using `getByTestId` RTL role query
describe.skip("Testing using `getByTestId` RTL role query", () => {
  test("Testing using `getByTestId` RTL role query", () => {
    render(<Home />);
    const div = screen.getByTestId("single-div-tag");
    expect(div).toBeInTheDocument();
  });
});

// Testing using `getAllByTestId` RTL role query
describe.skip("Testing using `getAllByTestId` RTL role query", () => {
  test("Testing using `getAllByTestId` RTL role query", () => {
    render(<Home />);
    const divs = screen.getAllByTestId("div-tag");
    for (let i = 0; i < divs.length; i++) {
      expect(divs[i]).toBeInTheDocument();
    }
  });
});

configure({ testIdAttribute: "some-custom-id" });

// Testing using `getByTestId` overriden by other attribute
describe("Testing using `getByTestId` overriden by other attribute", () => {
  test("Testing using `getByTestId` overriden by other attribute", () => {
    render(<Home />);
    const div = screen.getByTestId("custom-div");
    expect(div).toBeInTheDocument();
  });
});

// Testing using `getByDisplayValue` RTL role query
describe("Testing using `getByDisplayValue` RTL role query", () => {
  test("Testing using `getByDisplayValue` RTL role query", () => {
    render(<Home />);
    const inputField = screen.getByDisplayValue("test-some-text");
    expect(inputField).toBeInTheDocument();
  });
});

// Testing using `getAllByDisplayValue` RTL role query
describe("Testing using `getAllByDisplayValue` RTL role query", () => {
  test("Testing using `getAllByDisplayValue` RTL role query", () => {
    render(<Home />);
    const inputFields = screen.getAllByDisplayValue("some-text");
    for (let i = 0; i < inputFields.length; i++) {
      expect(inputFields[i]).toBeInTheDocument();
    }
  });
});

// Testing using `getByTitle` RTL role query
describe("Testing using `getByTitle` RTL role query", () => {
  test("Testing using `getByTitle` RTL role query", () => {
    render(<Home />);
    const btn = screen.getByTitle("test-delete");
    expect(btn).toBeInTheDocument();
  });
});

// Testing using `getAllByTitle` RTL role query
describe("Testing using `getAllByTitle` RTL role query", () => {
  test("Testing using `getAllByTitle` RTL role query", () => {
    render(<Home />);
    const btns = screen.getAllByTitle("delete");
    for (let i = 0; i < btns.length; i++) {
      expect(btns[i]).toBeInTheDocument();
    }
  });
});

// Testing using `getByAltText` RTL role query
describe("Testing using `getByAltText` RTL role query", () => {
  test("Testing using `getByAltText` RTL role query", () => {
    render(<Home />);
    const image = screen.getByAltText("test-img");
    expect(image).toBeInTheDocument();
  });
});

// Testing using `getAllByAltText` RTL role query
describe("Testing using `getAllByAltText` RTL role query", () => {
  test("Testing using `getAllByAltText` RTL role query", () => {
    render(<Home />);
    const images = screen.getAllByAltText("test-all-img");
    for (let i = 0; i < images.length; i++) {
      expect(images[i]).toBeInTheDocument();
    }
  });
});

// TextMatch with String and Regex
describe("TextMatch with String and Regex", () => {
  test("TextMatch with String", () => {
    render(<Home />);
    const para = screen.getByText("Nishant Kumar is good", {
      exact: false,
    });
    expect(para).toBeInTheDocument();
  });

  test("TextMatch with Regex", () => {
    render(<Home />);
    const para = screen.getByText(/nishant Kumar is good boy/i);
    expect(para).toBeInTheDocument();
  });
});

// TextMatch with Function
describe("TextMatch with Function", () => {
  test("TextMatch with Function", () => {
    render(<Home />);
    const para = screen.getByText((content, element) => {
      return content.startsWith("Learn");
    });
    // const para = screen.getByText((content, element) => {
    //   return content.endsWith("Something");
    // });

    // const para = screen.getByText((content, element) => {
    //   return content.includes("Something");
    // });
    // const para = screen.getByText((content, element) => {
    //   return content.length === 5;
    // });

    expect(para).toBeInTheDocument();
  });
});

// Testing using queryBy
describe("Testing using queryBy", () => {
  test("Testing using queryBy", () => {
    render(<Home />);
    const button = screen.queryByText("Login");
    expect(button).not.toBeInTheDocument();
  });
});

// Testing using findBy
describe("Testing using findBy", () => {
  test("Testing using findBy", async () => {
    render(<Home />);
    const para = await screen.findByText("findBy", {}, { timeout: 6000 });
    expect(para).toBeInTheDocument();
  });
});

// Testing using Javascript Query / custom Query
describe("Testing using Javascript Query / custom Query", () => {
  test("Testing using Javascript Query / custom Query", () => {
    render(<Home />);
    const element = document.querySelector("#custom-query-testing");
    expect(element).toBeInTheDocument();
  });
});

// Testing using Querying within elements
describe("Testing using Querying within elements", () => {
  test("Testing using Querying within elements", () => {
    render(<Home />);
    const parentEl = screen.getByText("Hello Nishant");
    const childEl = within(parentEl).getByText("Child Element");
    expect(parentEl).toBeInTheDocument();
    expect(childEl).toBeInTheDocument();
  });
});

// Testing events using user-event from RTL library
describe("Testing events using user-event from RTL library", () => {
  test("Testing events using user-event from RTL library", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const btn = screen.getByRole("button", { name: /Submit me/i });
    const para = screen.getByText(/Hello Nishant/i);
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(para).toBeInTheDocument();
  });
});

// Testing onChange Event OR Keyboard interactions events using user-event from RTL library
describe("Testing onChange Event OR Keyboard interactions events using user-event from RTL library", () => {
  test("Testing onChange Event OR Keyboard interactions events using user-event from RTL library", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const el = screen.getByPlaceholderText("Enter Name");
    expect(el).toBeInTheDocument();
    await user.type(el, "Nishant");
    const inputValue = screen.getByText("Nishant");
    expect(inputValue).toBeInTheDocument();
  });
});

// Testing events using act function
describe("Testing events using act function", () => {
  test("Testing events using act function", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const el = screen.getByPlaceholderText("Enter Email");
    expect(el).toBeInTheDocument();

    // Sometimes the state update gets delayed
    await act(async () => {
      await user.type(el, "nishant@gmail.com");
    });

    // because of the delayed state update, inputValue won't be same
    const inputValue = screen.getByText("nishant@gmail.com");
    expect(inputValue).toBeInTheDocument();
  });
});
