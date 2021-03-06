import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCustomRouter from './useCustomeRouter'

const usePagination = (totalPages, page,sort,search,category) => {
  const [firstArr, setFirstArr] = useState([])
  const [lastArr, setLastArr] = useState([])
  const {pushQuery} = useCustomRouter()

  useEffect(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1)
    if(totalPages < 4)
      return setFirstArr(newArr);

    if(totalPages - page >= 4){
      setFirstArr(newArr.slice(page - 1, page + 2))
      setLastArr(newArr.slice(totalPages - 1))
    }else{
      setFirstArr(newArr.slice(totalPages - 4, totalPages))
      setLastArr([])
    }
  }, [totalPages, page])

  

  const isActive = (index) => {
    if(index === page) return "active"
    return ""
  }

  const prev = () => {
    const newPage = Math.max(page - 1, 1)
    if(category){
      pushQuery({page:newPage ,sort,category})
    }
    else{
      pushQuery({page:newPage ,sort,search})
    }
  }

  const next = () => {
    const newPage = Math.min(page + 1, totalPages)
    if(category){
      pushQuery({page:newPage ,sort,category})
    }
    else{
      pushQuery({page:newPage ,sort,search})
    }
  }

  const jump = (num) => {
    if(category){
      pushQuery({page:num ,sort,category})
    }
    else{
      pushQuery({page:num ,sort,search})
    }
  }

  return { firstArr, lastArr,  isActive, prev, next, jump }
}

export default usePagination