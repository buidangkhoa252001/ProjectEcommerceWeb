import { createSlice } from '@reduxjs/toolkit';


export const pageSlice = createSlice({
    name:"page",
    initialState:{
        
    },
    reducers:{
      
        getPageSuccess:(state,action) =>{
            state = action.payload
      
           
        },
        logOutPage:(state)=>{
            state={}
        }
        
    }
    



})
export const { getPageSuccess, logOutPage} = pageSlice.actions
export default pageSlice.reducer