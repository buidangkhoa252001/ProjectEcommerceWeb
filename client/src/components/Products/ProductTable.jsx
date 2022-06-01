import React from 'react';
import ProductItem from '../ProductItem/ProductItemTable';
import "./productTable.css"


const ProductTable = React.memo(({ products }) => {
        console.log(products)

    return (
         <div className="container">

            <div className="wrapper1">
                <div className="product_table-title">
                    <h3>Image</h3>
                    <h3>Name</h3>
                    <h3>Desciption</h3>
                    <h3>Category</h3>
                    <h3>Price</h3>
                    <h3><ion-icon name="create-outline"></ion-icon></h3>
                </div>
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


export default ProductTable;