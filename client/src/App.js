
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Cart from './pages/Cart/Cart';
import History from './pages/History/History';
import HistoryDetail from './pages/History/HistoryDetail';
import Search from './pages/Search/Search';
import Filter from './pages/Filter/Filter';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Payment from './pages/Payment/Payment';

function App() {
  const { isAuth } = useSelector(state => state.login);
  const { user } = useSelector(state => state.user);
  const [admin,setAdmin] =useState(false)
  useEffect(()=>{
    if(user.role===1){
      setAdmin(true)
    }

},[user])
  return (
    
    <BrowserRouter>
      <Routes>
      
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
         {/*  <Route path="/createProduct" exact element={CreateProduct} /> */}
       <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <DetailProduct />
            </PrivateRoute>
          }
        />
       <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
       <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        
       <Route
          path="/history/:id"
          element={
            <PrivateRoute>
              <HistoryDetail />
            </PrivateRoute>
          }
        />
       <Route
          path="/search/:value"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
       <Route
          path="/filter/:option/:value"
          element={
            <PrivateRoute>
              <Filter />
            </PrivateRoute>
          }
        />
       <Route
          path="/createProduct"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
      
        <Route  path="/login" element={<Login />}/>
        <Route  path="/register" element={<Register />}/> 
        <Route  path="*" element={<NotFound/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
