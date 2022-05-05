import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "../../axios/axios"
import Loading from '../../utils/Loading/Loading'
import { getUser } from '../../api/UserApi';
import "./updateUser.css"

const initialState = {
    name: '',
    password: '',
    cf_password: '',

}

function UpdateUser() {
    const [data, setData] = useState(initialState)
    const { currentToken } = useSelector(state => state.login)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(false)
    const { allUser } = useSelector(state => state.alluser)
/*     const { user } = useSelector(state => state.user) */
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    useEffect(()=>{
        console.log(params)
        /* allUser.map(user=> {
            if(user._id=params){
                setUser(user)
            }
        }
       
     )
     console.log(user) */
        try{
            const gg= async()=>{
                const res = await axios.get(`/user/getUser/${params.id}`, {
                    headers:{Authorization:currentToken.accesstoken}
                })
                console.log(res)
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
            axios.patch('/user/update', {
                name: data.name ? data.name : user.name,
            }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            alert("update all success")
            getUser(dispatch, currentToken.accesstoken)
            navigate("/", { replace: true })

        } catch (err) {
            alert("update fail")
        }
    }

    const updatePassword = () => {
        if (data.password.length < 6) {
            alert("Password greater than 6")
        }


        if (data.password !== data.cf_password) {
            alert("Password did not match")

        }
        try {
            axios.post('/user/reset', { password: data.password }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            alert("update password successful")
            getUser(dispatch, currentToken.accesstoken)
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const handleUpdate = () => {
        if (data.name || data.avatar) updateInfor()
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
                            <input type="text" name="name" id="name" defaultValue={user.name}
                                placeholder=' ' onChange={handleChange} />
                            <label htmlFor="name">Name</label>
                            <i className="fa-solid fa-file-signature"></i>
                        </div>

                        <div className="form-group">
                            <input type="email" name="email" id="email" defaultValue={user.email}
                                placeholder=' ' disabled />
                            <label htmlFor="email">Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" id="password"
                                placeholder=' ' value={data.password} onChange={handleChange} />
                            <label htmlFor="password">New Password</label>
                            <i className="fa-solid fa-eye"></i>
                        </div>

                        <div className="form-group">
                            <input type="password" name="cf_password" id="cf_password"
                                placeholder=' ' value={data.cf_password} onChange={handleChange} />
                            <label htmlFor="cf_password">Confirm New Password</label>
                            <i className="fa-solid fa-eye"></i>
                        </div>

                        <div className="profile_detail-record">
                            <input type="reset" value={"change method"} />
                            <button disabled={loading} onClick={handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
              
            </div>
        </>
    )
}

export default UpdateUser