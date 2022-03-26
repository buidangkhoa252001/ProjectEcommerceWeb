import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import "./products.css"

 
const Products = React.memo(({products}) => {
    
        
    return (
         <div className="container">
            
        <div className="wrapper">
            {
                products ? products.map(product=>
                    (<ProductItem key={product._id} product={product}  />)  
                  )
                  :
                  <h1 className="text">dont have the product</h1>
            }
         
        </div>
     
        </div>
    );
})
 

export default Products;