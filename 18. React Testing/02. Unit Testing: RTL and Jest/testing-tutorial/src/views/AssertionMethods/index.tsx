import React from "react";

type Props = {};

const AssertionMethods = (props: Props) => {
  return (
    <main>
      {/* Assertion methods */}
      <input
        type="text"
        defaultValue="Nishant Kumar"
        name="username"
        className="testStyle"
        id="username"
      />
      <button id="btn" className="btn">
        Click Me
      </button>
    </main>
  );
};

export default AssertionMethods;
