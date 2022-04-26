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
    if(!value.trim()) return;
    pushQuery({page:1 , sort:sort ,search:value })
    inputRef.current.value=""
  }
 /*  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    const value = inputRef.current.value
    if(!value.trim()) return;
    return navigate(`/search/${value}`)
  } */
  return (
    <div className='search_form'>
    
      <form onSubmit={handleSubmit}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text"  ref={inputRef} placeholder="Find products..."  />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchForm