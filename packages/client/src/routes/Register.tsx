import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextInput } from "carbon-components-react";

import { UserApi } from "../api";
import { Form } from "../components";

type FormValidity = {
  nameValidity: Validity;
  emailValidity: Validity;
  passwordValidity: Validity;
  confirmPasswordValidity: Validity;
};
type Validity = { isValid: boolean; errorMessage?: string };

function checkValidity(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FormValidity {
  const regex = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g;

  let nameValidity: Validity = { isValid: false };
  let emailValidity: Validity = { isValid: false };
  let passwordValidity: Validity = { isValid: false };
  let confirmPasswordValidity: Validity = { isValid: false };

  if (name.length >= 3) {
    nameValidity.isValid = true;
  } else if (name.length === 0) {
    nameValidity.errorMessage = "Please provide your name";
  } else {
    nameValidity.errorMessage = "Your name must have at least 3 characters";
  }

  if (email.length > 3 && regex.test(email.toUpperCase())) {
    emailValidity.isValid = true;
  } else if (email.length === 0) {
    emailValidity.errorMessage = "Please provide your email";
  } else {
    emailValidity.errorMessage = "Invalid email";
  }

  if (password.length >= 8) {
    passwordValidity.isValid = true;
  } else {
    passwordValidity.errorMessage =
      "Your password must have at least 8 characters";
  }

  if (confirmPassword === password) {
    confirmPasswordValidity.isValid = true;
  } else {
    confirmPasswordValidity.errorMessage = "Passwords don't match";
  }

  return {
    nameValidity,
    emailValidity,
    passwordValidity,
    confirmPasswordValidity,
  };
}

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [shouldShowNameError, setShouldShowNameError] = useState(false);
  const [shouldShowEmailError, setShouldShowEmailError] = useState(false);
  const [shouldShowPasswordError, setShouldShowPasswordError] = useState(false);
  const [
    shouldShowConfirmPasswordError,
    setShouldShowConfirmPasswordError,
  ] = useState(false);

  const formValidity = checkValidity(name, email, password, confirmPassword);
  const nameValidity = formValidity.nameValidity;
  const emailValidity = formValidity.emailValidity;
  const passwordValidity = formValidity.passwordValidity;
  const confirmPasswordValidity = formValidity.confirmPasswordValidity;

  type Outcome = { didFail: boolean; message?: string };
  const [registerOutcome, setRegisterOutcome] = useState<Outcome>({
    didFail: false,
  });

  type Event = React.FormEvent<HTMLFormElement>;
  type RegisterDetails = UserApi.User;
  type HandleRegisterFn = (e: Event, registerDetails: RegisterDetails) => void;

  const handleRegister: HandleRegisterFn = async (e, registerDetails) => {
    e.preventDefault();
    const result = await UserApi.createUser(registerDetails);
    if (result.type === "Success") {
      console.log(`SUCCESS: ${JSON.stringify(result.data)}`);
      setRegisterOutcome({ didFail: false });
      history.push("/");
    } else {
      console.error(`ERROR: ${JSON.stringify(result.error)}`);
      setRegisterOutcome({ didFail: true, message: result.error });
    }
  };

  return (
    <Form
      title="Create an account"
      caption="Already have an account?"
      captionLink={{ link: "/login", text: "Log in" }}
      canSubmit={
        nameValidity.isValid &&
        emailValidity.isValid &&
        passwordValidity.isValid &&
        confirmPasswordValidity.isValid
      }
      onSubmit={e =>
        handleRegister(e, { name, email, plainTextPassword: password })
      }
      isError={registerOutcome.didFail}
      errorMessage={registerOutcome.message}
    >
      <TextInput
        light
        id="name"
        labelText="Name"
        placeholder="Enter your name..."
        invalid={shouldShowNameError && !nameValidity.isValid}
        invalidText={nameValidity.errorMessage}
        onChange={e => {
          setName(e.target.value);
          setShouldShowNameError(!nameValidity.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
      <TextInput
        light
        id="email"
        labelText="Email"
        placeholder="Enter your email..."
        invalid={shouldShowEmailError && !emailValidity.isValid}
        invalidText={emailValidity.errorMessage}
        onChange={e => {
          setEmail(e.target.value);
          setShouldShowEmailError(!emailValidity.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
      <TextInput.PasswordInput
        light
        id="password"
        labelText="Password"
        placeholder="Enter your password..."
        invalid={shouldShowPasswordError && !passwordValidity.isValid}
        invalidText={passwordValidity.errorMessage}
        onChange={e => {
          setPassword(e.target.value);
          setShouldShowPasswordError(!passwordValidity.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
      <TextInput.PasswordInput
        light
        id="confirm-password"
        labelText="Confirm password"
        placeholder="Enter your password again..."
        invalid={
          shouldShowConfirmPasswordError && !confirmPasswordValidity.isValid
        }
        invalidText={confirmPasswordValidity.errorMessage}
        onChange={e => {
          setConfirmPassword(e.target.value);
          setShouldShowConfirmPasswordError(!confirmPasswordValidity.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
    </Form>
  );
};

export default Register;
