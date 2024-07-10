import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'orders',
    initialState:{
        orderData:null
    },
    reducers: {
        setOrders: (state,action) =>{
            state.orderData = action.payload;
            
        },
        updateOrder:(state,action) =>{
            console.log(action.payload[0].orderId,action.payload);
            // console.log(orderData);
            // console.log(state.orderData);
            const currentState = JSON.parse(JSON.stringify(state));
            console.log("Current state orderData:", currentState.orderData);

            const updatedIndex = state.orderData.findIndex((item)=> item.orderId == action.payload[0].orderId)

            console.log("iss ",updatedIndex);
            const finalOrder = [
                ...state.orderData.slice(0,updatedIndex),
                ...action.payload,
                ...state.orderData.slice(updatedIndex+1),
            ]
            console.log(finalOrder);
            state.orderData =finalOrder
        }
    }
})

export const {setOrders,updateOrder} = orderSlice.actions;
export default orderSlice.reducer;