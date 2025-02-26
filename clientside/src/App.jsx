import "./App.css";

import { Header, Footer, Cause } from "./components/index";
import { styled } from "@mui/system";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostModel from "./components/Model";
import UpdateCard from "./components/updateCard/UpdateCard";
import { Single, Signup, Login } from "./pages/index";
import ProtectedRoute from "./components/ProtectedRoute";
import { theme } from "./components/Theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SearchProvider } from "./context/searchPosts";

// import BasicPagination from "./components/Pagination";

const Box = styled("div")({
  marginTop: "50px",
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <SearchProvider>
          <Header />
          <Box>
            <Routes>
              <Route path="/" element={<Cause />} />
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
        </SearchProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
