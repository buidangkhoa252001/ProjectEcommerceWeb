import { createSlice } from '@reduxjs/toolkit';


export const historySlice = createSlice({
    name:"history",
    initialState:{
        history:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getHistoryStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getHistorySuccess:(state,action) =>{
            state.history = action.payload
            state.isFetching=true
           
        },
        getHistoryFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutHistory:(state)=>{
            state.history=[]
        }
        
    }
    



})
export const { getHistoryStart, getHistorySuccess,getHistoryFailure, logOutHistory} = historySlice.actions
export default historySlice.reducer