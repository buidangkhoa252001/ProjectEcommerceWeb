import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FilterForm from '../../components/Filter/FilterForm'
import Products from '../../components/Products/Products'
import Sorting from '../../components/Sorting/Sorting'
import useQuery from '../../hooks/useQuery'


const Filter = () => {
  const { option, value } = useParams()
  const [products, setProducts] = useState([])

  const { 
    data, loading, error 
  } = useQuery(`/api/products?price[${option}]=${value}`)

  useEffect(() => {
    if(data?.products) setProducts(data.products)
  }, [data?.products])

  return (
    <>
     {/*  <Sorting page={page} sort={sort}/> */}
              <FilterForm/>
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }
    </>
  )
}

export default Filter