
import axios from "../axios/axios"
import { getPaymentFailure, getPaymentStart, getPaymentSuccess } from "../redux/paymentSlice"



export const getPayment =async(dispatch,token)=>{
    if(token){
        dispatch(getPaymentStart())
        try{
            const res = await axios.get('/api/payment', {
                headers: {Authorization:token}
            })
            dispatch(getPaymentSuccess(res.data))

            
        }catch(err){
              dispatch(getPaymentFailure())
              alert(err.response.data.msg)
        }
    }   


}