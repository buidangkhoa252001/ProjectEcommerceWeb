import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getCartStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getCartSuccess:(state,action) =>{
            state.cart = action.payload
            state.isFetching=true
           
        },
        getCartFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutCart:(state)=>{
            state.cart=[]
        }
        
    }
    



})
export const { getCartStart, getCartSuccess,getCartFailure, logOutCart} = cartSlice.actions
export default cartSlice.reducer