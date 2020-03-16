import { SET_DASH } from "../actions/types";

const initialState = {
  data: {},
  fetched: null
};

const DashReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DASH: {
      return {
        data: action.payload || [],
        fetched: new Date()
      };
    }
    default:
      return state;
  }
};

export default DashReducer;
