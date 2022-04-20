
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import './payment.css'
import axios from "../../axios/axios"
const Payment = () => {
 

    /* useEffect(()=>{
        const getAllPayment=async()=>{
            const res= await axios.get("/api/payment")
            console.log(res)
        }
        getAllPayment()
    },[]) */
    return (
        <div className="history-page">
                    <h2>History</h2>
                  {/*   <h4>You have a {history.length}</h4> */}
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
               {/*  <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody> */}
            </table>
        </div>
    );
};

export default Payment;