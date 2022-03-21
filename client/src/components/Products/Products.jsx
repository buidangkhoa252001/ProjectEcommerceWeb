import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import "./products.css"

 
const Products = React.memo(({products}) => {
   
 
    return (
         <div className="container">
            
        <div className="wrapper">
            {
                products.map(product=>
                  (<ProductItem key={product._id} product={product}  />)  
                )
            }
        </div>
     
        </div>
    );
})
 

export default Products;