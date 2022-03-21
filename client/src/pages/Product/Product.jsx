import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import Products from './../../components/Products/Products';
import { useLocation } from 'react-router-dom';
import Loading from '../../utils/Loading/Loading';
import useQuery from '../../hooks/useQuery';
import Sorting from '../../components/Sorting/Sorting';
import { useDispatch } from 'react-redux';
import { getPageSuccess } from '../../redux/pageSlice';
const Product = () => {
    const [products,setProducts]=useState([])
    const [limit,setLimit]=useState(4)
    const [page1,setPage1]=useState(1)
    const [sort1,setSort1]=useState(`-createdAt`)
    const {search} = useLocation()

    const dispatch = useDispatch()
    const { page, sort } = useMemo(() => {
        
        const page = new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt';
        setPage1(Number(page))
        setSort1(sort)
        return { 
          page: Number(page),
          sort: sort
        }
    }, [search])
   
    const {data,loading,error} =useQuery(
        `/api/products?limit=${limit}&page=${page}&sort=${sort}`
     )
    useEffect(()=>{
     /*  dispatch(getPageSuccess(
         { page: page1,
          sort: sort1}
      )) */

    },[page1,sort1,dispatch])
    useEffect(() => {
          if(data?.products) setProducts(data.products)                 
    },[data?.products])
    const totalPages = useMemo(()=>{
        if(!data?.count) return 0;
        return Math.ceil(data.count / limit)
    
    },[data?.count,limit])  
    return (
        <div>
     
              <Sorting page={page} sort={sort}/>
           { loading ? <Loading/> 
           : <Products products={products} />
           }
        
           <Pagination totalPages={totalPages} page={page} sort={sort}  />
            
           

        </div>
    );
}
 

 
export default Product;