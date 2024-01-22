import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    
    name: 'product',
    initialState: {
        products: null,
        sortedProducts:null
    },
    reducers:{

        listOfProducts:(state,action) =>{
            state.products = action.payload
        },
        listOfProductsSorted:(state,action) =>{
            state.sortedProducts = action.payload
        },
    }
});

export const {listOfProducts,listOfProductsSorted} = productSlice.actions;
export default productSlice.reducer;