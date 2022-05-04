import React, { useState } from 'react'

import axios from "../../axios/axios"
import "./cart.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../api/UserApi';
import { Link } from 'react-router-dom';

function Cart() {
    const {user} = useSelector(state=>state.user)
    const [cart1,setCart1] = useState([])
    const { isAuth,currentToken } = useSelector(state => state.login);
    const dispatch = useDispatch();
	
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        setCart1(user.cart)
        if(isAuth){

            const getTotal=()=>{
                const total = user?.cart.reduce((prev,cart)=>{
                    return prev+(cart.quantity*cart.price)
                },0)
                setTotal(total)
            }
            getTotal()
        }
     
    },[user?.cart,isAuth])
    const removeCart = async(id)=>{
        const newCart=[]
        if(window.confirm("Do you want to delete this product?")){
            cart1.map(item=>{
                if(item._id===id){
                    const nextCart = cart1.filter(product=>{
                        return product._id !== item._id 
                    })  
                   newCart.push(...nextCart)
                }        
            })   
            await axios.patch('/user/addcart',{cart:newCart},{
                headers:{Authorization:currentToken.accesstoken}
            })
            getUser(dispatch,currentToken.accesstoken)            
        }                 
         
    } 
    const removeAllCart = async()=>{
        const newCart=[]
        if(window.confirm("Do you want to delete all products ?")){
           
            await axios.patch('/user/addcart',{cart:newCart},{
                headers:{Authorization:currentToken.accesstoken}
            })
            getUser(dispatch,currentToken.accesstoken)            
        }                 
         
    }
    const inscrease =async(id)=>{
        const cartI = JSON.parse(JSON.stringify(user.cart)); 
        cartI.map(item=>{
            if(item._id===id){          
                  item.quantity+=1   
            }        
        })     
        await axios.patch('/user/addcart',{cart:cartI},{
            headers:{Authorization:currentToken.accesstoken}
        })
        getUser(dispatch,currentToken.accesstoken)  
    }
    const descrease =async(product)=>{
        const cartD = JSON.parse(JSON.stringify(user.cart)); 
        if(product.quantity<2){
            alert("the quantity always greater than 1")
        }
        else{
            cartD.map(item=>{
                if(item._id===product._id){          
                      item.quantity-=1   
                }        
            })     
            await axios.patch('/user/addcart',{cart:cartD},{
                headers:{Authorization:currentToken.accesstoken}
            })
            getUser(dispatch,currentToken.accesstoken)  
        }
       
    }

    if(user.cart.length === 0) 
        return ( <div>

             <h2 style={{textAlign: "center", fontSize: "8rem"}}>Cart Empty</h2></div>
                )
    return (
       
    <div className="cart">
         <div className="cart-container">
            <div className="cart-container_title">
              <span>Shopping Cart</span>
             <a href="#" className="btn-remove_cart" onClick={removeAllCart}>Remove all</a>
            </div>
            {
               cart1.map((item)=>(
                <div className="cart-container_detail" key={item?._id} >
                    <img className="cart-container_detail-img"  src={item?.images?.url}></img>   
                    <div className="cart-container_detail-title">
                        <h1>{item.title}</h1>
                        <span>{item.description}</span>
                    </div>
                    <div className="cart-container_detail-change">
                        <button onClick={()=>inscrease(item._id)}><i className="fa-solid fa-plus"></i></button>
                        <span>{item.quantity}</span>
                        <button  onClick={()=>descrease(item)}><i className="fa-solid fa-minus"></i></button>
                    </div>
                    <div className="cart-container_detail-price">
                        <span>${item.price * item.quantity}</span>
                        <a href="#" onClick={()=>removeCart(item._id)} className="cart-container_detail-price-remove"><i className="fa-solid fa-delete-left"></i></a>
                    </div>
                </div>
            )) 
            }
                <div className="cart-container_line"></div>

                <div className="cart-container_total-price">
                    <div className="cart-container_total-price-icon">
                        <i className="fa-solid fa-basket-shopping"></i>
                    </div>         
                    <div className="cart-container_total-price-detail">
                        <div className="cart-container_total-price-detail-title">
                            <span>Sub-Total</span>
                            <h1> ${total}</h1>
                        </div>
                        <div className="cart-container_total-price-detail-button">
                         <button><Link style={{ textDecoration: "none" }} to="/checkout">Checkout</Link></button> 
                        </div>
                    </div>
                </div>
        </div>
 </div>
    )
}

export default Cart