
import React, { useEffect, useState } from 'react'
import "./Categories.css"
import useCustomRouter from '../../hooks/useCustomeRouter';
import axios from "../../axios/axios"
import useQuery from '../../hooks/useQuery';
const Categories = ({sort , page}) => {
    const [categories,setCategories] = useState([])
    const [category, setCategory] = useState("")
    const { pushQuery } = useCustomRouter()
    
    const {data,loading,error} =useQuery(
        `/api/category`
     )
     useEffect(()=>{
         if(data){
             console.log("cate",data)
             setCategories(data)
         }
     })

     const handleCategory = (e)=>{
        setCategory(e.target.value)
        console.log(e.target.value)
      /*   pushQuery({page:1 , sort:sort ,category:category }) */

    }


  return (
    <div className='Categories'>
            <span>Filters: </span>
            <select name="category" onChange={handleCategory}>
                <option value="" > All Products 1231</option>
                {
                    categories.map(category=>(
                        <option value={category._id} key={category._id} >
                            {category.name}
                        </option>
                    ))
                }
            </select>
  
    </div>
  )
}

export default Categories