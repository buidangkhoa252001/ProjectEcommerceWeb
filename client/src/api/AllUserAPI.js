
import axios from "../axios/axios"
import { getAllUserFailure, getAllUserStart, getAllUserSuccess } from "../redux/AllUserSlice"



export const getAllUser =async(dispatch,token)=>{
    if(token){
        dispatch(getAllUserStart())
        try{
            const res = await axios.get('/user/getAllUser', {
                headers: {Authorization:token}
            })
            
            dispatch(getAllUserSuccess(res.data))
           
            
        }catch(err){
              dispatch(getAllUserFailure())
              alert(err.response.data.msg)
        }
    }   


}