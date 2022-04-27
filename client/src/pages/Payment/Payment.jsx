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
    /* const [status,setStatus] = useState(false) */
    const handleChange = async(id,statusitem)=>{
       
          console.log(statusitem) 
        try{
            await axios.put(`/api/payment/${id}`,{status:!statusitem},{
                headers:{Authorization:currentToken.accesstoken}
            })
            alert("change success")
            /* setStatus(!status) */
            getUser(dispatch,currentToken.accesstoken)  

        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDelete = async (id) => {

        try {
            await axios.delete(`/api/payment/${id}`, {
                headers: { Authorization: currentToken.accesstoken }
            })
            alert("delete success")
            getUser(dispatch, currentToken.accesstoken)

        }
        catch (err) {
            console.log(err)
        }
    }
    return (

        <div className="history-page">
                    <h2>All Payment</h2>
                    <h4>You have a {payment.length} orders</h4>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>User ID</th>
                        <th>User Account</th>
                        <th>Date of Purchased</th>
                        <th>Delivery</th>
                        <th>Change Status</th>
                        <th></th>
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
                                <td>{items.status===false ? <div>Pending</div> : <div>Ok</div>  } </td>
                                <td className="containbutton">
                                <button onClick={()=>handleChange(items._id,items.status)} className="changebutton">Change </button>
                                <button onClick={()=>handleDelete(items._id)} className="deletebutton" > Delete </button>
                                </td>
                                <td><Link to={`/payment/${items._id}`}>View</Link></td>
                            </tr>
                        ))          
                }
                </tbody>
            </table>

        </div>
    );
};

export default Payment;