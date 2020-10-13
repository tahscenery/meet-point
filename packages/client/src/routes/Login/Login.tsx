import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox, TextInput } from "carbon-components-react";

import { AuthApi } from "../../api";
import { Form } from "../../components";

type FormValidity = { emailValidity: Validity; passwordValidity: Validity };
type Validity = { isValid: boolean; errorMessage?: string };

export function checkValidity(email: string, password: string): FormValidity {
  const regex = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g;

  let emailValidity: Validity = { isValid: false };
  let passwordValidity: Validity = { isValid: false };

  if (email.length > 3 && regex.test(email.toUpperCase())) {
    emailValidity.isValid = true;
  } else if (email.length === 0) {
    emailValidity.errorMessage = "Please provide your email";
  } else {
    emailValidity.errorMessage = "Invalid email";
  }

  if (password.length >= 8) {
    passwordValidity.isValid = true;
  }

  return { emailValidity, passwordValidity };
}

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setRememberMe] = useState(false);

  const [shouldShowEmailError, setShouldShowEmailError] = useState(false);
  const [shouldShowPasswordError,] = useState(false);

  const formValidity = checkValidity(email, password);
  const emailValidity = formValidity.emailValidity;
  const passwordValidity = formValidity.passwordValidity;

  type Outcome = { didFail: boolean; message?: string };
  const [loginOutcome, setLoginOutcome] = useState<Outcome>({ didFail: false });

  type Event = React.FormEvent<HTMLFormElement>;
  type LoginDetails = AuthApi.LoginDetails;
  type HandleLoginFn = (e: Event, loginDetails: LoginDetails) => void;

  const handleLogin: HandleLoginFn = async (e, loginDetails) => {
    e.preventDefault();
    const result = await AuthApi.signIn(loginDetails);
    if (result.type === "Success") {
      console.log(`SUCCESS: ${JSON.stringify(result.data)}`);
      setLoginOutcome({ didFail: false });
      history.push("/");
    } else {
      console.error(`ERROR: ${JSON.stringify(result.error)}`);
      setLoginOutcome({ didFail: true, message: result.error });
    }
  };

  return (
    <Form
      title="Log in"
      caption="Don't have an account?"
      captionLink={{ link: "/register", text: "Create one now" }}
      submitButtonText="Log in"
      canSubmit={emailValidity.isValid && passwordValidity.isValid}
      onSubmit={e => handleLogin(e, { email, password })}
      isError={loginOutcome.didFail}
      errorMessage={loginOutcome.message}
    >
      <TextInput
        light
        id="email"
        type="email"
        labelText="Email"
        placeholder="Enter your email..."
        invalid={shouldShowEmailError && !emailValidity.isValid}
        invalidText={emailValidity.errorMessage}
        onChange={e => {
          setEmail(e.target.value);
          setShouldShowEmailError(!emailValidity.isValid);
          setLoginOutcome({ didFail: false });
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
          setLoginOutcome({ didFail: false });
        }}
      />
      <Checkbox
        id="remember-me"
        labelText="Remember me"
        onChange={setRememberMe}
      />
    </Form>
  );
};

export default Login;
