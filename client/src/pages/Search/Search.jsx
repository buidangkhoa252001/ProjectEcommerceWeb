import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../../components/Products/Products'
import useQuery from '../../hooks/useQuery'


const Search = () => {
  const { value } = useParams()

  const [products, setProducts] = useState([])
  
  const { data, loading, error } = useQuery(`/api/products?title[regex]=${value}`)

  useEffect(() => {
    if(data?.products) setProducts(data.products)
  }, [data?.products])

  return (
    <>
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }
    </>
  )
}

export default Search