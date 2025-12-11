"use client";

import React, { ChangeEvent, useState } from "react";

type Props = {};

type FormValues = {
  name: string;
};

const EventTesting = (props: Props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
  });

  const [data, setData] = React.useState("Hello!");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setData("Hello! Nishant");
  };

  const { name } = formValues;
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "10rem",
        margin: "0 auto",
        justifyContent: "center",
        height: "100vh",
        rowGap: "2rem",
      }}
    >
      <h1 className="m-4">{name}</h1>
      <input
        className="dark:bg-slate-800 text-white px-4 py-2 rounded-md"
        type="text"
        id="name"
        placeholder="Name"
        role="input_field"
        name="name"
        value={name}
        onChange={onChangeHandler}
      />
      <h1>{data}</h1>
      <button
        onClick={onClickHandler}
        role="btn"
        style={{ border: "1px solid white", padding: "4px" }}
      >
        Click Me
      </button>
    </main>
  );
};

export default EventTesting;
