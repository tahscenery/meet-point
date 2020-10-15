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
      let { message } = await response.json();
      console.log(`An error occurred when signing in: ${message}`);

      if (statusCode.startsWith("5")) {
        return {
          type: "Error",
          error: message || "A server error occurred. Please try again later",
        };
      } else {
        return {
          type: "Error",
          error: message || "Something unexpected happened. Please try again",
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
    return { type: "Success", data: null };
  } catch (error) {
    console.error(`Failed to log out: ${error}`);
    return { type: "Error", error };
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (sessionStorage.getItem("jwt")) {
    return true;
  } else {
    return false;
  }
}

export function authenticate(token: string, callback: () => void) {
  if (typeof window === "undefined") {
    console.error("Failed to authenticate user");
    return;
  }

  sessionStorage.setItem("jwt", token);
  callback();
}

export async function clearJwt(callback: () => void) {
  if (typeof window === "undefined") {
    console.error("Failed to clear jwt");
    return;
  }

  sessionStorage.removeItem("jwt");
  const response = await signOut();

  if (response.type === "Success") {
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    callback();
  } else {
    console.log(response.error);
    return;
  }
}

export default { signIn, signOut, isAuthenticated, clearJwt };
