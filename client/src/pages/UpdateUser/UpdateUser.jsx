import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "../../axios/axios"
import { getUser } from '../../api/UserApi';
import "./updateUser.css"

const initialState = {
    name: '',
    password: '',
}
function UpdateUser() {
    const [data, setData] = useState(initialState)
    const { currentToken } = useSelector(state => state.login)
    const [user, setUser] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    useEffect(()=>{
        console.log(params)
        try{
            const gg= async()=>{
                const res = await axios.get(`/user/getUser/${params.id}`, {
                    headers:{Authorization:currentToken.accesstoken}
                })
                setUser(res.data)
            }
            gg()
        }
        catch(err){
            console.log(err)
        }
    },[])
    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const updateInfor = () => {
        try {
            axios.patch(`/user/update/${params.id}`, {
                name: data.name ? data.name : user.name,
            }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            alert("update all success")
            getUser(dispatch, currentToken.accesstoken)
            navigate("/alluser", { replace: true })

        } catch (err) {
            alert("update fail")
        }
    }

    const updatePassword = () => {
        if (data.password.length < 6) {
            alert("Password greater than 6")
        }
        else{
            console.log(data.password)
            try {
               /*  axios.post(`/user/reset//${params.id}`, { password: data.password }, {
                    headers: { Authorization: currentToken.accesstoken }
                }) */
                alert("update password successful")
                getUser(dispatch, currentToken.accesstoken)
            } catch (err) {
                setData({ ...data, err: err.response.data.msg, success: '' })
            }

        }
    }

    const handleUpdate = () => {
        if (data.name) updateInfor()
        if (data.password) updatePassword()
        getUser(dispatch, currentToken.accesstoken)
    }
    return (
        <>
            <div>
            </div>
            <div className="profile_page">
                <div className="col-left">
                    <form className="update-profile" onSubmit={handleChange}>
                        <div className="form-group">
                            <input type="email" name="email" id="email" defaultValue={user.email}
                                placeholder=' ' disabled />
                            <label htmlFor="email">Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="form-group">
                            <input type="text" name="name" id="name" defaultValue={user.name}
                                placeholder=' ' onChange={handleChange} />
                            <label htmlFor="name">Name</label>
                            <i className="fa-solid fa-file-signature"></i>
                        </div>


                        <div className="form-group">
                            <input type="password" name="password" id="password"
                                placeholder=' ' value={data.password} onChange={handleChange} />
                            <label htmlFor="password">New Password</label>
                            <i className="fa-solid fa-eye"></i>
                        </div>

                        <div className="profile_detail-record">
                            <input type="reset" value={"change method"} />
                            <button  onClick={handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
              
            </div>
        </>
    )
}

export default UpdateUser