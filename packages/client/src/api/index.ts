import * as AuthApi from "./auth";
import * as UserApi from "./user";

export type Success<T> = { type: "Success"; data: T };
export type Error<E> = { type: "Error"; error: E };
export type Outcome<T, E> = Success<T> | Error<E>;

export { AuthApi, UserApi };
