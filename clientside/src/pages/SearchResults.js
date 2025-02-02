import React from "react";
import { Container, Typography } from "@mui/material";
import CauseCard from "../components/card/cause-card";
const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};
const SearchResults = ({ results }) => {
  console.log(results, "results");
  return (
    <Container style={styleContainer}>
      {results && results.length > 0 ? (
        results.map((cause) => <CauseCard key={cause._id} cause={cause} />)
      ) : (
        <Typography>No results found</Typography>
      )}
    </Container>
  );
};

export default SearchResults;
