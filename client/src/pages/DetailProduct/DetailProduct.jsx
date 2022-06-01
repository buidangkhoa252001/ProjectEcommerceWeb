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
    const [product, setProduct] = useState([])
    const [image, setImage] = useState("")
    const params = useParams()
    const navigate = useNavigate();
        const [productCategory,setProductCategory]= useState([])
        const [category,setCategory]= useState([])
    const dispatch = useDispatch();
    const { currentToken, isAuth } = useSelector(state => state.login);

    const { cart } = useSelector(state => state.cart)
    const [cart1, setCart1] = useState([])

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const res = await axios.get(`/api/products/${params.id}`)
                setProduct(res.data)
                setImage(res.data.images.url)
                console.log(product)
            } catch (err) {
                console.log(err)
            }
        }
        getProductDetail()


    }, [params.id])
    useEffect(() => {
        setCart1(cart)
     
        setCategory(product.category)
    }, [cart])
      useEffect(()=>{
          if(category){
              console.log(category)
              const getcategory=async()=>{
               const res = await axios.get(`/api/products?category=${category}`)
              console.log(res.data)
              setProductCategory(res.data)
              console.log(productCategory)
                 
           }
           getcategory()
           console.log(productCategory)

          }
   
 },[category,product,])

    const handleaddCart = async (product1) => {

        if (!isAuth) {
            navigate("/login", { replace: true })
            return alert("Please login to continue buy")
        }
        const check = cart1.every(item => {
            return item._id !== product1._id
        })
        if (check) {
            setCart1([...cart1, { ...product1, quantity: 1 }])

            await axios.patch('/user/addcart', { cart: [...cart1, { ...product1, quantity: 1 }] }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            dispatch(addCart(cart1))
            getUser(dispatch, currentToken.accesstoken)
            navigate("/cart", { replace: true })

        } else {
            alert("this product has been add")

        }
        console.log(product)
        console.log(cart1)
    }
    const handleBuy = async (product) => {
        handleaddCart(product)
    }

    return (
        <div className="detail_product">
            <div className="detail_product-container">
                <div className="detail_product-title">
                    <h2>{product.title}</h2>
                    <ion-icon name="happy-outline"></ion-icon>
                </div>
                <div className="detail_product-line"></div>
                <div className="detail_product-layout">
                    <div className="box-detail_1">
                        <div className="box-detail_img">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className="box-detail_2">
                        <div className="box-detail_sold">
                            <h2>Sold: <span>{product.sold}</span></h2>
                        </div>
                        <div className="box-detail_price">
                            $<span> {product.price}.00</span>
                        </div>
                        <div className="box-detail_buy">
                            <button to="/cart" className="box-detail_title-btn-buy" onClick={() => handleBuy(product)}>
                                Buy Now <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    
                    </div>
                </div>
                <div className="box-detail_title-script">
                    <span>Discription</span>
                    <p>{product.description}</p>
                </div>
            </div>
            {/* <div className="detail">
                <div className="box-detail">
                    <div class="box-detail_img">
                        <div className="box-detail_img-set">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className="box-detail_title">
                        <h1>{product.title} </h1>
                        <span>#id: {product.product_id}</span>
                        <div className="box-detail_title-price">
                            <p>$</p>
                            <span>{product.price}</span>
                        </div>
                        <div className="box-detail_title-sold">
                            <span>Sold: {product.sold}</span>
                        </div>
                        <div className="box-detail_title-script">
                            <span>Discription:</span>
                        </div>
                        <p>{product.description}</p>
                        <div className="box-detail_title-buy">

                            <button to="/cart" className="box-detail_title-btn-buy" onClick={() => handleBuy(product)}>
                                Buy Now
                            </button>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                </div>
            </div>
 */}
        </div>
    );
}

export default DetailProduct;