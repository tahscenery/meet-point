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

    if (response.status.toString().startsWith("2")) {
      const { token } = await response.json();
      return { type: "Success", data: token };
    } else {
      const { message } = await response.json();
      return { type: "Error", error: message };
    }
  } catch (error) {
    console.error(`An error occurred when signing in: ${error}`);
    return { type: "Error", error };
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
