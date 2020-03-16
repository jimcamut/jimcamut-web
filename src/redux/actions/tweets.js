import { UPDATE_TWEETS, SET_TWEETS } from "./types";

const updateTweets = data => ({ type: UPDATE_TWEETS, payload: data });
const setTweets = data => ({ type: SET_TWEETS, payload: data });

export { updateTweets, setTweets };
