
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './history.css'

const History = () => {

    const { history } = useSelector(state => state.history)

    return (
        <div className="history_page">
            <div className="history_page-logo">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <h2>Order</h2>
            </div>
            <div className="history_page_total-product">
                <h3>Finalized <i className="fa-solid fa-caret-up"></i></h3>
                <h3>Total Orders: {history.length}</h3>
            </div>
            <div className="history_page_title-detail1">

                <h3>Payment ID <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Date of Purchased <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Delivery <i className="fa-brands fa-airbnb"></i></h3>
                <h3></h3>
            </div>
            {history.map(items => (

                <div className="history_page-detail11" key={items._id}>
                    <div className="history_page-detail11-ID">
                        <i className="fa-solid fa-barcode"></i>
                        <span>{items.paymentID}</span>
                    </div>
                    <div className="history_page-detail11-Date">
                        <i className="fa-solid fa-calendar"></i>
                        {new Date(items.createdAt).toLocaleDateString()}
                    </div>
                    <div className="history_page-detail11-delivery">
                       
                        <h3>{items.DeliveryStatus === false ? <div><i className="fa-regular fa-clock"></i>Pending</div> : <div> <i className="fa-solid fa-check"> </i>Ok</div>} </h3>
                    </div>
                    <div className="history_page-detail11-view">
           
                        <Link to={`/history/${items._id}`} style={{ textDecoration: 'none',fontSize:"20px",fontWeight:"bold" }}>View</Link>
                    </div>
                </div>
            ))
            }
        </div>

    );
};

export default History;