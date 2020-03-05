import { UPDATE_TWEETS, SET_TWEETS } from "../actions/types";
import { addToList } from "./utils";

const initialState = {
  data: [],
  fetched: null
};

const TweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TWEETS: {
      console.log("UPDATING", action);
      return {
        ...state,
        data: addToList(state.data, action.payload || []),
        fetched: new Date()
      };
    }
    case SET_TWEETS: {
      return {
        data: action.payload || [],
        fetched: new Date()
      };
    }
    default:
      return state;
  }
};

export default TweetsReducer;
