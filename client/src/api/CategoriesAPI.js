
import axios from "../axios/axios"
import { getCategoriesFailure, getCategoriesStart, getCategoriesSuccess } from "../redux/categoriesSlice"



export const getCategories =async(dispatch)=>{
   
        dispatch(getCategoriesStart())
        try{
            const res = await axios.get('/api/category')
            dispatch(getCategoriesSuccess(res.data))
          
            
        }catch(err){
              dispatch(getCategoriesFailure())
              alert(err.response.data.msg)
        }
  


}