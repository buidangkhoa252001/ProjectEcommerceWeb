import React, { useEffect } from "react";
import { DefaultLayout } from "../DefaultLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../api/CartAPI";
import { getUser } from "../../api/UserApi";
import { addCart } from "../../redux/userSlice";
import { getHistory } from "../../api/HistoryAPI";



export const PrivateRoute = ({ children }) =>{
  const dispatch = useDispatch();
	const { isAuth,currentToken } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);
  const {cart} = useSelector(state => state.cart)

  useEffect(()=>{
     
    /*       getCart(dispatch,user.cart)
           console.log(cart) */
      
    /*   const firstLogin = localStorage.getItem("firstLogin")
      if(firstLogin){
          const refreshToken= async()=>{
              const token = await axios.get("/user/refresh_token")
              console.log(token)
              getToken(token.data.accesstoken)
              setTimeout(()=>{
                  refreshToken()
              },10*60*1000)
          }
          refreshToken() && dispatch(loginSuccess())
      } */
  },[user,cart,dispatch,currentToken])
    return <DefaultLayout>{children}</DefaultLayout>

}


