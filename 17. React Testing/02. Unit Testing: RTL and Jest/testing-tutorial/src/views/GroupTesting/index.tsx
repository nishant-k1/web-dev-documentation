"use client";

import React, { ChangeEvent, useState } from "react";

type Props = {};

type FormValues = {
  name: string;
};

const GroupTesting = (props: Props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <main className="grid place-items-center h-full ">
      <h1>Learn Testing</h1>
      <br />
      <br />
      <img
        src="https://cdn.pixabay.com/photo/2017/08/07/16/39/girl-2605526_1280.jpg"
        alt="girl_image"
        height={"auto"}
        width={900}
        title={"Girl Image"}
      />
      <br />
      <br />
      <h1>{formValues.name}</h1>
      <input
        type="text"
        id="name"
        placeholder="Name"
        role="input_field"
        name="name"
        value={formValues.name}
        onChange={onChangeHandler}
      />
    </main>
  );
};

export default GroupTesting;
