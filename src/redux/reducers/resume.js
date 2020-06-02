import { SET_RESUME } from '../actions/types';

const initialState = {
  data: {},
  fetched: null
};

const ResumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESUME: {
      return {
        data: action.payload || {},
        fetched: new Date()
      };
    }
    default:
      return state;
  }
};

export default ResumeReducer;
