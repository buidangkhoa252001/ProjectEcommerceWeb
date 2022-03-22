import { createSlice } from '@reduxjs/toolkit'



export const loginSlice =  createSlice({
    name: "user",
   initialState:{
    currentToken:null,
    isAuth: false,
    isFetching:false,
    error:false,
  },
  reducers:{
    loginStart:(state)=>{
      state.isFetching=true
      },
    loginSuccess:(state,{payload})=>{
      state.isAuth = true;
      state.isFetching=true
      state.currentToken=payload

      },
    loginFailure:(state)=>{
      state.isFetching= false
       state.error= true
      },
    logOut:(state)=>{
      state.currentToken=null;
      state.isFetching= false;  
      state.isAuth= false;
      },
      getToken:(state,action)=>{
        state.currentToken=action.payload
      }
  }

})
export const { loginSuccess,loginFailure,loginStart,logOut,getToken } = loginSlice.actions
export default loginSlice.reducer;