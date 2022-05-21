import React from 'react';
import axios from '../../axios/axios';
import "./productItemTable.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { addCart } from '../../redux/userSlice';
import { getUser } from '../../api/UserApi';
const ProductItem = ({ product }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { currentToken, isAuth } = useSelector(state => state.login);
    const { cart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const [cart1, setCart1] = useState([])
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
    useEffect(() => {
        setCart1(cart)
    }, [cart])
    const handleBuy = async (product) => {
        handleaddCart(product)
    }
    const handleDelete = async (id, images) => {
        try {
            /* setLoading(true) */
            const destroyImg = axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: currentToken.accesstoken }
            })

            await destroyImg
            await deleteProduct
            window.location.reload(true);
            getUser(dispatch, currentToken.accesstoken)
            /*   setLoading(false) */
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const adminButton = () => {
        return (
            <>

                <Link to={`/createProduct/${product._id}`}> <button to="/cart" className="product_button_detail-edit" >Edit</button></Link>
                <button className="product_button_detail-delete" onClick={() => handleDelete(product._id, product.images)} >Delete</button>
            </>
        )
    }
    const userButton = () => {
        return (
            <>
                
                <button to="/cart" className="product_button_buy" onClick={() => handleBuy(product)}><i className="fa-solid fa-cart-shopping"></i> Add to Cart</button>

            </>
        )
    }
    return (
        <div className="product_table">
            <div className="product_table-detail">
                <div className="product_table-detail-img">
                    <Link to={`/products/${product._id}`}>
                        <img src={product.images.url} alt="" />
                    </Link>
                </div>
                <div className="product_table-detail_title">{product.title}</div>
                <div className="product_table-detail_description">{product.description}</div>
                <div className="product_table-detail_category">{product.category}</div>
                <div className="product_table-detail_price"><i className="fa-solid fa-dollar-sign"></i>{product.price}</div>
                <div className="product_table-detail_button">
                    {user.role === 1 && adminButton()}
                    {user.role !== 1 && userButton()}
                </div>

            </div>
        </div>
    );
}


export default ProductItem;