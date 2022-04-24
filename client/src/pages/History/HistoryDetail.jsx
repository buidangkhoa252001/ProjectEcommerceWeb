
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./historyDetail.css";

const HistoryDetail = () => {
    const params = useParams()
    const history = useSelector(state => state.history)
    const [historyDetails, setHistoryDetails] = useState([])

    useEffect(() => {
        console.log(history.history)
        console.log(params.id)


        history?.history.map(historyDetail => {
            if (historyDetail._id === params.id) {
                setHistoryDetails(historyDetail)
            }
            console.log(historyDetails)
        })



    }, [params, historyDetails, history])
    return (
        <div className="history-page">
            <div className="history_page-logo">
                <h2><i className="fa-solid fa-clock-rotate-left"></i>History</h2>
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
                <h3><i className="fa-solid fa-user"></i>{historyDetails?.address?.recipient_name}</h3>
                <h3><i className="fa-solid fa-location-arrow"></i>{historyDetails?.address?.line1 + " - " + historyDetails?.address?.city}</h3>
                <h3><i className="fa-solid fa-qrcode"></i>{historyDetails?.address?.postal_code}</h3>
                <h3><i className="fa-solid fa-location-dot"></i>{historyDetails?.address?.country_code}</h3>
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
                historyDetails?.cart?.map(item => (
                    <div className="history_page_product-detail" key={item._id}>
                        <span><img src={item.images.url} alt="" /></span>
                        <h3>{item.title}</h3>
                        <h3>{item.quantity}</h3>
                        <h3><i className="fa-solid fa-dollar-sign"></i> {item.price * item.quantity}</h3>
                    </div>
                ))
            }
        </div>
    );
}



export default HistoryDetail;