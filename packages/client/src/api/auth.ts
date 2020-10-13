import { Outcome } from "./utils";

export type LoginToken = string;
export type LoginDetails = { email: string; password: string };
export type LoginResponse = Outcome<LoginToken, string>;

export async function signIn(
  loginDetails: LoginDetails
): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginDetails),
    });

    const statusCode = response.status.toString();
    console.log({ statusCode });

    if (statusCode.startsWith("2")) {
      const { token } = await response.json();
      return { type: "Success", data: token };
    } else {
      let error = await response.text();
      console.error(`An error occurred when signing in: ${error}`);

      if (statusCode.startsWith("5")) {
        return {
          type: "Error",
          error: "A server error occurred. Please try again later",
        };
      } else {
        return {
          type: "Error",
          error: "Something unexpected happened. Please try again later",
        };
      }
    }
  } catch (error) {
    console.error(`An error occurred when signing in: ${error}`);
    return { type: "Error", error: error.message || error };
  }
}

export type LogoutResponse = Outcome<void, string>;

export async function signOut(): Promise<LogoutResponse> {
  try {
    let response = await fetch("/api/auth/sign-out", { method: "GET" });
    const { message } = await response.json();
    console.log(message);
  } catch (error) {
    console.error(`Failed to log out: ${error}`);
    return { type: "Error", error };
  }
}
