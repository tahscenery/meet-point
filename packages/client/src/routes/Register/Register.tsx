import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { TextInput } from "carbon-components-react";

import { AuthApi, UserApi } from "../../api";
import { Form } from "../../components";
import validator, { Validity, Validations } from "../utils/validator";

export const invalidNameMessage =
  "Your name must have at least 3 characters and may only contain valid letters from any language including upper case letters, lower case letters, hyphens or dashes (-/–) or apostrophes (').";

export type RegForm = Record<RegFormInput, string>;
export type RegFormInput = "name" | "email" | "password" | "confirmPassword";
export type RegFormError = string;

export type RegFormValidity = Validity<RegFormError>;
export type RegFormValidations = Validations<RegFormInput, RegFormError>;

export function registrationFormValidator(form: RegForm): RegFormValidations {
  const nameRegex = /^[\p{L}\p{Pd}' ]{3,}$/gu;
  const emailRegex = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g;

  let name: RegFormValidity = { isValid: false };
  let email: RegFormValidity = { isValid: false };
  let password: RegFormValidity = { isValid: false };
  let confirmPassword: RegFormValidity = { isValid: false };

  if (form.name.length === 0) {
    name.error = "Please provide your name";
  } else if (!nameRegex.test(form.name.trim())) {
    name.error = invalidNameMessage;
  } else {
    name.isValid = true;
  }

  if (form.email.length === 0) {
    email.error = "Please provide your email";
  } else if (!emailRegex.test(form.email.trim().toUpperCase())) {
    email.error = "Invalid email";
  } else {
    email.isValid = true;
  }

  if (form.password.length === 0) {
    password.error = "Please provide your password";
  } else if (form.password.length < 8) {
    password.error = "Your password must have at least 8 characters";
  } else {
    password.isValid = true;
  }

  if (form.confirmPassword.length === 0) {
    confirmPassword.error = "Please provide your password again";
  } else if (
    form.password.length !== 0 &&
    form.confirmPassword !== form.password
  ) {
    confirmPassword.error = "Passwords don't match";
  } else {
    confirmPassword.isValid = true;
  }

  return { name, email, password, confirmPassword };
}

type RegisterProps = {
  setIsSignedIn: (_: boolean) => void;
};

const Register = ({ setIsSignedIn }: RegisterProps) => {
  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state || { from: { pathname: "/" } };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const form = { name, email, password, confirmPassword };
  const validation = validator.validate(registrationFormValidator, form);

  const [shouldShowNameError, setShouldShowNameError] = useState(false);
  const [shouldShowEmailError, setShouldShowEmailError] = useState(false);
  const [shouldShowPasswordError, setShouldShowPasswordError] = useState(false);
  const [
    shouldShowConfirmPasswordError,
    setShouldShowConfirmPasswordError,
  ] = useState(false);

  type Outcome = { didFail: boolean; message?: string };
  const [registerOutcome, setRegisterOutcome] = useState<Outcome>({
    didFail: false,
  });
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  // Update header to display user actions if successfully signed in
  useEffect(() => {
    return setIsSignedIn(redirectToReferrer);
  }, [setIsSignedIn, redirectToReferrer]);

  type Event = React.FormEvent<HTMLFormElement>;
  type HandleRegisterFn = (
    e: Event,
    registerDetails: UserApi.RegisterDetails
  ) => void;
  const handleRegister: HandleRegisterFn = async (e, registerDetails) => {
    e.preventDefault();
    const response = await UserApi.createUser(registerDetails);
    if (response.type === "Success") {
      setRegisterOutcome({ didFail: false });
      const { _id: id, token } = response.data;
      AuthApi.authenticate({ id, token }, () => setRedirectToReferrer(true));
    } else {
      setRegisterOutcome({ didFail: true, message: response.error });
    }
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <Form
      title="Create an account"
      caption="Already have an account?"
      captionLink={{ link: "/login", text: "Log in" }}
      canSubmit={
        validation.name.isValid &&
        validation.email.isValid &&
        validation.password.isValid &&
        validation.confirmPassword.isValid
      }
      onSubmit={e =>
        handleRegister(e, { name, email, plainTextPassword: password })
      }
      isError={registerOutcome.didFail}
      errorMessage={registerOutcome.message}>
      <TextInput
        light
        id="name"
        labelText="Name"
        placeholder="Enter your name..."
        invalid={shouldShowNameError && !validation.name.isValid}
        invalidText={validation.name.error}
        onChange={e => {
          setName(e.target.value);
          setShouldShowNameError(!validation.name.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
      <TextInput
        light
        id="email"
        type="email"
        labelText="Email"
        placeholder="Enter your email..."
        invalid={shouldShowEmailError && !validation.email.isValid}
        invalidText={validation.email.error}
        onChange={e => {
          setEmail(e.target.value);
          setShouldShowEmailError(!validation.email.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
      <TextInput.PasswordInput
        light
        id="password"
        labelText="Password"
        placeholder="Enter your password..."
        invalid={shouldShowPasswordError && !validation.password.isValid}
        invalidText={validation.password.error}
        onChange={e => {
          setPassword(e.target.value);
          setShouldShowPasswordError(!validation.password.isValid);
          setRegisterOutcome({ didFail: false });
        }}
      />
      <TextInput.PasswordInput
        light
        id="confirm-password"
        labelText="Confirm password"
        placeholder="Enter your password again..."
        invalid={
          shouldShowConfirmPasswordError && !validation.confirmPassword.isValid
        }
        invalidText={validation.confirmPassword.error}
        onChange={e => {
          setConfirmPassword(e.target.value);
          setShouldShowConfirmPasswordError(
            !validation.confirmPassword.isValid
          );
          setRegisterOutcome({ didFail: false });
        }}
      />
    </Form>
  );
};

export default Register;
