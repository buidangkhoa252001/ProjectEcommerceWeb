
import axios from "../axios/axios"
import { getCategoryFailure, getCategoryStart, getCategorySuccess } from "../redux/categorySlice"



export const getCategory =async(dispatch)=>{
   
        dispatch(getCategoryStart())
        try{
            const res = await axios.get('/api/category')
            dispatch(getCategorySuccess(res.data))
            console.log(res)
            
        }catch(err){
              dispatch(getCategoryFailure())
              alert(err.response.data.msg)
        }
  


}