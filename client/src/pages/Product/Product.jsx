import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import Products from './../../components/Products/Products';
import { useLocation } from 'react-router-dom';
import Loading from '../../utils/Loading/Loading';
import Sorting from '../../components/Sorting/Sorting';
import SearchForm from './../../components/SearchForm/SearchForm';
import axios from '../../axios/axios';
import Categories from '../../components/Categories/Categories';
const Product = () => {
    const [products,setProducts]=useState([])
    const [limit,setLimit]=useState(6)
    const [totalPages,setTotalPages]=useState(1)
    const [pageResult,setPageResult] = useState(1)
    const [data1,setData1]=useState("")
    const [loading,setLoading]=useState(false)
    const {search} = useLocation()

    const { page, sort , search1,category} = useMemo(() => {
        const page = new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt';
        const category = new URLSearchParams(search).get('category') || '';
        const search1 = new URLSearchParams(search).get('search') || '';
        return { 
          page: Number(page),
          sort: sort,
          category:category,
          search1:search1.toLocaleLowerCase()
        }
    }, [search])
    
    /* goi product */
    useEffect(()=>{
      const getProduct = async()=>{
          try{  
            if(category){
              setLoading(true);
              const res = await axios.get(`/api/products?limit=${limit}&page=${page}&sort=${sort}&category=${category}`)
              setData1(res.data)
              console.log("categoryres",res)
              setLoading(false)
            }
            else{
              setLoading(true);
              const res = await axios.get(`/api/products?limit=${limit}&page=${page}&sort=${sort}&title[regex]=${search1}`)
       
              setData1(res.data)
              setLoading(false)
            }

          }catch(err){
              console.log(err)
          }
      }
       getProduct() 
     
    
   },[search1,limit,page,sort,category])
   /* set page va` product */
    useEffect(() => {
          if(data1?.result){ 
          setProducts(data1.products)      
          } 
          else{
            setProducts([])
            setTotalPages(1)
          }
            
    },[data1?.products])
    /* set so page tu` search  */
    useEffect(()=>{
      if(search1){    
         const gg = async()=>{      
           const res = await axios.get(`/api/products?title[regex]=${search1}`)
           console.log("ressearch",res.data)
           setPageResult(res.data.result)
           if(!res.data?.result) return 0;
           setTotalPages(Math.ceil(pageResult / limit)) 
         }
         gg() 
      }
      else if(category){    
         const category1 = async()=>{      
           const res = await axios.get(`/api/products?category=${category}`)
           console.log("rescate",res.data)
           setPageResult(res.data.result)
           if(!res.data?.result) return 0;
           setTotalPages(Math.ceil(pageResult / limit)) 
         }
         category1() 
      }
      else{
        if(!data1?.count) return 0;
        setTotalPages(Math.ceil(data1.count / limit))
      }   
    },[data1?.result,data1?.count,limit,pageResult,search1,totalPages,category])  



    if(data1.result === 0) 
        return ( <div>
             <SearchForm search={search1} page={page} sort={sort} />
             <h2 style={{textAlign: "center", fontSize: "8rem"}}>No product</h2></div>
                )


                
    return (
        <div>
              <SearchForm search={search1} page={page} sort={sort} />
              <Sorting search={search1} page={page} sort={sort} category={category}/>
              <Categories  page={page} sort={sort} category={category} />
             {/*  <FilterForm /> */}
           { loading ? <Loading/> 
           : <Products products={products} />
          }
          <Pagination totalPages={totalPages} search={search1} page={page} sort={sort} loading={loading} category={category}  />

        </div>
    );
}
 

 
export default Product;