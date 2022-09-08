import { GetApi } from "./axiosapi";
// import { useEffect } from "react";
import axios from "axios";

export async function getUser() {
  try {
    const response = await axios
      .get(`http://127.0.0.1:8000/posts`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err, "api er");
      });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
