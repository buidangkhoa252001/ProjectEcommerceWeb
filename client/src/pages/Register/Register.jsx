import React, { useState } from 'react';

import "./register.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "../../axios/axios"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const registerSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { name, email, password })

            alert("register success")
            console.log("register")
            navigate("/login", { replace: true });
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="box1">
            <div className="box_3">
                <form className="register" onSubmit={registerSubmit}>
                    <div className="register_detail">
                        <div className="register_deatil_back-home">
                            <div className="register_deatil_back-home-title">
                                <span><i className="fa-solid fa-circle"></i></span>
                                <h2>LALA TEAM<i className="fa-solid fa-circle"></i></h2>
                            </div>
                            <div className="register_deatil_back-home-btn">
                                <Link to="/products" style={{ textDecoration: 'none' }}><h3 className="register_Home">Home</h3></Link>
                            </div>
                        </div>
                        <div className="register_detail-title">
                            <h2>start for free</h2>
                            <h1>Create new account<span><i className="fa-solid fa-circle"></i></span></h1>
                            <p>Already now? <Link to="/login" style={{ textDecoration: 'none', color: '#1f74c1' }}>Login</Link></p>
                        </div>
                        <div className="register_detail_input">
                            <input type="text" required placeholder=' ' onChange={e => setName(e.target.value)}></input>
                            <label>Name</label>
                            <i className="fa-solid fa-file-signature"></i>
                        </div>
                        <div className="register_detail_input">
                            <input type="text" required placeholder=' ' onChange={e => setEmail(e.target.value)}></input>
                            <label>Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="register_detail_input">
                            <input type="password" required placeholder=' ' onChange={e => setPassword(e.target.value)} ></input>
                            <label>Password</label>
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <div className="register_detail-record">
                            <input type="reset" value={"change method"} />
                            <button >Register</button>
                        </div>
                    </div>
                    <div className="register_image">

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;