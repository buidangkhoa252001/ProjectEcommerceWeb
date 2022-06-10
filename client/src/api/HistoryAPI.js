import axios from "../axios/axios";
import {
  getHistoryFailure,
  getHistoryStart,
  getHistorySuccess,
} from "../redux/historySlice";

export const getHistory = async (dispatch, token) => {
  if (token) {
    dispatch(getHistoryStart());
    try {
      const res = await axios.get("/user/history", {
        headers: { Authorization: token },
      });
      dispatch(getHistorySuccess(res.data));
    } catch (err) {
      dispatch(getHistoryFailure());
      alert(err.response.data.msg);
    }
  }
};
