import axios from "axios";
//creating an instance
const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000/cause",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

export const GetApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000/posts",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
