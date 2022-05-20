
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllUser.css'
import axios from "../../axios/axios"
import { getUser } from '../../api/UserApi';
const AllUser = () => {
    const { currentToken } = useSelector(state => state.login);
   const {allUser} = useSelector(state => state.alluser);
   const dispatch = useDispatch()
    console.log(allUser)

    const handleDelete=async(id,role)=>{
        if(window.confirm("Do you want to delete this product?")){
            if(role==1){
                alert("can not delete the admin ")
            }
            else{
                try {
                    await axios.delete(`/user/delete/${id}`, {
                        headers: { Authorization: currentToken.accesstoken }
                    })
                    alert("delete user success")   
                    getUser(dispatch, currentToken.accesstoken)
                }
                catch (err) {
                    console.log(err)
                }
            }

        }
    }
    return (
        <div className="history_page">
            <div className="history_page-logo">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <h2>User</h2>
            </div>
            <div className="history_page_total-product">
                <h3>Finalized <i className="fa-solid fa-caret-up"></i></h3>
                <h3>Total User: {allUser.length}</h3>
            </div>
            <div className="history_page_title-detail">
                <h3>User ID <i className="fa-brands fa-airbnb"></i></h3>
                <h3>Email<i className="fa-brands fa-airbnb"></i></h3>
                <h3><i className="fa-solid fa-file-circle-check"></i></h3>
            </div>
            {allUser?.map(user => (
                <div className="history_page-detail1" key={user._id}>
                    <div className="history_page-detail1-ID">
                        <span>{user._id}</span>
                    </div>
                    <div className="history_page-detail1-Date">
                        <i className="fa-solid fa-calendar"></i> {user.email}
                    </div>
                    <div className="history_page-detail1-view">
                        {/* <i className="fa-solid fa-check"></i> */}

                        <Link to={`/update/${user._id}`}> <button className="edit_button" ><i class="fa-solid fa-pen"></i>Edit</button></Link>
                        <button onClick={() => handleDelete(user._id,user.role)} className="delete_button"><i class="fa-solid fa-trash"/>delete</button>
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default AllUser;