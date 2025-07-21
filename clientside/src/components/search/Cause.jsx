import React, { useContext } from "react";
import { SearchPostContext } from "../../context/searchPosts";
import { Causes } from "../card";
import Box from "@mui/material/Box";

import SearchResults from "../../pages/SearchResults";

export const Cause = () => {
  const { searchResults, error } = useContext(SearchPostContext);

  return (
    <>
      {searchResults.length > 0 || error ? (
        <Box sx={{ padding: "16px" }}>
          <SearchResults />
        </Box>
      ) : (
        <Causes />
      )}
    </>
  );
};
