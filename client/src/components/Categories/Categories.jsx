
import React, { useEffect, useState } from 'react'
import "./Categories.css"
import useCustomRouter from '../../hooks/useCustomeRouter';
import axios from "../../axios/axios"
import useQuery from '../../hooks/useQuery';

const Categories = ({sort , page,search}) => {
    const [categories,setCategories] = useState([])
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
            <div className="category_type">
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Laptop Gaming</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Laptop Officer</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Laptop Dell</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Laptop Asus</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Laptop MSI</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Macbook</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Laptop sales</a>
                </div>
                <div className="category_type-detail">
                    <i class="fa-solid fa-laptop"></i>
                    <a href="">Hot</a>
                </div>
            </div>
    </div>
  )
}

export default Categories;  