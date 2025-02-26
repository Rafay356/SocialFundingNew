import React ,{useContext} from "react";
import { SearchPostContext } from "../context/searchPosts";
import { Container, Typography } from "@mui/material";
import CauseCard from "../components/card/cause-card";
const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};
const SearchResults = () => {
 const {searchResults,error} = useContext(SearchPostContext)

  return (
    <Container style={styleContainer}>
      
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((cause) => <CauseCard key={cause._id} cause={cause} />)
      ) : (
        <Typography>{error}</Typography>
      )}
    </Container>
  );
};

export default SearchResults;
