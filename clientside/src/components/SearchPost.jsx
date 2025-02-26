import React, { useState, useContext, useEffect } from "react";
import { IconButton, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchPostContext } from "../context/searchPosts";

const SearchPost = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const { query, setQuery, handleSearch } = useContext(SearchPostContext);
  // const [query, setQuery] = useState(searchParams.get("query") || "");
  console.log(query, "quee");
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 300);
    return clearTimeout(timer);
  }, [handleSearch, query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchParams(value ? { title: value } : "");
    // If input is cleared, reset results
    if (value.trim() === "" && handleSearch) {
      handleSearch(""); // Trigger search with empty string
      setSearchParams("");
    } else {
      handleSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (handleSearch && query.trim() !== "") {
      setSearchParams({ query });
      handleSearch(query); // Pass the query to the parent component
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "4px",
        padding: "0 8px",
      }}
    >
      <InputBase
        placeholder="Search by title..."
        value={query}
        onChange={handleInputChange}
        sx={{ flex: 1 }}
      />
      <IconButton onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchPost;
