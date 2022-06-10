
import React, { useEffect, useState } from 'react'
import "./Categories.css"
import useCustomRouter from '../../hooks/useCustomeRouter';
import axios from "../../axios/axios"
import useQuery from '../../hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import {getCategories} from "../../api/CategoriesAPI"
const Categories = ({ sort, page, search }) => {
  const [category,setCategory] = useState([])
  const { categories } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const { pushQuery } = useCustomRouter()

  const handleCategory = (id) => {
    if (id) {
      pushQuery({ page: 1, sort: sort, category: id })
    }
    else {
      pushQuery({ page: 1, sort: sort, search: "" })
    }
  }

 

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
        <div className="category_type-detail" onClick={() => { handleCategory() }} ><a href="">All Products</a></div>

        {
            categories.map(category => (
            <div className="category_type-detail" key={category._id} onClick={() => { handleCategory(category._id) }}>
              <a href="">{category.name}</a>
            </div>

          ))
        }
      </div>


    </div>
  )
}


export default Categories;

