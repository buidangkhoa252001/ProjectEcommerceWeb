import React, { useState } from 'react';
import "./login.css"
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../api/LoginApi';
import { getUser } from './../../api/UserApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
 
const Login = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isFetching,error,currentToken} =useSelector(state=>state.login)
    const handleSubmit = (e)=>{
        e.preventDefault()
        login(dispatch,{email,password})
        navigate("/products", { replace: true });

    }
    return (
        <div className='box'>
           
            <form className='login' onSubmit={handleSubmit} >
                <h1>Login</h1>
                <input type="email" required  placeholder='email'  onChange={e=>setEmail(e.target.value)}></input>
                <input type="password" required placeholder='password'  onChange={e=>setPassword(e.target.value)} ></input>   
                <button disabled={isFetching} >Login</button>
                <Link to="/products"><h1>Go back</h1></Link>
            </form>
        </div>
    );
}
 
 
export default Login;