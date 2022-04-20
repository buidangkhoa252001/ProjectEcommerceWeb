import { createSlice } from '@reduxjs/toolkit';


export const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        payment:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getPaymentStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getPaymentSuccess:(state,action) =>{
            state.payment = action.payload
            state.isFetching=true
           
        },
        getPaymentFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutPayment:(state)=>{
            state.payment=[]
        }
        
    }
})
export const { getPaymentStart, getPaymentSuccess,getPaymentFailure, logOutPayment} = paymentSlice.actions
export default paymentSlice.reducer