
import React, { useEffect, useState } from 'react'
import "./Categories.css"
import useCustomRouter from '../../hooks/useCustomeRouter';
import axios from "../../axios/axios"
import useQuery from '../../hooks/useQuery';

const Categories = ({sort , page,search}) => {
    const [categories,setCategories] = useState([])
    const [category, setCategory] = useState("")
    const { pushQuery } = useCustomRouter()
    
  
    useEffect(()=>{
        const getCategoryDetail = async()=>{
            try{
                const res = await axios.get(`/api/category`)
             
             setCategories(res.data)

            }catch(err){
                console.log(err)
            }
        }
         getCategoryDetail() 
      
     },[])

     const handleCategory = (e)=>{
        setCategory(e.target.value)
      
      /*   if(!category){
            pushQuery({page:1 , sort:sort,search:""})
        }
        else{ */
        if(e.target.value){
            pushQuery({page:1 , sort:sort,category:e.target.value})
        }
        else{
            pushQuery({page:1 , sort:sort,search:""})
        }

    }


  return (
    <div className='Categories'>
            <span>Filters: </span>
            <select name="category" onChange={handleCategory}>
                <option value=""  >All Products</option>
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