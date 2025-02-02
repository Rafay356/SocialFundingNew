import "./App.css";
import { useState } from "react";
import { Header, Footer, Cause } from "./components/index";
import { styled } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import PostModel from "./components/Model";
import UpdateCard from "./components/updateCard/UpdateCard";
import { Single, Signup, Login } from "./pages/index";
import ProtectedRoute from "./components/ProtectedRoute";
import { theme } from "./components/Theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import axios from "axios";
// import Model from "./components/Model";

const Box = styled("div")({
  marginTop: "50px",
});
function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/search?title=${query}`
      );
      setSearchResults(response.data);
      console.log(response.data, "data");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header onSearch={handleSearch} />
        <Box>
          <Routes>
            <Route path="/" element={<Cause searchResults={searchResults} />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/signin" element={<Login />} />
            {/*Protected Routes*/}

            <Route
              path="/cause/createpost"
              element={
                <ProtectedRoute>
                  <PostModel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cause/singlepost/:id"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cause/updatepost/:_id"
              element={
                <ProtectedRoute>
                  <UpdateCard />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
