import React, {useState, useEffect, useContext} from 'react'
import "./CreateCategories.css"
import { getUser } from '../../api/UserApi';
import axios from "../../axios/axios"
import { useDispatch, useSelector } from 'react-redux';

const CreateCategories = () => {
    const { currentToken } = useSelector(state => state.login);
    /* const [categories,setCategories] = state.categoriesAPI.categories */
    const {categories} = useSelector(state=>state.categories)
    const [category,setCategory]=useState("")
    const [onEdit,setOnEdit]=useState(false)
    const [id,setID]=useState("")
    const dispatch = useDispatch();
    const createCategory=async(e)=>{
      e.preventDefault()
      try{
        if(onEdit){
          const res = await axios.put(`/api/category/${id}`,{name:category},{
            headers:{Authorization:currentToken.accesstoken}
          })
          alert(res.data.msg)
        }else{
          const res = await axios.post("/api/category",{name:category},{
            headers:{Authorization:currentToken.accesstoken}
          })
          alert(res.data.msg)
        }
       
        setOnEdit(false)
        setCategory("")
        getUser(dispatch,currentToken.accesstoken)      
        
      }catch(err){
        alert(err.response.data.msg)
      }
    }
    const editCategory= async(id,name)=>{
      
      try{
        setID(id)
        setCategory(name)
        setOnEdit(true)
        getUser(dispatch,currentToken.accesstoken)      
      }
      catch(err){
        alert(err.response.data.msg)
      }
    }
    const deleteCategory = async(id)=>{
      try{
        const res = await axios.delete(`/api/category/${id}`,{
          headers:{Authorization:currentToken.accesstoken}
        })
        alert(res.data.msg)
        getUser(dispatch,currentToken.accesstoken)      
    
      }
      catch(err){
        alert(err.response.data.msg)
      }
    }


    return (
        <div className="categories">
        <form onSubmit={createCategory}>
            <label htmlFor="category">Category</label>
            <input type="text" name="category" value={category} required
            onChange={e => setCategory(e.target.value)} />
    
            <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>
        
        <div className="col">
                    {
                        categories.map(category => (
                            <div className="row1" key={category._id}>
                                <p>{category.name}</p>
                                <div>
                                    <button onClick={()=> editCategory(category._id,category.name)}>Edit</button>
                                    <button onClick={()=> deleteCategory(category._id)} >Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
      )
}
export default CreateCategories