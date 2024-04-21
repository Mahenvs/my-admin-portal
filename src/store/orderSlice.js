import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'orders',
    initialState:{
        orderData:null
    },
    reducers: {
        setOrders: (state,action) =>{
            state.orderData = action.payload;
            
        }
    }
})

export const {setOrders} = orderSlice.actions;
export default orderSlice.reducer;