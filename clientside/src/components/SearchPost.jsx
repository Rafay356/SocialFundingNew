import React, { useState, useContext, useEffect } from "react";
import { IconButton, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchPostContext } from "../context/searchPosts";
import { styled } from "@mui/system";

const SearchPost = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { query, setQuery, handleSearch } = useContext(SearchPostContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
      setSearchParams(query ? { title: query } : {});
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      setSearchParams({ title: query });
      handleSearch(query); // Pass the query to the parent component
    }
  };

  return (
    <MainBox>
      <InputBase
        placeholder="Search by title..."
        value={query}
        onChange={handleInputChange}
        sx={{
          flex: 1,
          color: "white",

          input: {
            "&::placeholder": {
              color: "white",
              opacity: 1,
            },
          },
        }}
      />
      <IconButton onClick={handleSearchClick}>
        <SearchIcon sx={{ color: "white" }} />
      </IconButton>
    </MainBox>
  );
};

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.primary.light,
  borderRadius: "4px",
  padding: "0 8px",
}));

export default SearchPost;
