import axios from "axios";

export async function getUser() {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/posts`);
    // console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error if you want the calling function to handle it
  }
}
