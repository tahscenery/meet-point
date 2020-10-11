import React, { useEffect } from "react";
import { Button } from "carbon-components-react";

import "./App.scss";

type User = {
  email: string;
  password: string;
};

async function handleSignIn(user: User): Promise<any> {
  try {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    return response;
  } catch (error) {
    return Promise.reject(`An error occurred: ${error}`);
  }
}

const App = () => {
  const user: User = {
    email: "john.smith@email.com",
    password: "my-secret-password-123",
  };

  useEffect(() => {
    const signIn = async () => {
      const response = await handleSignIn(user);
      console.log(await response.json());
    }

    signIn();
  }, [user]);

  return (
    <div>
      <Button>Hello, world!</Button>
    </div>
  );
};

export default App;
