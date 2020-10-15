import Utils, { Outcome } from "./utils";
import { signIn, LoginToken } from "./auth";

export type User = { name: string; email: string; plainTextPassword: string };
export type RegisterResponse = Outcome<LoginToken, string>;

export async function createUser(user: User): Promise<RegisterResponse> {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const statusCode = response.status.toString();
    console.log({ statusCode });

    if (statusCode.startsWith("2")) {
      const loginOutcome = await signIn({
        email: user.email,
        password: user.plainTextPassword,
      });

      return Utils.mapOutcomeError(
        loginOutcome,
        _ => "Failed to login with created account"
      );
    } else {
      let { message } = await response.json();
      console.error(`An error occurred when signing in: ${message}`);

      if (statusCode.startsWith("5")) {
        return {
          type: "Error",
          error: message || "A server error occurred. Please try again later",
        };
      } else {
        return {
          type: "Error",
          error:
            message || "Something unexpected happened. Please try again later",
        };
      }
    }
  } catch (error) {
    console.error(`An error occurred when creating a user: ${error}`);
    return { type: "Error", error: error.message || error };
  }
}
