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
      const {cart} = useSelector(state=>state.cart)
      const [cart1,setCart1] = useState([])
      const [admin,setAdmin] =useState(false)
      const [openSearch, setOpenSearch] = useState(false)
      const [openFilter, setOpenFilter] = useState(false)
     const logoutUser = async () =>{
        logOutUser(dispatch)
        window.location.href = "/";
    }; 
    useEffect(()=>{
        if(cart&&isAuth){
            setCart1(cart)
        }
        if(user.role===1){
          setAdmin(true)
        }
    },[user,isAuth,cart])
    const loggedRouter = () =>{
      return(
          <>
      
              <li><Link to="/" style={{ textDecoration: "none" , cursor: "pointer" }}  onClick={logoutUser}>Logout</Link></li>
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
  const userRouter=()=>{
    return(
        <>
            <li><Link style={{ textDecoration: "none" }} to="/history">History</Link></li>
            <li onClick={() => setOpenSearch(true)}>Search</li>
            <li onClick={() => setOpenFilter(true)}>Filter </li>
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
  const adminRouter = () =>{
      return(
          <>
              <li><Link style={{ textDecoration: "none" }} to="/createProduct">Create Product</Link></li>
              <li><Link style={{ textDecoration: "none" }} to="/createCategory">Categories</Link></li>
              <li><Link style={{ textDecoration: "none" }} to="/payment">All Payment</Link></li>
          </>
      )
  }
    return (
        <header>
           <div className="menu" >
                <img src={Menu} alt=""  width="30px"/>
            </div>
            <div>
                <h1>
                <Link style={{ textDecoration: "none" }} to="/">{admin ? 'Admin' : 'User'}</Link>
                </h1>

            </div>
            <ul>
            <li><Link style={{ textDecoration: "none" }} to="/products">{admin ? 'Products' : 'Shop'}</Link></li>

        {admin && adminRouter()}
        {!admin && isAuth && userRouter()}
        {
            isAuth ? loggedRouter() : <li><Link to="/login">Login ✥ </Link> <Link to="/register"> Register</Link>  
                       
            </li>
                                      
        }
                <li>
                    <img src={Close} alt=""  width="30px" className="menu"/>
                </li>
            </ul>
            {
                admin ? '' 
                :<div className="cart-icon">
                   {cart ?<span>{cart.length}</span>  : <span>0</span>} 
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
         
        </header>
    );
}
 

 
export default Header;