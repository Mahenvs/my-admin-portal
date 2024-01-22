// redux/persistConfig.js
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  // Additional configuration options if needed
};

export const persistedReducer = (rootReducer) =>
  persistReducer(persistConfig, rootReducer);
