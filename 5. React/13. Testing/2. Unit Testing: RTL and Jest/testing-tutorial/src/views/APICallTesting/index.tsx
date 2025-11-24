import "isomorphic-fetch";

import React from "react";

type Props = {};
type UserData = {
  name: string;
};
const CallAPITesting = (props: Props) => {
  const [data, setData] = React.useState<UserData[]>([]);
  const getData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const resJSON = await res.json();
      setData(resJSON);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  const ShowUsers = ({ data }: any): any => {
    if (!data) {
      return;
    } else
      return (
        <div>
          <h1>List of users</h1>
          <ul style={{ background: "grey" }}>
            {data.map((item: { name: string }, index: number) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
  };
  return (
    <div>
      <h1>Call API Testing</h1>
      <ShowUsers data={data} />
    </div>
  );
};

export default CallAPITesting;
