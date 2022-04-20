import axios from '../../axios/axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./detailProduct.css"

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { addCart } from '../../redux/userSlice';
import { getUser } from '../../api/UserApi';
import ProductItem from '../../components/ProductItem/ProductItem';




const DetailProduct = () => {
    const [product,setProduct]=useState([])
    const [image,setImage]=useState("")
    const params = useParams()
    const navigate = useNavigate();
/*     const [productCategory,setProductCategory]= useState([])
    const [category,setCategory]= useState([]) */
    const dispatch = useDispatch();
	const { currentToken,isAuth } = useSelector(state => state.login);

  const {cart} = useSelector(state => state.cart)
  const [cart1,setCart1] = useState([])

  useEffect(()=>{
        const getProductDetail = async()=>{
            try{
                const res = await axios.get(`/api/products/${params.id}`)
                setProduct(res.data)
                setImage(res.data.images.url)
                
            }catch(err){
                console.log(err)
            }
        }
        getProductDetail()  
        
        
    },[params.id])
        useEffect(()=>{
            setCart1(cart)
        /*     setCategory(product.category) */
        },[cart])
       /*   useEffect(()=>{
             if(category){
                 const getcategory=async()=>{
                  const res = await axios.get(`/api/products?category=${category}`)
                 console.log(res.data)
                 setProductCategory(res.data)
                 console.log(productCategory)
                    
              }
              getcategory()
              console.log(productCategory)

             }
      
    },[category,product,params.id]) */

   const handleaddCart = async(product1)=>{
  
    if(!isAuth){
        navigate("/login", { replace: true })
        return alert("Please login to continue buy")
    }
    const check = cart1.every(item=>{
        return item._id !== product1._id 
    })
    if(check){
        setCart1([...cart1,{...product1,quantity:1}])
        
        await axios.patch('/user/addcart',{cart:[...cart1,{...product1,quantity:1}]},{
            headers:{Authorization:currentToken.accesstoken}
        })
        dispatch(addCart(cart1))
        getUser(dispatch,currentToken.accesstoken)
        navigate("/cart", { replace: true })
        
    }else{
        alert("this product has been add")

    }
    console.log(product)
    console.log(cart1)
}   
    const handleBuy = async(product)=>{
        handleaddCart(product)
    } 
 
    return (
        <div>
           
             <div className="detail1">
                <div>
                  <img src={image} alt=""  />
                </div>

                <div className="box-detail1">
                    <div className="row">
                        <h2>{product.title} </h2>
                        <h6>#id: {product.product_id}</h6>
                    </div>
                        <span>$ {product.price}</span>
                        <p>{product.description}</p>
                        <p>{product.content}</p>
                        <p>Sold: {product.sold}</p>
                        <button to="/cart" className="cart1" onClick={()=>handleBuy(product)}
                    >
                            Buy Now
                        </button>
                </div>
            </div>
            <div>
                <h2>Related products</h2>
            <div className="products">
                   {/*  {
                        productCategory.map(product=>{
                            
                         <ProductItem   product={product} /> 
                        })
                    } */}

                </div>
            </div>

      
        </div>
    );
}
 
export default DetailProduct;