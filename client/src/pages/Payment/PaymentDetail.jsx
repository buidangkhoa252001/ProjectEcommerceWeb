
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

 
const PaymentDetail = () => {
    const params = useParams()
    const {payment} = useSelector(state=>state.payment)
    const [paymentDetails, setPaymentDetails] = useState([])
   
    useEffect(()=>{
     
      payment?.map(paymentDetail=>{
                if(paymentDetail._id===params.id){
                    setPaymentDetails(paymentDetail)
    
                }
                console.log(paymentDetails)
            })      

    },[params,payment])
    return (
        <div className="history-page">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{paymentDetails?.address?.recipient_name}</td>
                    <td>{paymentDetails?.address?.line1 + " - " + paymentDetails?.address?.city}</td>
                    <td>{paymentDetails?.address?.postal_code}</td>
                    <td>{paymentDetails?.address?.country_code}</td>
                </tr>
            </tbody>
        </table>

        <table style={{margin: "30px 0px"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    paymentDetails?.cart?.map(item =>(
                    <tr key={item._id}>
                        <td><img src={item.images.url} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>$ {item.price * item.quantity}</td>
                    </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
    );
}
 

 
export default PaymentDetail;