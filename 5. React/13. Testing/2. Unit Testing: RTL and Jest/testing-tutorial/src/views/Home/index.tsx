"use client";
import React from "react";
import CallAPITesting from "../APICallTesting";
import PropsTesting from "../PropsTesting";
type Props = {};

const Home = (props: Props) => {
  const [data, setData] = React.useState(false);
  const [someText, setSomeText] = React.useState("Empty!!");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const clickHandler = () => {
    setSomeText("Hello Nishant");
  };

  const onChangeHandler = (e: any) => {
    const name = e.target.value;
    setName((prev) => name);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        rowGap: "1rem",
        padding: "4rem",
      }}
    >
      {/* Testing using `getbyRole` RTL query for semantic elements */}
      <h1>Multiple item with Role</h1>
      <h1>Custom Role</h1>
      <input type="text" defaultValue={"Hello"} disabled />
      <button>Click Me</button>
      {/* Testing using `getbyRole` RTL query for mulitple semantic elements with same role*/}
      <label htmlFor="input1">User 1</label>
      <input id="input1" type="text" name="User11" />
      <label htmlFor="input2">User 2</label>
      <input id="input2" type="text" name="User22" />
      <button>Click 1</button>
      <button>Click 2</button>
      {/*Testing using custom `getByRole` RTL query for non semantic elements*/}
      <div role="div1">This is div box</div>
      <button role="cutom-role-for-btn">This is button</button>
      {/*Testing using `getAllByRole` RTL query*/}
      <button>Click Me</button>
      <button>Click Me</button>
      <button>Click Me</button>
      <button>Click Me</button>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      {/*Testing using `getByLabelText` RTL role query*/}
      <label htmlFor="username">Username</label>
      <input type="checkbox" id="username" defaultChecked={true} />
      {/*Testing using `getAllByLabelText` RTL role query*/}
      <label htmlFor="username1">Username</label>
      <input type="checkbox" id="username1" defaultChecked={true} />
      <label htmlFor="username2">Username</label>
      <input type="checkbox" id="username2" defaultChecked={true} />
      <label htmlFor="username3">Username</label>
      <input type="checkbox" id="username3" defaultChecked={true} />
      <label htmlFor="username4">Username</label>
      <input type="checkbox" id="username4" defaultChecked={true} />
      {/*Testing using `getByPlaceholderText` RTL role query*/}
      <input type="text" placeholder="Username" />
      {/*Testing using `getAllByPlaceholderText` RTL role query*/}
      <input type="text" placeholder="Userage" />
      <input type="text" placeholder="Userage" />
      <input type="text" placeholder="Userage" />
      <input type="text" placeholder="Userage" />
      {/*Testing using `getByText` RTL role query*/}
      <button>Click Me Once</button>
      <h1>This is a heading</h1>
      <p>This is paragraph</p>
      {/*Testing using `getAllByText` RTL role query*/}
      <button>Click Me</button>
      <button>Click Me</button>
      <button>Click Me</button>
      <button>Click Me</button>
      {/*Testing using `getByTestId` RTL role query*/}
      <div data-testid="single-div-tag">Testing using getByTestId</div>
      {/*Testing using `getAllByTestId` RTL role query*/}
      <div data-testid="div-tag">Testing using getAllByTestId</div>
      <div data-testid="div-tag">Testing using getAllByTestId</div>
      <div data-testid="div-tag">Testing using getAllByTestId</div>
      <div data-testid="div-tag">Testing using getAllByTestId</div>
      {/*Testing using `getByTestId` overriden by other attribute*/}
      <div some-custom-id="custom-div">Testing using getByTestId</div>
      {/*Testing using `getByDisplayValue` RTL role query*/}
      <input type="text" defaultValue="test-some-text" />
      {/*Testing using `getAllByDisplayValue` RTL role query*/}
      <input type="text" defaultValue="some-text" />
      <input type="text" defaultValue="some-text" />
      <input type="text" defaultValue="some-text" />
      <input type="text" defaultValue="some-text" />
      {/*Testing using `getByTitle` RTL role query*/}
      <button title="test-delete">Click Me</button>
      {/*Testing using `getAllByTitle` RTL role query*/}
      <button title="delete">Click Me</button>
      <button title="delete">Click Me</button>
      <button title="delete">Click Me</button>
      <button title="delete">Click Me</button>
      {/*Testing using `getByAltText` RTL role query*/}
      <img src="./" alt="test-img" />
      {/*Testing using `getAllByAltText` RTL role query*/}
      <img src="./" alt="test-all-img" />
      <img src="./" alt="test-all-img" />
      <img src="./" alt="test-all-img" />
      <img src="./" alt="test-all-img" />
      {/* TextMatch with String and Regex */}
      <p>Nishant Kumar is good boy</p>
      {/* TextMatch with Function */}
      <p>Learn</p>
      {/* Testing using queryBy */}
      {!loginStatus && <button>Login</button>}
      {loginStatus && <button>Logout</button>}
      {/* Testing using findBy */}
      {data && <p>findBy</p>}
      {/* Testing using Javascript Query / custom Query */}
      <p id="custom-query-testing">custom Query</p>
      {/* Testing using Querying within elements, 
      here we need to test an element with
       p tag exist within the div tag*/}
      <div>
        Hello Nishant
        <p>Child Element</p>
      </div>
      {/* Testing events using user-event from RTL library*/}
      <button onClick={clickHandler}>Submit Me</button>
      <p>{someText}</p>
      {/* Testing onChange Event OR Keyboard interactions events using user-event from RTL library*/}
      <h1>{name}</h1>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={onChangeHandler}
      />
      {/* Testing events using act function*/}
      <h1>{email}</h1>
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        onChange={onChangeHandler}
      />
      <PropsTesting name="Nishant Kumar" clickHandler={clickHandler} />
      {/* Testing API call using MSW */}
      <CallAPITesting />
    </main>
  );
};
let loginStatus = true;

export default Home;
