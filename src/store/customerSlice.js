import {createSlice} from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name:'customer',
    initialState:{
        storeName: null,
        storeDomainResource: null,
        storeId: null
    },
    reducers: {

        setStoreName: (state,action) =>{
            state.name = action.payload;
        },
        setStoreDomain: (state,action) =>{
            state.storeDomainResource = action.payload;
        },
        setStoreId: (state,action) => {
            state.storeId = action.payload
        }
    }
})

export const {setName,setAdminId,setStoreId,setStoreDomain} = customerSlice.actions;
export default customerSlice.reducer;