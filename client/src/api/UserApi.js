import axios from "../axios/axios"
/* import axios from "axios"; */
import { addCart, getUserFailure, getUserStart, getUserSuccess } from "../redux/userSlice"
import { getCart } from './CartAPI';
import { getHistory } from './HistoryAPI';
import { getCategories } from './CategoriesAPI';
import { getOrder } from "./OrderAPI ";
import { getAllUser } from "./AllUserAPI";



export const getUser = async(dispatch,token)=>{
        if(token){
            dispatch(getUserStart())
            try{
                const res = await axios.get("/user/infor",{
                    headers:{Authorization:token}
                })
                dispatch(getUserSuccess(res.data))
                getCart(dispatch,res.data.cart)
                getHistory(dispatch,token)
                getAllUser(dispatch,token)
                getOrder(dispatch,token)
                getCategories(dispatch)
                console.log(res)
              
            }catch(err){
                  dispatch(getUserFailure())
                  alert(err.response.data.msg)
            }
        }

}








