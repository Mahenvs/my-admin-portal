import {createSlice} from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name:'store',
    initialState:{
        name: null,
        adminid: null,
        storeId: null
    },
    reducers: {

        setName: (state,action) =>{
            state.name = action.payload;
        },
        setAdminId: (state,action) => {
            state.adminid = action.payload;
        },
        setStoreId: (state,action) => {
            console.log("19 store id ",action.payload);

            state.storeId = action.payload
        }
    }
})

export const {setName,setAdminId,setStoreId} = storeSlice.actions;
export default storeSlice.reducer;