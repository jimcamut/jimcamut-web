import { SET_USER } from "./types";

const setUser = user => ({ type: SET_USER, payload: user });

export { setUser };
