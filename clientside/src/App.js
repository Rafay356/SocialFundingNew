import "./App.css";
import { Header, Footer, Cause } from "./components/index";
import { styled } from "@mui/system";
import { Routes, Route } from "react-router-dom";
import Model from "./components/Model";
import UpdateCard from "./components/updateCard/UpdateCard";
import { Single, Signup, Login } from "./pages/index";
// import Model from "./components/Model";

const Box = styled("div")({
  marginTop: "50px",
});
function App() {
  return (
    <div>
      <Header />
      <Box>
        <Routes>
          <Route path="/" element={<Cause />} />
          <Route path="/cause/socialfunding" element={<Model />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/cause/singlepost/:Id" element={<Single />} />
          <Route path="/cause/updatepost/:Id" element={<UpdateCard />} />
        </Routes>

        <Footer />
      </Box>
    </div>
  );
}

export default App;
