import {configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import storeReducer from './storeSlice';
import customerStoreReducer from './customerSlice';
import orderStoreReducer from './orderSlice';

const appStore = configureStore({
    reducer:{
        product: productReducer,
        store: storeReducer,
        customerStore: customerStoreReducer,
        orderStore: orderStoreReducer
    }

})

export default appStore;
