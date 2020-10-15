import React from "react";
import { isAuthenticated } from "../../api/auth";

const Home = () => {
  console.log({ isAuthenticated: isAuthenticated() });

  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>
    </div>
  );
};

export default Home;
