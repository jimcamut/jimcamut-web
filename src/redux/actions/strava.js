import { UPDATE_STRAVA, SET_STRAVA } from "./types";

const updateStrava = data => ({ type: UPDATE_STRAVA, payload: data });
const setStrava = data => ({ type: SET_STRAVA, payload: data });

export { updateStrava, setStrava };
