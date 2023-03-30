import React, { useRef, useState } from 'react'
import './SearchForm.css'
import { useNavigate } from 'react-router-dom';
import useCustomRouter from '../../hooks/useCustomeRouter';
const SearchForm = ({search,page,sort}) => {

  const inputRef = useRef()
  const { pushQuery } = useCustomRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = inputRef.current.value
  /*   const { value } = e.target; */
  console.log(value)
  console.log("current",inputRef.current)
  console.log("currenti",inputRef)
    if(!value.trim()) return;
    pushQuery({page:1 , sort:sort ,search:value })
    inputRef.current.value=""
  }
 
  return (
    <div className='search_form'>
      <form onSubmit={handleSubmit}>
        <input type="text"  ref={inputRef} placeholder="Find products..."  />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
  )
}

export default SearchForm