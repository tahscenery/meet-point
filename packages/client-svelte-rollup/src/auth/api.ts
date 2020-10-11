export type User = {
  email: string;
  password: string;
};

const proxy = "http://localhost:4000/api";

export async function signIn(user: User): Promise<string> {
  try {
    console.log(user);

    let response = await fetch(`${proxy}/auth/sign-in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const json = await response.json();
    return json.token;
  } catch (error) {
    // return Promise.reject(`An error occurred when trying to sign in: ${error}`);
    throw new Error(`An error occurred when trying to sign in: ${error}`);
  }
}

export async function signOut() {
  // try {
  //   let response = await fetch("/api/auth/sign-out", { method: "GET" });
  //   return await response.json();
  // } catch (error) {
  //   console.error(`An error occurred when trying to sign out: ${error}`);
  //   return null;
  // }
}
