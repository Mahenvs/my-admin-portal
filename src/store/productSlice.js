import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    
    name: 'product',
    initialState: {
        products: null,
        sortedProducts:null,
        categoriesList: null,
        units: null
    },
    reducers:{

        listOfProducts:(state,action) =>{
            state.products = action.payload
        },
        listOfProductsSorted:(state,action) =>{
            state.sortedProducts = action.payload
        },
        listOfCategories: (state,action) =>{
            state.categoriesList = action.payload;
        },
        listOfUnits: (state,action) =>{
            state.units = action.payload
        }

    }
});

export const {listOfProducts,listOfProductsSorted,listOfCategories,listOfUnits} = productSlice.actions;
export default productSlice.reducer;