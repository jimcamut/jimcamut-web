import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default () => {
  return { store, persistor };
};
