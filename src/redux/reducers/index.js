import { combineReducers } from 'redux';

import User from './user';
import MetaReducer from './meta';
import StravaReducer from './strava';
import TweetsReducer from './tweets';
import DashReducer from './dash';
import GramsReducer from './grams';
import ResumeReducer from './resume';

const AppReducer = combineReducers({
  user: User,
  meta: MetaReducer,
  strava: StravaReducer,
  tweets: TweetsReducer,
  dash: DashReducer,
  grams: GramsReducer,
  resume: ResumeReducer
});

const RootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
