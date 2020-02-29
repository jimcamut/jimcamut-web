import { UPDATE_META } from '../actions/types';

const initialState = {};

const MetaReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_META: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default MetaReducer;