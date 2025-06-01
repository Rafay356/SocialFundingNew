import React, { useContext, useState } from "react";
import { SearchPostContext } from "../context/searchPosts";
import { Container, Typography } from "@mui/material";
import CauseCard from "../components/card/cause-card";
// import BasicPagination from "../components/Pagination";
const styleContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "10px",
  marginTop: "-50px",
};
const SearchResults = () => {
  const { searchResults, error, setSearchResults } =
    useContext(SearchPostContext);

  const handleDelete = (deletedId) => {
    setSearchResults((prevCauses) => {
      const newCauses = prevCauses.filter((cause) => cause._id !== deletedId);
      // console.log(newCauses, "new");
      // window.location.reload();
      // if (newCauses.length <= currentPage * PAGE_SIZE) {
      //   setCurrentPage(0);
      // }
      return newCauses;
    });
  };

  return (
    <Container style={styleContainer}>
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((cause) => (
          <CauseCard key={cause._id} cause={cause} onDelete={handleDelete} />
        ))
      ) : (
        <Typography>{error}</Typography>
      )}
      {/* <BasicPagination /> */}
    </Container>
  );
};

export default SearchResults;
