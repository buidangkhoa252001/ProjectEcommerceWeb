import axios from "axios";

/* const BASE_URL = "https://ecommerce-laptop--app.herokuapp.com"; */
/* const BASE_URL = "http://localhost:5000"; */
const instance = axios.create({
  baseURL: process.env.BACKEND_LOCAL,
});

export default instance;
