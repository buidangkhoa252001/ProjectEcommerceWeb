import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./register.css"

import { axios } from 'axios';
 
const Register = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

 
    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {email,password})
           
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="box">
            <form className="register"  onSubmit={registerSubmit}>
                <h1>Register</h1>
                <input type="text" required  placeholder='email'  onChange={e=>setEmail(e.target.value)}></input>
                <input type="password" required placeholder='password'  onChange={e=>setPassword(e.target.value)} ></input>
                <button>Register</button>
            </form>
        </div>
    );
}
 
export default Register;