import axios from "../axios/axios";
import {
  addCart,
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from "../redux/userSlice";
import { getCart } from "./CartAPI";
import { getHistory } from "./HistoryAPI";
import { getCategories } from "./CategoriesAPI";
import { getOrder } from "./OrderAPI ";
import { getAllUser } from "./AllUserAPI";
import { useNavigate } from "react-router-dom";

export const LoginandNavigateUser = async (dispatch, token) => {
  if (token) {
    dispatch(getUserStart());
    try {
      const res = await axios.get("/user/infor", {
        headers: { Authorization: token },
      });
      if (res.data.role === 1) {
        window.location.href = "/products";
        dispatch(getUserSuccess(res.data));
        getCart(dispatch, res.data.cart);
        getHistory(dispatch, token);
        getAllUser(dispatch, token);
        getOrder(dispatch, token);
        getCategories(dispatch);
      } else {
        window.location.href = "/";
        dispatch(getUserSuccess(res.data));
        getCart(dispatch, res.data.cart);
        getHistory(dispatch, token);
        getAllUser(dispatch, token);
        getOrder(dispatch, token);
        getCategories(dispatch);
      }
    } catch (err) {
      dispatch(getUserFailure());
      alert(err.response.data.msg);
    }
  }
};

export const getUser = async (dispatch, token) => {
  if (token) {
    dispatch(getUserStart());
    try {
      const res = await axios.get("/user/infor", {
        headers: { Authorization: token },
      });
      console.log(res);
      dispatch(getUserSuccess(res.data));
      getCart(dispatch, res.data.cart);
      getHistory(dispatch, token);
      getAllUser(dispatch, token);
      getOrder(dispatch, token);
      getCategories(dispatch);
    } catch (err) {
      dispatch(getUserFailure());
      alert(err.response.data.msg);
    }
  }
};
