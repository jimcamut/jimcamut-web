import { UPDATE_FEED, SET_FEED } from "../actions/types";
import { addToList } from "./utils";

const initialState = {
  data: [],
  fetched: null
};

const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FEED: {
      console.log("UPDATING", action);
      return {
        ...state,
        data: addToList(state.data, action.payload || []),
        fetched: new Date()
      };
    }
    case SET_FEED: {
      return {
        data: action.payload || [],
        fetched: new Date()
      };
    }
    default:
      return state;
  }
};

export default FeedReducer;
