import { createSlice } from '@reduxjs/toolkit';


export const categorySlice = createSlice({
    name:"category",
    initialState:{
        category:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getCategoryStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getCategorySuccess:(state,action) =>{
            state.category = action.payload
            state.isFetching=true
           
        },
        getCategoryFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutCategory:(state)=>{
            state.category=[]
        }
        
    }
    



})
export const { getCategoryStart, getCategorySuccess,getCategoryFailure, logOutCategory} = categorySlice.actions
export default categorySlice.reducer