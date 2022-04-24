import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import "./products.css"


const Products = React.memo(({ products }) => {


    return (
        <div className="container">
            <h1 className="heading">
                <span>p</span>
                <span>r</span>
                <span>o</span>
                <span>d</span>
                <span>u</span>
                <span>c</span>
                <span>t</span>
                <span>s</span>
            </h1>

            <div className="wrapper">
                {
                    products ? products.map(product =>
                        (<ProductItem key={product._id} product={product} />)
                    )
                        :
                        <h1 className="text">Dont have the product</h1>
                }

            </div>

        </div>
    );
})


export default Products;