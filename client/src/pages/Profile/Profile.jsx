import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../../axios/axios"
import Loading from '../../utils/Loading/Loading'
import { getUser } from '../../api/UserApi';
import "./Profile.css";
/* import {isLength, isMatch} from '../../utils/validation/Validation' */
/* import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction' */

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Profile() {
    const [data, setData] = useState(initialState)
    const { currentToken } = useSelector(state => state.login)
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handlechangeAvatar = async (e) => {

        e.preventDefault()
        try {

            /* if(user.role!==1) return alert("you are not admin") */
            const file = e.target.files[0]

            if (!file) return alert("file is not exist!")
            if (file.size > 1024 * 1024) return alert("Size is too large")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File is not the image")
            let formData = new FormData()
            formData.append('file', file);
            setLoading(true)
            const res = await axios.post("/api/upload", formData, {
                headers: { "content-type": "multipart/form-data", Authorization: currentToken.accesstoken }
            })
            setLoading(false)
            setAvatar(res.data.url)
        }
        catch (err) {
            alert(err.respone.data.msg)
        }
    }
    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: data.name ? data.name : user.name,
                avatar: avatar ? avatar : user.avatar
            }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            alert("update all success")
            getUser(dispatch, currentToken.accesstoken)
            navigate("/", { replace: true })

            /* setData({...data, err: '' , success: "Updated Success!"}) */
        } catch (err) {
            alert("update fail")
            /* setData({...data, err: err.response.data.msg , success: ''}) */
        }
    }

    const updatePassword = () => {
        if(data.password.length < 6) {
            alert("Password greater than 6")
        }
        else if(data.password !== data.cf_password) {
            alert("Password did not match")

        }
        else{
            try {
                axios.post('/user/reset', { password: data.password }, {
                    headers: { Authorization: currentToken.accesstoken }
                })
                alert("update password successful")
                getUser(dispatch, currentToken.accesstoken)
                /* setData({...data, err: '' , success: "Updated Success!"  }) */
            } catch (err) {
                setData({ ...data, err: err.response.data.msg, success: '' })
            }
        }
    }

    const handleUpdate = () => {
        if (data.name || data.avatar) updateInfor()
        if (data.password) updatePassword()
        getUser(dispatch, currentToken.accesstoken)
    }
    const handleDelete = async (e) => {

        /*  e.preventDefault()
         try{
          
             setLoading(true)
             await axios.post("/api/destroy",{public_id:images.public_id},{
                 headers:{Authorization:currentToken.accesstoken}
             })
             setLoading(false)
             setImages(false)
            
         }
         catch(err){
             alert(err.respone.data.msg)
         } */

    }


    /*  const handleDelete = async (id) => {
         try {
             if(user._id !== id){
                 if(window.confirm("Are you sure you want to delete this account?")){
                     setLoading(true)
                     await axios.delete(`/user/delete/${id}`, {
                         headers: {Authorization: token}
                     })
                     setLoading(false)
                     setCallback(!callback)
                 }
             }
             
         } catch (err) {
             setData({...data, err: err.response.data.msg , success: ''})
         }
     } */

    return (
        <>
            <div>
            </div>
            <div className="profile_page">
                <div className="col-left">
                    {
                        loading ? <Loading />
                            :
                            <div className="avatar">
                                <img src={avatar ? avatar : user.avatar} alt="" />
                                <span>
                                    <i className="fas fa-camera"></i>
                                    <p>Change</p>
                                    <input type="file" name="file" id="file_up" onChange={handlechangeAvatar} />
                                    <span onClick={handleDelete}>X</span>
                                </span>
                            </div>

                    }
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

export default Profile