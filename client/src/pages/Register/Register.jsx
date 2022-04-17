import React, { useState } from 'react';

import "./register.css"
import { useNavigate } from 'react-router-dom';

import axios from "../../axios/axios"

const Register = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [name,setName]= useState("")
    const navigate = useNavigate()

    const registerSubmit = async(e) =>{
        e.preventDefault()
        try {
            console.log({email,password})
            await axios.post('/user/register', {name,email,password})
            
            alert("register success")
            console.log("register")
            navigate("/login", { replace: true });
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="box">
            <form className="register"  onSubmit={registerSubmit}>
                <h1>Register</h1>
                <input type="text" required  placeholder='name'  onChange={e=>setName(e.target.value)}></input>
                <input type="text" required  placeholder='email'  onChange={e=>setEmail(e.target.value)}></input>
                <input type="password" required placeholder='password'  onChange={e=>setPassword(e.target.value)} ></input>
                <button >Register</button>
            </form>
        </div>
    );
}
 
export default Register;