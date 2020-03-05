import { combineReducers } from "redux";

import User from "./user";
import MetaReducer from "./meta";
import StravaReducer from "./strava";
import TweetsReducer from "./tweets";

const AppReducer = combineReducers({
  user: User,
  meta: MetaReducer,
  strava: StravaReducer,
  tweets: TweetsReducer
});

const RootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
