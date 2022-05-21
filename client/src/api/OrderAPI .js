
import axios from "../axios/axios"
import { getOrderSuccess, getOrderFailure, getOrderStart } from "../redux/orderSlice"

export const getOrder =async(dispatch,token)=>{
    if(token){
        dispatch(getOrderStart())
        try{
            const res = await axios.get('/api/order', {
                headers: {Authorization:token}
            })
            dispatch(getOrderSuccess(res.data))      
        }catch(err){
              dispatch(getOrderFailure())
              alert(err.response.data.msg)
        }
    }   


}