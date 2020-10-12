import { Outcome } from "./index";
import { signIn, LoginToken } from "./auth";

export type User = {
  name: string;
  email: string;
  plainTextPassword: string;
};

type RegisterResponse = Outcome<LoginToken, string>;

export async function createUser(user: User): Promise<RegisterResponse> {
  try {
    const createUserResponse = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (createUserResponse.status.toString().startsWith("2")) {
      const loginOutcome = await signIn({
        email: user.email,
        password: user.plainTextPassword,
      });

      if (loginOutcome.type === "Success") {
        return { type: "Success", data: loginOutcome.data };
      } else {
        return { type: "Error", error: "Failed to login with created account" };
      }
    } else {
      const error = await createUserResponse.json();
      return { type: "Error", error: error.message };
    }
  } catch (error) {
    console.error(`An error occurred when creating a user: ${error}`);
    return { type: "Error", error };
  }
}
