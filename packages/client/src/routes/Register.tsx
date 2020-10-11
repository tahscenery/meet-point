import React from "react";
import { TextInput } from "carbon-components-react";

import { Form } from "../components";

const Register = () => {
  return (
    <Form
      title="Create an account"
      caption="Already have an account?"
      captionLink={{ link: "/login", text: "Log in" }}
    >
      <TextInput
        id="email"
        labelText="Email"
        placeholder="Enter your email..."
      />
      <TextInput.PasswordInput
        id="password"
        labelText="Password"
        placeholder="Enter your password..."
      />
      <TextInput.PasswordInput
        id="confirm-password"
        labelText="Confirm password"
        placeholder="Enter your password again..."
      />
    </Form>
  );
};

export default Register;
