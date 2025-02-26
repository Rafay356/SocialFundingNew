import { createContext, useState } from "react";
import axios from "axios";
export const SearchPostContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      setError(null);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/search?title=${query}`
      );
      //   console.log(response, "res");

      setSearchResults(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      if (err.response?.status === 404) {
        setError(err.response.data.message);
        setSearchResults([]); // Clear results on 404
      } else if (err.response?.status === 400) {
        setError(err.response.data.message);
        setSearchResults([]);
      } else {
        setError("An error occurred while searching. Please try again.");
        setSearchResults([]);
      }
    }
  };
  const value = {
    query,
    setQuery,
    searchResults,
    error,
    handleSearch,
  };
  return (
    <SearchPostContext.Provider value={value}>
      {children}
    </SearchPostContext.Provider>
  );
};
