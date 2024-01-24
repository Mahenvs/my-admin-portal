import {configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import storeReducer from './storeSlice';
import customerStoreReducer from './customerSlice';

// import { persistedReducer } from './persistConfig';
// import rootReducer from './combineReducers';
// import { persistStore } from 'redux-persist';
// import {
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
    reducer:{
        product: productReducer,
        store: storeReducer,
        customerStore: customerStoreReducer
    }
    // reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),

})
// const persistor = persistStore(appStore);

export default appStore;
// export { appStore, persistor };
