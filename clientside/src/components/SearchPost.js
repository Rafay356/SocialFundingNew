import React, { useState } from "react";
import { IconButton, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchPost = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // If input is cleared, reset results
    if (value.trim() === "" && onSearch) {
      onSearch(""); // Trigger search with empty string
    }
  };

  const handleSearch = () => {
    if (onSearch && query.trim() !== "") {
      onSearch(query); // Pass the query to the parent component
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
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchPost;
