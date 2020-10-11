export type LoginDetails = { email: string; password: string };
export type LoginResponse = { success: boolean; message?: string };

export async function login(
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
      return { success: true };
    } else {
      const json = await response.json();
      return { success: false, message: json.message };
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return { success: false, message: error };
  }
}
