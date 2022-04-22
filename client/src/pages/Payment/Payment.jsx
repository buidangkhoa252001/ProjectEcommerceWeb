import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './payment.css'
import axios from "../../axios/axios"
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/UserApi';
const Payment = () => {

    const { currentToken } = useSelector(state => state.login);
    const dispatch = useDispatch()
    const {payment} = useSelector(state=>state.payment)
    const handleChange = async(id)=>{
        
        await axios.put(`/payment/${id}`,{status:true},{
            headers:{Authorization:currentToken.accesstoken}
        })
        alert("change success")
        getUser(dispatch,currentToken.accesstoken)  
    }
    const handleDelete = async(id)=>{
        await axios.delete(`/payment/${id}`,{
            headers:{Authorization:currentToken.accesstoken}
        })
        alert("delete success")
        getUser(dispatch,currentToken.accesstoken)  
    }
    return (
        <div className="history-page">
                    <h2>History</h2>
                    <h4>You have a {payment.length}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>User ID</th>
                        <th>User Account</th>
                        <th>Date of Purchased</th>
                        <th></th>
                        <th>Delivery</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
              {
                   payment?.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{items.user_id}</td>
                                <td>{items.name}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/payment/${items._id}`}>View</Link></td>
                                <td>{items.status===false ? <div>Pending</div> : <div>Ok</div>  } </td>
                                <td className="containbutton"><button onClick={()=>handleChange(items?._id)} className="changebutton"> Accept </button>
                                <button onClick={()=>handleDelete(items?._id)} className="deletebutton" > Delete </button>
                                </td>
                            </tr>
                        ))
                  
                }
                </tbody>
            </table>
        </div>
    );
};

export default Payment;