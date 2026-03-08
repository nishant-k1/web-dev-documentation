import React from "react";

type PropsTestingProps = {
  name: string;
  clickHandler: () => void;
};

const PropsTesting = ({ name, clickHandler }: PropsTestingProps) => {
  return (
    <div>
      <h1>PropsTesting</h1>
      <p>{name}</p>
      <button onClick={clickHandler}></button>
    </div>
  );
};

export default PropsTesting;
