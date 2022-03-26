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
import Categories from '../../components/Categories/Categories';
const Product = () => {
    const [products,setProducts]=useState([])
    const [limit,setLimit]=useState(2)
    const [page1,setPage1]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [pageResult,setPageResult] = useState(1)
   
    const {search} = useLocation()

   
    const { page, sort , search1,category} = useMemo(() => {
        
        const page = new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt';
    /*     const category = new URLSearchParams(search).get('category') || ''; */
        const search1 = new URLSearchParams(search).get('search') || '';
       
      console.log(page)
      console.log(sort)
    /*   console.log(category) */
      console.log("search",search1.toLocaleLowerCase())
        return { 
          page: Number(page),
          sort: sort,
       /*    category: category, */
          search1:search1.toLocaleLowerCase()
        }
    }, [search])
    
    const {data,loading,error} =useQuery(
        `/api/products?limit=${limit}&page=${page}&sort=${sort}&title[regex]=${search1}`
     )
 
    console.log(totalPages)
    useEffect(() => {
          if(data?.result){ 
          setProducts(data.products)      
          console.log("data  ", data) } 
          else{
            setProducts([])
            setTotalPages(1)
          }
            
    },[data?.products])
    useEffect(()=>{
      if(search1){    
         const gg = async()=>{      
           const res = await axios.get(`/api/products?title[regex]=${search1}`)
           console.log(res.data)
           setPageResult(res.data.result)
           if(!res.data?.result) return 0;
           setTotalPages(Math.ceil(pageResult / limit)) 
         }
         gg() 
      }
      else{
        if(!data?.count) return 0;
        setTotalPages(Math.ceil(data.count / limit))
      }   
    },[data?.result,data?.count,limit,pageResult,search1,totalPages])  
   
    return (
        <div>
              <SearchForm search={search1} page={page} sort={sort}/>
              <Sorting search={search1} page={page} sort={sort}/>
              <Categories  page={page} sort={sort} category={category} />
             {/*  <FilterForm /> */}
           { loading ? <Loading/> 
           : <Products products={products} />
          }
          <Pagination totalPages={totalPages} search={search1} page={page} sort={sort} loading={loading}  />
        
            
           

        </div>
    );
}
 

 
export default Product;