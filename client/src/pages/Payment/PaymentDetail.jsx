
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./paymentDetail.css"
 
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
             <div className="history_page-logo">
                <h2><i class="fa-solid fa-file-invoice"></i>Payment</h2>
            </div>
            <div className="history_page_personal">
                <h3>Personal <i className="fa-solid fa-user-clock"></i></h3>
            </div>
            <div className="history_page_personal-title">
                <h3>Name <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Address <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Postal Code <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Country Code <i className="fa-brands fa-airbnb"></i></h3>
            </div>
            <div className="history_page_personal-detail">
                <h3><i className="fa-solid fa-user"></i>{paymentDetails?.address?.recipient_name}</h3>
                <h3><i className="fa-solid fa-location-arrow"></i>{paymentDetails?.address?.line1 + " - " + paymentDetails?.address?.city}</h3>
                <h3><i className="fa-solid fa-qrcode"></i>{paymentDetails?.address?.postal_code}</h3>
                <h3><i className="fa-solid fa-location-dot"></i>{paymentDetails?.address?.country_code}</h3>
            </div>
            <div className="history_page_product">
                <h3>Products <i className="fa-solid fa-cart-arrow-down"></i></h3>
            </div>
            <div className="history_page_product-title">
                <h3>Image <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Name Products <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Quantity <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Price <i className="fa-brands fa-airbnb"></i></h3>
            </div>
            {
                paymentDetails?.cart?.map(item => (
                    <div className="history_page_product-detail" key={item._id}>
                        <div className="payment-detail-img">
                            <img src={item.images.url} alt="" />
                        </div>
                        <h3>{item.title}</h3>
                        <h3>{item.quantity}</h3>
                        <h3><i className="fa-solid fa-dollar-sign"></i> {item.price * item.quantity}</h3>
                    </div>
                ))
            }
    </div>
    );
}
 

 
export default PaymentDetail;