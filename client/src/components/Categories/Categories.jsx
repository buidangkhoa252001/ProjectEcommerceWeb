
import React, { useEffect, useState } from 'react'
import "./Categories.css"
import useCustomRouter from '../../hooks/useCustomeRouter';
import axios from "../../axios/axios"
import useQuery from '../../hooks/useQuery';
import { useSelector } from 'react-redux';

const Categories = ({ sort, page, search }) => {
  /* const [categories,setCategories] = useState([]) */
  const { categories } = useSelector(state => state.categories)
  const { pushQuery } = useCustomRouter()
  const handleCategory = (id) => {
    if (id) {
      pushQuery({ page: 1, sort: sort, category: id })
    }
    else {
      pushQuery({ page: 1, sort: sort, search: "" })
    }
  }
  useEffect(()=>{
      console.log(window.location.search)
   
  },[])


  return (
    <div className='Categories'>

      {/* <select name="category" onChange={handleCategory}> */}
      <div className="category_type">
        <div className="category_type-logo">
          <ion-icon name="git-network-outline"></ion-icon>
          <span>lalateam</span>
        </div>
        <div className="category_type-line"></div>
        <div className="category_type-menu">menu</div>
        <div className="category_type-detail" onClick={() => { handleCategory() }} >All Products</div>

        {
          categories.map(category => (
            <div className="category_type-detail1" key={category._id} onClick={() => { handleCategory(category._id) }}>
              <a href="">{category.name}</a>
            </div>

          ))
        }
      </div>


    </div>
  )
}


export default Categories;

