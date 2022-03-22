
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
import Cart1 from './pages/Cart1/Cart1';



function App() {
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
        <Route
          path="/cart1"
          element={
            <PrivateRoute>
              <Cart1 />
            </PrivateRoute>
          }
        />
     
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
       
        <Route  path="/login" element={<Login />}/>
        <Route  path="/register" element={<Register />}/> 
      
        <Route  path="*" element={<NotFound/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
