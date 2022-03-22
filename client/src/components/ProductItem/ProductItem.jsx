import React from 'react';
import { Link } from 'react-router-dom';
import "./productItem.css"
 
const ProductItem = ({product}) => {
    return (
        <div className="product_card">
            
                <img src={product.images.url} alt="" />
            
            <div>
                 <h1 className="product_title">{product.title}</h1>
                 <div className="product_price">Price:${product.price}</div>
                 <div className="product_description">Desc:{product.description}</div>
                 <div className="product_button">

                    <button className="product_button_buy">Buy</button>
                    <Link to={`/products/${product._id}`}> <button className="product_button_view">view</button></Link>
                 </div>
            </div>
        </div>
    );
}
 

export default ProductItem;