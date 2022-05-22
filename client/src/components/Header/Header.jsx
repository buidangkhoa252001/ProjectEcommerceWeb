import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./header.css";
import Cart from "./icon/cart.svg"
import Close from "./icon/close.svg"
import Menu from "./icon/menu.svg"

import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../api/LoginApi';
import Modal from '../Modal/Modal';
import SearchForm from '../SearchForm/SearchForm';
import FilterForm from '../Filter/FilterForm';

const Header = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.login);
    const { user } = useSelector(state => state.user);
    const { cart } = useSelector(state => state.cart)
    const [cart1, setCart1] = useState([])
    const [admin, setAdmin] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [on, setOn] = useState(false)
    const logoutUser = async () => {
        setOn((on) => !on);
        logOutUser(dispatch)
        window.location.href = "/";
    };
    useEffect(() => {
        if (cart && isAuth) {
            setCart1(cart)
        }
        if (user.role === 1) {
            setAdmin(true)
        }
    }, [user, isAuth, cart])
    const handLogged = () => {
        setOn((on) => !on);
    }
    const loggedRouter = () => {
        return (
            <>
                <div className="header_profile">
                    <div className="avatarheader" onClick={handLogged}><img src={user.avatar} /></div>
                    <div className={`header_profile-detail ${on ? "active" : ""}`}>

                        <Link to="/profile" onClick={handLogged} style={{ textDecoration: "none", cursor: "pointer" }} ><li>Profile</li></Link>
                        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }} onClick={logoutUser}><li>Logout</li></Link>

                    </div>
                </div>
                {
                    openSearch &&
                    <Modal titleTxt="Search" setOpen={setOpenSearch}>
                        <SearchForm />
                    </Modal>
                }
                {
                    openFilter &&
                    <Modal titleTxt="Filter" setOpen={setOpenFilter}>
                        <FilterForm />
                    </Modal>
                }
            </>
        )
    }
    const userRouter = () => {
        return (
            <>
                <div className="header_detail-product">
                    <li><Link style={{ textDecoration: "none" }} to="/products">Shop</Link></li>
                </div>
                <div className="header_detail-history">
                    <li><Link style={{ textDecoration: "none" }} to="/history">History</Link></li>
                </div>
                <div className="header_detail-history">
                    <li><Link style={{ textDecoration: "none" }} to="/aboutus">AboutUs</Link></li>
                </div>
                <div className="header_detail-search">
                    <li onClick={() => setOpenSearch(true)}>Search</li>
                </div>
                <div className="cart-icon">
                    {cart ? <span>{cart.length}</span> : <span>0</span>}
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
                {/*  <li onClick={() => setOpenFilter(true)}>Filter </li> */}
                {
                    openSearch &&
                    <Modal titleTxt="Search" setOpen={setOpenSearch} >
                        <SearchForm />
                    </Modal>
                }
                {
                    openFilter &&
                    <Modal titleTxt="Filter" setOpen={setOpenFilter}>
                        <FilterForm />
                    </Modal>
                }
            </>
        )
    }
    const adminRouter = () => {
        return (
            <>
                <div className="header_detail-product">
                    <li><Link style={{ textDecoration: "none" }} to="/productTable">Product</Link></li>
                </div>
                <div className="header_detail-product-admin">
                    <li><Link style={{ textDecoration: "none" }} to="/createProduct">Create Product</Link></li>
                </div>
                <div className="header_detail-cate-admin">
                    <li><Link style={{ textDecoration: "none" }} to="/createCategory">Categories</Link></li>
                </div>
                <div className="header_detail-payment-admin">
                    <li><Link style={{ textDecoration: "none" }} to="/payment">All Orders</Link></li>
                </div>
                <div className="header_detail-payment-admin">
                    <li><Link style={{ textDecoration: "none" }} to="/alluser">All User</Link></li>
                </div>
            </>
        )
    }

    return (
        <header>
            <div className="menu" >
                <img src={Menu} alt="" width="30px" />
            </div>
            <div>
                <h1>
                    <Link style={{ textDecoration: "none" }} to="/">{admin ? 'Admin' : 'User'}</Link>
                </h1>

            </div>
            <div className="header_detail">

                {admin && adminRouter()}
                {!admin && isAuth && userRouter()}
                {

                    isAuth ? loggedRouter() :

                        <div className="header_login-register">
                            <div className="header_detail-product">
                                <li><Link style={{ textDecoration: "none" }} to="/products">Shop</Link></li>
                            </div>
                            <div className="header_detail-login-register">
                                <Link to="/login" style={{ textDecoration: "none" }}><li className="header_login"><ion-icon name="log-out-outline"></ion-icon>Login</li></Link>
                                <Link to="/register" style={{ textDecoration: "none" }}><li className="header_register">Register</li></Link>
                            </div>
                        </div>
                }

            </div>


        </header>
    );
}



export default Header;