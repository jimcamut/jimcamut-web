import { UPDATE_GRAMS, SET_GRAMS } from '../actions/types';
import { addToList } from './utils';

const initialState = {
  data: [],
  fetched: null
};

const GramsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GRAMS: {
      return {
        ...state,
        data: addToList(state.data, action.payload || []),
        fetched: new Date()
      };
    }
    case SET_GRAMS: {
      return {
        data: action.payload || [],
        fetched: new Date()
      };
    }
    default:
      return state;
  }
};

export default GramsReducer;
