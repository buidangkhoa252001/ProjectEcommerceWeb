import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import Products from './../../components/Products/Products';
import { useLocation } from 'react-router-dom';
import Loading from '../../utils/Loading/Loading';
import useQuery from '../../hooks/useQuery';
import Sorting from '../../components/Sorting/Sorting';
import { useDispatch } from 'react-redux';
import { getPageSuccess } from '../../redux/pageSlice';
import FilterForm from '../../components/Filter/FilterForm';
import SearchForm from './../../components/SearchForm/SearchForm';
import axios from '../../axios/axios';
const Product = () => {
    const [products,setProducts]=useState([])
    const [limit,setLimit]=useState(2)
    const [page1,setPage1]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [pageResult,setPageResult] = useState(1)
   
    const {search} = useLocation()

    const dispatch = useDispatch()
    const { page, sort , search1} = useMemo(() => {
        
        const page = new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt';
        const search1 = new URLSearchParams(search).get('search') || '';
       
      console.log(page)
      console.log(sort)
      console.log(search1)
        return { 
          page: Number(page),
          sort: sort,
          search1:search1
        }
    }, [search])
   /* useEffect(()=>{
     
       
     },[search1]) */

    const {data,loading,error} =useQuery(
        `/api/products?limit=${limit}&page=${page}&sort=${sort}&title[regex]=${search1}`
     )
    
   /*  useEffect(()=>{
      dispatch(getPageSuccess(
         { page: page1,
          sort: sort1}
      ))

    },[page1,sort1,dispatch]) */
    useEffect(()=>{
      if(search1){    
         const gg = async()=>{      
           const res = await axios.get(`/api/products?title[regex]=${search1}`)
           console.log(res.data)
           setPageResult(res.data.result)
           if(!res.data?.result) return 0;
           setTotalPages(Math.ceil(pageResult / limit)) 
         }
        console.log("pageresult",pageResult)
        console.log("totalapge",totalPages)
         gg()
       
      }
      else{
        if(!data?.count) return 0;
        setTotalPages(Math.ceil(data.count / limit))
      }
      
    },[data?.result,data?.count,limit,pageResult,search1,totalPages])  
    console.log(totalPages)
    useEffect(() => {
          if(data?.products) setProducts(data.products)      
          console.log(data)           
    },[data?.products])
   
    return (
        <div>
              <SearchForm search={search1} page={page} sort={sort}/>
              <Sorting search={search1} page={page} sort={sort}/>
              <FilterForm />
           { loading ? <Loading/> 
           : <Products products={products} />
           }
        
        { loading ? <Loading/> : <Pagination totalPages={totalPages} search={search1} page={page} sort={sort} loading={loading}  />}
            
           

        </div>
    );
}
 

 
export default Product;