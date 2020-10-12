import Utils, { Validity } from "./utils";

const simpleValidation = (form: Record<string, string>) => {
  let a: Validity = { isValid: false };
  let b: Validity = { isValid: false };
  let c: Validity = { isValid: false };

  if (form.a === "123") {
    a.isValid = true;
  } else {
    a.errorMessage = "It is not `123`";
  }

  if (form.b === "456") {
    b.isValid = true;
  } else {
    b.errorMessage = "It is not `456`";
  }

  if (form.c === "789") {
    c.isValid = true;
  } else {
    c.errorMessage = "It is not `789`";
  }

  return { a, b, c };
};

it("checks that a valid form is acceptable", () => {
  const a: string = "123";
  const b: string = "456";
  const c: string = "789";

  const isFormValid = Utils.checkForm(simpleValidation, { a, b, c });
  expect(isFormValid).toBe(true);
});

it("checks that an invalid form is unacceptable", () => {
  const a: string = "123";
  const b: string = "456";
  const c: string = "abc";

  const isFormValid = Utils.checkForm(simpleValidation, { a, b, c });
  expect(isFormValid).toBe(false);
});

type FormInput = "name" | "email" | "password" | "confirmPassword";
const formValidation = (form: Record<FormInput, string>) => {
  let name: Validity = { isValid: false };
  let email: Validity = { isValid: false };
  let password: Validity = { isValid: false };
  let confirmPassword: Validity = { isValid: false };

  if (form.name.length >= 3) {
    name.isValid = true;
  } else if (form.name.length > 0) {
    name.errorMessage = "Names must have at least 3 characters";
  } else {
    name.errorMessage = "Please provide your name";
  }

  const regex = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/g;
  if (form.email.length >= 3 && regex.test(form.email.toUpperCase())) {
    email.isValid = true;
  } else if (form.email.length === 0) {
    email.errorMessage = "Please provide your email";
  } else {
    email.errorMessage = "Invalid email";
  }

  if (form.password.length >= 8) {
    password.isValid = true;
  } else {
    password.errorMessage = "Passwords must have at least 8 characters";
  }

  if (form.confirmPassword === form.password) {
    confirmPassword.isValid = true;
  } else {
    confirmPassword.errorMessage = "Passwords don't match";
  }

  return { name, email, password, confirmPassword };
};

it("checks that a correct Register form is valid", () => {
  const isFormValid = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "john.smith@email.com",
    password: "my-secret-password-123",
    confirmPassword: "my-secret-password-123",
  });

  expect(isFormValid).toBe(true);
});

it("checks that an incorrect Register form is NOT valid", () => {
  const isFormValid__emptyForm = Utils.checkForm(formValidation, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isFormValid__missingName = Utils.checkForm(formValidation, {
    name: "",
    email: "john.smith@email.com",
    password: "my-secret-password-123",
    confirmPassword: "my-secret-password-123",
  });

  const isFormValid__missingEmail = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "",
    password: "my-secret-password-123",
    confirmPassword: "my-secret-password-123",
  });

  const isFormValid__missingPassword = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "john.smith@email.com",
    password: "",
    confirmPassword: "my-secret-password-123",
  });

  const isFormValid__missingConfirmPassword = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "john.smith@email.com",
    password: "my-secret-password-123",
    confirmPassword: "",
  });

  const isFormValid__invalidEmail = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "this is not a valid email",
    password: "my-secret-password-123",
    confirmPassword: "my-secret-password-123",
  });

  const isFormValid__tooShortPassword = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "john.smith@email.com",
    password: "hello",
    confirmPassword: "hello",
  });

  const isFormValid__nonMatchingPasswords = Utils.checkForm(formValidation, {
    name: "John Smith",
    email: "john.smith@email.com",
    password: "my-secret-password-123",
    confirmPassword: "my-other-secret-password-123",
  });

  expect(isFormValid__emptyForm).toBe(false);
  expect(isFormValid__missingName).toBe(false);
  expect(isFormValid__missingEmail).toBe(false);
  expect(isFormValid__missingPassword).toBe(false);
  expect(isFormValid__missingConfirmPassword).toBe(false);

  expect(isFormValid__invalidEmail).toBe(false);
  expect(isFormValid__tooShortPassword).toBe(false);
  expect(isFormValid__nonMatchingPasswords).toBe(false);
});
