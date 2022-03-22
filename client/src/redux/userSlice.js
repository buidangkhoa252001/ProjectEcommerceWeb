
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{},
    isLoading:false,
    error:false

}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUserStart:(state)=>{
            state.isFetching=true
        },
        getUserSuccess:(state,action)=>{
            state.user=action.payload
            state.isFetching=false
        },
        getUserFailure:(state)=>{
            state.isFetching=false
            state.error= true
        },addCart:(state,action)=>{
            var exists = false
            const newCP = action.payload;   
            var cart = []
            state.cart?.map(cartProduct => {
                if(cartProduct._id === newCP._id) {
                    exists = true

                }
                cart.push(cartProduct);
            })
            if(exists === false) {
                cart.push({                   
                   ...newCP,               
                })
            }
        },
        logOutUserStore:(state)=>{
            state.user={}
        }
    }
})
export const { getUserStart, getUserSuccess,getUserFailure,addCart,logOutUserStore} = userSlice.actions
export default userSlice.reducer;