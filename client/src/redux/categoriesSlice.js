import { createSlice } from '@reduxjs/toolkit';


export const categoriesSlice = createSlice({
    name:"categories",
    initialState:{
        categories:[],
        isFetching: false,
        error: false,
    },
    reducers:{
        getCategoriesStart:(state) =>{
            state.isFetching=true
            state.error=false
        },
        getCategoriesSuccess:(state,action) =>{
            state.categories = action.payload
            state.isFetching=true
           
        },
        getCategoriesFailure:(state) =>{
        
            state.isFetching=false
            state.error=true
           
        },
        logOutCategories:(state)=>{
            state.categories=[]
        }
        
    }
    



})
export const { getCategoriesStart, getCategoriesSuccess,getCategoriesFailure, logOutCategories} = categoriesSlice.actions
export default categoriesSlice.reducer