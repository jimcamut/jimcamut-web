import { UPDATE_STRAVA, SET_STRAVA } from '../actions/types';
import { addToList } from './utils';

const initialState = {
  data: [],
  fetched: null
};

const StravaReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STRAVA: {
      return {
        ...state,
        data: addToList(state.data, action.payload || []),
        fetched: new Date()
      };
    }
    case SET_STRAVA: {
      return {
        data: action.payload || [],
        fetched: new Date()
      };
    }
    default:
      return state;
  }
};

export default StravaReducer;
