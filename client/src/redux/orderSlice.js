import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name:"order",
    initialState:{
        order:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getOrderStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getOrderSuccess:(state,action) =>{
            state.order = action.payload
            state.isFetching=true
           
        },
        getOrderFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutOrder:(state)=>{
            state.payment=[]
        }
        
    }
})
export const { getOrderStart, getOrderSuccess,getOrderFailure, logOutOrder} = orderSlice.actions
export default orderSlice.reducer