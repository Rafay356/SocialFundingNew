import './App.css';
import { Header, Footer, Search } from "./components/index"
import { styled } from "@mui/system";

const Box = styled('div')({
  marginTop: "100px"
})
function App() {
  return (
    <div >

      <Header />
      <Box>
        <Search />
        <Footer />
      </Box>
    </div>
  );
}

export default App;
