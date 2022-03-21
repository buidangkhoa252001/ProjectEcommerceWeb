import axios from "axios";

const BASE_URL = "http://localhost:5000";


/* export const publicRequest = axios.create({
        baseURL: BASE_URL,
      }); */
      
const instance = axios.create({
  baseURL: BASE_URL,
/*   withCredentials: true */
});


instance.interceptors.response.use(
  (response) => {
 
   
      return response;
  },
 
);

export default instance;