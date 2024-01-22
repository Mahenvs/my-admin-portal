// rootReducer.js
import { combineReducers } from 'redux';
import  productReducer  from './productSlice';
import  storeReducer  from './storeSlice';
import { persistedReducer } from './persistConfig';

const rootReducer = combineReducers({
  product: persistedReducer(productReducer),
  store: persistedReducer(storeReducer),
  // Add more reducers if needed
});

export default rootReducer;
