import { createSlice } from '@reduxjs/toolkit';


export const allUserSlice = createSlice({
    name:"allUser",
    initialState:{
        allUser:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getAllUserStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getAllUserSuccess:(state,action) =>{
            state.allUser = action.payload
            state.isFetching=true
           
        },
        getAllUserFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutAllUser:(state)=>{
            state.allUser=[]
        }
        
    }
    



})
export const { getAllUserStart, getAllUserSuccess,getAllUserFailure, logOutAlllUser} = allUserSlice.actions
export default allUserSlice.reducer