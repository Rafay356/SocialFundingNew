import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import SearchPost from "../components/SearchPost";
// import SearchResults from "./SearchResults";
// import { SearchHeader } from "../components/search/searchHeader/SearchHeader";

import { useMenu } from "../hooks/useMenu";
import { Avatar } from "@mui/material";
// import axios from "axios";

export function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Close the menu
    handleClose();

    // Redirect to login page
    navigate("/auth/signin");
  };
  // const handleSearch = async (query) => {
  //   if (query.trim() === "") {
  //     setSearchResults([]); // Clear results if input is empty
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/search?title=${query}`
  //     );
  //     console.log(response.data, "response");
  //     setSearchResults(response.data);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //     setSearchResults([]); // Clear results on error
  //   }
  // };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "teal",
          position: "sticky",
          top: 0,
          boxShadow: 0,
          zIndex: 1000,
        }}
      >
        {/* For Of: It loops over the Values

For In: Loops over the Keys. */}
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={Identifier} onClick={() => onSearch("")}>
            Social Funding App
          </Link>
          <Box>
            {/* <IconButton> */}
            {/* <SearchHeader /> */}
            <SearchPost onSearch={onSearch} />

            {/* </IconButton> */}
          </Box>
          <NavLinks>
            {currentUser ? (
              <>
                <Link to="/cause/createpost" style={styleLinked}>
                  Create-New-Post
                </Link>
                <IconButton onClick={handleClick} sx={{ color: "white" }}>
                  <Avatar>
                    {currentUser.profilepic ? (
                      <img
                        src={`/images/${currentUser.profilepic}`}
                        alt="profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      currentUser.firstname?.charAt(0).toUpperCase()
                    )}
                    {/* <AccountCircleIcon /> */}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/auth/signup" style={styleLinked}>
                  Signup
                </Link>
                <Link to="/auth/signin" style={styleLinked}>
                  Login
                </Link>
              </>
            )}
          </NavLinks>
        </Toolbar>
      </AppBar>
    </>
  );
}
const Identifier = {
  cursor: "pointer",
  fontFamily: "Varela Round sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
  color: "white",
};
const NavLinks = styled("div")({
  marginLeft: "10px",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

const styleLinked = {
  textDecoration: "none",
  color: "white",
  //   marginLeft: "20px",
};
