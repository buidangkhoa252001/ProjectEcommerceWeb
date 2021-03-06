import React, { useRef } from 'react'
import "./Pagination.css"

import usePagination from './../../hooks/usePagination';

const Pagination = ({totalPages,page,sort,search,category}) => {

  const {firstArr, lastArr,  isActive, prev, next, jump} = usePagination(totalPages,page,sort,search,category)
  
  return (
  
    <div className='pagination'>
      
      <button onClick={()=>prev()}>&laquo;</button>
      {
        firstArr.map(num => (
          <button key={num}  onClick={()=>jump(num)} className={`${isActive(num)}`} >
            {num}
          </button>
        ))
      }
      {
         lastArr.length > 0  && <button>...</button>
      }
      {
        lastArr.map(num => (
          <button key={num}  onClick={()=>jump(num)} className={`${isActive(num)}`} >
            {num}
          </button>
        ))
      }
      <button onClick={()=>next()}>&raquo;</button>
    </div>
    
  )
}

export default Pagination