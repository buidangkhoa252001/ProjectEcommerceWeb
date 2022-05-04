import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "../../axios/axios"
import Loading from '../../utils/Loading/Loading'
import { getUser } from '../../api/UserApi';
import PaypalButton from './PaypalButton';
import "./checkout.css";

const initialState = {
    name: '',
    phone: '',
    address: '',
    postalcode: ''
}

function Checkout() {
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const { cart } = useSelector(state => state.cart)
    const { isAuth,currentToken } = useSelector(state => state.login);
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(()=>{
        if(isAuth){
            const getTotal=()=>{
                const total = cart.reduce((prev,cart)=>{
                    return prev+(cart.quantity*cart.price)
                },0)
                setTotal(total)
            }
            getTotal()
        }
    },[cart,isAuth])

    const tranSuccess = async(payment)=>{
        const {paymentID} = payment;
        await axios.post('/api/payment', {cart, paymentID, address:data}, {
            headers: {Authorization: currentToken.accesstoken}
        })
        await axios.patch('/user/addcart',{cart:[]},{
            headers:{Authorization:currentToken.accesstoken}
        })
        alert("You have successfully placed an order.")
        getUser(dispatch,currentToken.accesstoken)
        navigate("/", { replace: true })

    }
    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    return (
        <>
            <div>
            </div>
            <div className="profile_page">
                <div className="col-left">
                    <form className="update-profile" /* onSubmit={handleChange} */>
                        <div className="form-group">
                            <input type="text" name="name" id="name" 
                                placeholder=' ' value={data.name} onChange={handleChange} />
                            <label htmlFor="name">Name</label>
                            <i className="fa-solid fa-file-signature"></i>
                        </div>
                        <div className="form-group">
                            <input type="phone" name="phone" id="phone"  value={data.phone} onChange={handleChange}
                                placeholder='' />
                            <label htmlFor="phone">Phone</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>

                        <div className="form-group">
                            <input type="text" name="address" id="address" value={data.address}
                                placeholder=''  onChange={handleChange} />
                            <label htmlFor="password">Address</label>
                            <i className="fa-solid fa-eye"></i>
                        </div>

                        <div className="form-group" >
                            <input type="text" name="postalcode" id="postalcode" value={data.postalcode}
                                placeholder=' '  onChange={handleChange} />
                            <label htmlFor="postalcode">Postal Code</label>
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <div>
                        <PaypalButton style="margin-top:15px"
                        total={total}
                        tranSuccess={tranSuccess}
                         />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Checkout