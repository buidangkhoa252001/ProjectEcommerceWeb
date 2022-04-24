
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
                <h2>History</h2>
            </div>
            <div className="history_page_total-product">
                <h3>Finalized <i className="fa-solid fa-caret-up"></i></h3>
                <h3>Total Product: {history.length}</h3>
            </div>
            <div className="history_page_title-detail">
                <h3>Payment ID <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Date of Purchased <i className="fa-brands fa-airbnb"></i></h3>
                <h3><i className="fa-solid fa-file-circle-check"></i></h3>
            </div>
            {history.map(items => (
                <div className="history_page-detail1" key={items._id}>
                    <div className="history_page-detail1-ID">
                        <i className="fa-solid fa-barcode"></i>
                        <span>{items.paymentID}</span>
                    </div>
                    <div className="history_page-detail1-Date">
                        <i className="fa-solid fa-calendar"></i>
                        {new Date(items.createdAt).toLocaleDateString()}
                    </div>
                    <div className="history_page-detail1-view">
                        <i className="fa-solid fa-check"></i>
                        <Link to={`/history/${items._id}`} style={{ textDecoration: 'none' }}>View</Link>
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default History;