import React /* useState */ from "react";
// import { useHistory } from "react-router-dom";
import { TextInput } from "carbon-components-react";

// import * as AuthApi from "../auth/api";
import { Form } from "../components";

const Register = () => {
  // const history = useHistory();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // const [shouldShowEmailError, setShouldShowEmailError] = useState(false);
  // const [shouldShowPasswordError, setShouldShowPasswordError] = useState(false);
  // const [shouldShowConfirmPasswordError, setShouldShowConfirmPasswordError] = useState(false);

  // type Event = React.FormEvent<HTMLFormElement>;
  // type RegisterDetails = AuthApi.LoginDetails;
  // type HandleRegisterCallback = (e: Event, registerDetails: RegisterDetails) => void;

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
