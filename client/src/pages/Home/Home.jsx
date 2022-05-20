import React, { useEffect, useState } from 'react';
import Slider1 from '../../components/Slider/Slider';
import "./home.css";
import axios from  "../../axios/axios"
import ProductItem from '../../components/ProductItem/ProductItem';


function Home() {
    const [products,setProducts] =useState([])
        useEffect(()=>{
            try{
                const getnewproduct = async()=>{
                    const res = await axios.get(`/api/products?sort=-createdAt`)
                    setProducts(res.data.products.slice(0,4))
                }
                getnewproduct()
            }
            catch(err){
                console.log(err)
            }
        },[])

        return (
           <div className="home">
               <Slider1/>
               <div className="topsale">
               <h1 className="ribbon">
                <strong className="ribbon-content">New Product</strong>
               </h1>

               </div>
                   <div className="product">
                   {
                    products ? products?.map(product =>
                        (<ProductItem key={product._id} product={product} />)
                    )
                        :
                        <h1 className="text">Dont have the product</h1>
                }

                   </div>
           </div>
        );
    }


export default Home;