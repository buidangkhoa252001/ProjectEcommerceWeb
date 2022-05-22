import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "../../axios/axios"
import Loading from '../../utils/Loading/Loading'
import { getUser } from '../../api/UserApi';
import { Link } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import "./checkout.css";
import IMG from "./logo.png"

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
    const { isAuth, currentToken } = useSelector(state => state.login);
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        if (isAuth) {
            const getTotal = () => {
                const total = cart.reduce((prev, cart) => {
                    return prev + (cart.quantity * cart.price)
                }, 0)
                setTotal(total)
            }
            getTotal()
        }
    }, [cart, isAuth])

    const tranSuccess = async(payment)=>{
        const {paymentID} = payment;
        await axios.post('/api/order', {cart, paymentID, address:data}, {
            headers: {Authorization: currentToken.accesstoken}
        })
        await axios.patch('/user/addcart', { cart: [] }, {
            headers: { Authorization: currentToken.accesstoken }
        })
        alert("You have successfully placed an order.")
        getUser(dispatch, currentToken.accesstoken)
        navigate("/", { replace: true })

    }
    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    return (
        <>
            <div className="checkout">
                <div className="checkout_box">
                    <div className="checkout_title">
                        <div className="checkout_title-text">
                            <h2>Order</h2>
                            <span><ion-icon name="information-circle-outline"></ion-icon> Pending</span>
                        </div>
                        <div className="checkout_title-back">
                            <button><Link style={{ textDecoration: "none", color: "black" }} to="/cart">Back</Link></button>
                        </div>
                    </div>
                    <div className="checkout_line"></div>
                    <div className="checkout_detail">
                        <div className="checkout_detail-total-price">
                            <h2>{total}$</h2>
                            <span>Order amount</span>
                        </div>
                        <div className="checkout_detail-info">
                            <div className="checkout_detail-info-title">
                                <div className="checkout_detail-info-img">
                                    <img src={IMG} alt="" />
                                </div>
                                <div className="checkout_detail-info-text">
                                    LALATEAM SYSTEM
                                </div>
                            </div>
                            <div className="checkout_detail-info-form">
                                <form action="">
                                    <h3>Customer</h3>
                                    <table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td><input type="text" name="name" id="name"
                                                placeholder=' ' value={data.name} onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td><input type="phone" name="phone" id="phone" value={data.phone} onChange={handleChange}
                                                placeholder='' /></td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td><input type="text" name="address" id="address" value={data.address}
                                                placeholder='' onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td>Postal Code</td>
                                            <td><input type="text" name="postalcode" id="postalcode" value={data.postalcode}
                                                placeholder=' ' onChange={handleChange} /></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <h3>Transaction</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Method</td>
                                                <td>Paypal</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="checkout_detail-info-form-btn">
                                        <PaypalButton style="margin-top:15px"
                                            total={total}
                                            tranSuccess={tranSuccess}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout