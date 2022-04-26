import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import axios from "../../axios/axios"
import Loading from '../../utils/Loading/Loading'
import { getUser } from '../../api/UserApi';
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
    const {currentToken} = useSelector(state => state.login)
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
   const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value})
    }

    const handlechangeAvatar = async(e)=>{

        e.preventDefault()
        try{
    
            /* if(user.role!==1) return alert("you are not admin") */
            const file= e.target.files[0]
           
            if(!file) return alert("file is not exist!")
            if(file.size> 1024*1024) return alert("Size is too large")
            if(file.type !== "image/jpeg" && file.type !== "image/png") return alert("File is not the image")
            console.log(file)
            let formData = new FormData()   
            formData.append('file',file);
            setLoading(true)
            const res = await axios.post("/api/upload",formData,{
                headers:{"content-type":"multipart/form-data",Authorization:currentToken.accesstoken}
            })
            console.log(res)
            setLoading(false) 
            setAvatar(res.data.url)
        }
        catch(err){
            alert(err.respone.data.msg)
        }
    }
    const updateInfor = () => {
        console.log("name:",data.name)
        console.log("avatar:",avatar)
        try {
            axios.patch('/user/update', {
                name: data.name ? data.name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: currentToken.accesstoken}
            })
            alert("update all success")
            /* setData({...data, err: '' , success: "Updated Success!"}) */
        } catch (err) {
            alert("update fail")
            /* setData({...data, err: err.response.data.msg , success: ''}) */
        }
    }

    const updatePassword = () => {
        console.log("passworduser",data.password)
        console.log("passwordusercf",data.cf_password)
        if(data.password.length<6 )
        {
            alert("Password greater than 6")
        }

            /* return setData({...data, err: "Password must be at least 6 characters.", success: ''}) */

        if(data.password !== data.cf_password){
            alert("Password did not match")

        }
           /*  return setData({...data, err: "Password did not match.", success: ''}) */
        try {
            axios.post('/user/reset', {password:data.password},{
                headers: {Authorization: currentToken.accesstoken}
            })  
            alert("successful")
            /* setData({...data, err: '' , success: "Updated Success!"  }) */
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        console.log("name:",data.name)
        console.log("avatar:",avatar)
    
        if(data.name || data.avatar) updateInfor()
        if(data.password) updatePassword()
        getUser(dispatch,currentToken.accesstoken)  
    }
    const handleDelete = async(e)=>{

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
          loading ? <Loading/> 
          :
                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={handlechangeAvatar} />
                        <span onClick={handleDelete}>X</span>
                    </span>
                </div>
               
         }
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Your name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={data.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={data.cf_password} onChange={handleChange} />
                </div>

                <div>
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>

                <button disabled={loading} onClick={handleUpdate}>Update</button>
            </div>

           {/*  <div className="col-right">
                <h2>{isAdmin ? "Users" : "My Orders"}</h2>

                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody> */}
                       {/*      {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            } */}
                    {/*     </tbody>
                    </table>
                </div>
            </div> */}
        </div>
        </>
    )
}

export default Profile