
import { getCartFailure, getCartStart, getCartSuccess } from "../redux/cartSlice"


export const getCart = (dispatch,cart)=>{
    dispatch(getCartStart())
    try{
        dispatch(getCartSuccess(cart))
    }
    catch(err){
        console.log(err)
        dispatch(getCartFailure())
    }

}




