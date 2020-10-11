export type Success<T> = { type: "Success"; data: T };
export type Error<E> = { type: "Error"; error: E };
export type Outcome<T, E> = Success<T> | Error<E>;

export type LoginDetails = { email: string; password: string };
export type LoginResponse = Outcome<boolean, string>;

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

    if (response.status === 200) {
      return { type: "Success", data: true };
    } else {
      return { type: "Error", error: await response.json() };
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
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
