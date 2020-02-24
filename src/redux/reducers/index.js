import { combineReducers } from "redux";

import User from "./user";
import MetaReducer from "./meta";
import FeedReducer from "./feed";

const AppReducer = combineReducers({
  user: User,
  meta: MetaReducer,
  feed: FeedReducer
});

const RootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
