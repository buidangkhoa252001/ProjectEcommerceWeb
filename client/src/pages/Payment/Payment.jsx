import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './payment.css'
import axios from "../../axios/axios"
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/UserApi';
const Payment = () => {
    const { currentToken } = useSelector(state => state.login);
    const dispatch = useDispatch()
    const {order} = useSelector(state=>state.order)

    const handleChange = async(id,statusitem)=>{
        try{
            await axios.put(`/api/order/${id}`,{DeliveryStatus:!statusitem},{
                headers:{Authorization:currentToken.accesstoken}
            })
            alert("change success")
    
            getUser(dispatch,currentToken.accesstoken)  
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDelete = async (id) => {
        if(window.confirm("Do you want to delete this product?")){
            try {
                await axios.delete(`/api/order/${id}`, {
                    headers: { Authorization: currentToken.accesstoken }
                })
                alert("delete success")
                getUser(dispatch, currentToken.accesstoken)
    
            }
            catch (err) {
                console.log(err)
            }

        }
    }
    return (

        <div className="payment-page">
            <div className="payment_page-logo">
                <h2><i className="fa-solid fa-file-invoice"></i>All Order</h2>
            </div>
            <div className="payment_page_total-product">
                <h3>Pending <i className="fa-solid fa-caret-up"></i></h3>
               {/*  <h3>Total Order: {order.length}</h3> */}
            </div>
            <div className="payment_page_personal-title">
                <h3>Payment ID <i className="fa-brands fa-airbnb"></i></h3>
                <h3>User ID <i className="fa-brands fa-airbnb"></i></h3>
                <h3>User Account <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Date of Purchased <i className="fa-brands fa-airbnb"></i></h3>
                <h3><i className="fa-solid fa-file-circle-check"></i></h3>
                <h3>Delivery <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Change Status <i className="fa-brands fa-airbnb"></i></h3>
            </div>

            {
                order?.map(items => (
                    <div className="payment_page_product-detail" key={items._id}>
                        <h3>{items.paymentID}</h3>
                        <h3>{items.user_id}</h3>
                        <h3>{items.name}</h3>
                        <h3>{new Date(items.createdAt).toLocaleDateString()}</h3>
                        <h3><Link to={`/payment/${items._id}`} style={{textDecoration:"none",
                        padding: "15px", color: "#3351e7", background: " #dde3fb", borderRadius: "50%"
                        }}>View</Link></h3>

                        <h3>{items.DeliveryStatus === false ? <div className="payment_page_product-detail_pending"><i className="fa-regular fa-clock"></i>Pending</div> : <div><i className="fa-solid fa-check"></i>Ok</div>} </h3>


                        <div className="containbutton">
                            <button onClick={() => handleChange(items._id,items.DeliveryStatus)} className="changebutton"><i className="fa-solid fa-pen"></i> Update</button>
                            <button onClick={() => handleDelete(items._id)} className="deletebutton" > <i className="fa-solid fa-trash"></i>Delete</button>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Payment;
