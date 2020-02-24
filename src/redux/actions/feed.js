import { UPDATE_FEED, SET_FEED } from "./types";

const updateFeed = data => ({ type: UPDATE_FEED, payload: data });
const setFeed = data => ({ type: SET_FEED, payload: data });

export { updateFeed, setFeed };
