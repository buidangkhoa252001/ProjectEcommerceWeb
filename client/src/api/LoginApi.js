import axios from "../axios/axios";

import { logOutCart } from "../redux/cartSlice";
import { logOutHistory } from "../redux/historySlice";
import {
  loginSuccess,
  loginFailure,
  loginStart,
  getToken,
  logOut,
} from "../redux/loginSlice";

import { logOutUserStore } from "../redux/userSlice";

import { getUser } from "./UserApi";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/user/login", user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("firstLogin", true);

    getUser(dispatch, res.data.accesstoken);
  } catch (err) {
    dispatch(loginFailure());
    alert(err.response.data.msg);
  }
};

export const refreshToken = async () => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    const refreshToken = async () => {
      const token = await axios.get("/user/refresh_token");
      getToken(token.data.accesstoken);
      setTimeout(() => {
        refreshToken();
      }, 10 * 60 * 1000 * 7);
    };
    refreshToken();
  }
};
export const logOutUser = async (dispatch) => {
  try {
    await axios.get("/user/logout");
    dispatch(logOutCart());
    dispatch(logOut());
    dispatch(logOutUserStore());
    dispatch(logOutHistory());
    localStorage.removeItem("persist:root");

    localStorage.removeItem("firstLogin");
  } catch (err) {
    dispatch(loginFailure());
    alert(err.response.data.msg);
  }
};
