import React from "react";
import { Content, TextInput } from "carbon-components-react";

import { Form, Header } from "./components";
import "./App.scss";

const AppContent = (
  <div>
    <Form
      title="Log in"
      caption="Don't have an account?"
      captionLink={{ link: "/register", text: "Create an account" }}
      submitButtonText="Log in"
    >
      <TextInput
        id="username"
        labelText="Username"
        placeholder="Enter your username..."
      />
      <TextInput.PasswordInput
        id="password"
        labelText="Password"
        placeholder="Enter your password..."
      />
    </Form>
  </div>
);

const App = () => {
  return (
    <>
      <Header />
      <Content>{AppContent}</Content>
    </>
  );
};

export default App;
