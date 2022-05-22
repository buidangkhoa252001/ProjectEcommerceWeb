import React, { useState } from 'react';
import "./login.css"
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../api/LoginApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordT, setPasswordT] = useState("password")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user } = useSelector(state => state.user);                                            
    const { isFetching } = useSelector(state => state.login)
    const handleSubmit = (e) => {
        e.preventDefault()
        login(dispatch, { email, password })
        setTimeout(()=>{
                navigate("/products", { replace: true });
        },1500)
      
    }
    const handleEye=()=>{
        console.log(passwordT)
        if(passwordT=="password"){
        setPasswordT("text");
        }
        else{
        setPasswordT("password");
        }
        }
        
    return (
        <div className='box1'>
            <div className="box_2">
                <form className='login' onSubmit={handleSubmit} >
                    <div className="login_detail">
                        <div className="login_deatil_back-home">
                            <div className="login_deatil_back-home-title">
                                <span><i className="fa-solid fa-circle"></i></span>
                                <h2>LALA TEAM<i className="fa-solid fa-circle"></i></h2>
                            </div>
                            <div className="login_deatil_back-home-btn">
                                <Link to="/products" style={{ textDecoration: 'none' }}><h3 className="login_Home">Home</h3></Link>
                            </div>
                        </div>
                        <div className="login_detail-title">
                            <h2>login and  buy</h2>
                            <h1>Welcome our website<span><i className="fa-solid fa-circle"></i></span></h1>
                            <p>Register Now? <Link to="/register" style={{ textDecoration: 'none', color: '#1f74c1' }}>Sign up</Link></p>
                        </div>
                        <div className="login_detail_input">
                            <input type="email" required placeholder=' ' onChange={e => setEmail(e.target.value)}></input>
                            <label>Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="login_detail_input">
                            <input type="password" required placeholder=' ' onChange={e => setPassword(e.target.value)} ></input>
                            <label>Password</label>
                            <i onClick={()=> handleEye()} className="fa-solid fa-eye eye"></i>
                        </div>
                        <div className="login_detail-record">
                            <button  >Login</button>
                        </div>
                    </div>
                    <div className="login_image">

                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;