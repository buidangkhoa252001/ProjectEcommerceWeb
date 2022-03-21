import React, { useState } from 'react'

import axios from 'axios'
import "./cart.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../api/UserApi';

import PaypalButton from './PaypalButton';

function Cart() {
    const {cart} = useSelector(state=>state.cart)
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
    const tranSuccess = async(payment)=>{
        console.log(payment)
        console.log(cart)
        const {paymentID, address} = payment;
        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: currentToken.accesstoken}
        })
        await axios.patch('/user/addcart',{cart:[]},{
            headers:{Authorization:currentToken.accesstoken}
        })
        getUser(dispatch,currentToken.accesstoken)
        alert("You have successfully placed an order.")

    }

    if(user.cart.length === 0) 
        return ( <div>

             <h2 style={{textAlign: "center", fontSize: "8rem"}}>Cart Empty</h2></div>
                )
    return (
        <div>
            {
               cart1.map((item)=>(
                    <div className="detail cart" key={item?._id}>
                        <img src={item?.images?.url} alt="test" />
                        <div className="box-detail">
                            <h2>{item.title}</h2> style={{ textDecoration: "none" , cursor: "pointer" }}
                          
                            <h3>${item.price * item.quantity}</h3>
                            <p>{item.description}</p>
                            <p>{item.content}</p>
                            <div className="amount">
                                <button onClick={()=>descrease(item)} > - </button>
                                <span>{item.quantity}</span>
                                <button onClick={()=>inscrease(item._id)} > + </button>
                            </div>
                            
                            <div className="delete"  onClick={()=>removeCart(item._id)}
                           >
                                X
                            </div>
                        </div>
                    </div>
            )) 
            }
                
            <div className="total">
                <h3>Total: ${total}     </h3>  
                <PaypalButton
                  total={total}
                tranSuccess={tranSuccess}
                />
              
            </div>
        </div>
    )
}

export default Cart