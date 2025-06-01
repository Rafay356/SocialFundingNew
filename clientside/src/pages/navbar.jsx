import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import SearchPost from "../components/SearchPost";
import { CurrentUserAuthContext } from "../context/curentUserAuthContext";

// import SearchResults from "./SearchResults";
// import { SearchHeader } from "../components/search/searchHeader/SearchHeader";

import { useMenu } from "../hooks/useMenu";
import { Avatar } from "@mui/material";
// import axios from "axios";

export function Navbar() {
  const navigate = useNavigate();
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const { user, dispatch } = useContext(CurrentUserAuthContext);
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Close the menu
    handleClose();

    // Redirect to login page
    navigate("/auth/signin");
  };

  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <SearchPost />
            </ListItem>
            {currentUser && (
              <>
                <ListItem
                  sx={{ display: "flex", flexDirection: "column", py: 2 }}
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <Avatar
                    src={
                      currentUser.profilepic
                        ? `/images/${currentUser.profilepic}`
                        : undefined
                    }
                    sx={{ width: 60, height: 60, mb: 1 }}
                  >
                    {!currentUser.profilepic &&
                      currentUser.firstname?.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={currentUser.firstname + " " + currentUser.lastname}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <Divider />
              </>
            )}

            {currentUser ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/cause/createpost">
                    <ListItemText
                      primary="Create New Post"
                      onClick={toggleDrawer(false)}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      toggleDrawer(false)();
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/auth/signup"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/auth/signin"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
      <MainAppBar>
        {/* For Of: It loops over the Values

          For In: Loops over the Keys. */}
        <ToolBar>
          <Link to="/" style={Identifier} onClick={() => onSearch("")}>
            Social Cause Pakistan
          </Link>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SearchBox>
            {/* <IconButton> */}
            {/* <SearchHeader /> */}
            <SearchPost />

            {/* </IconButton> */}
          </SearchBox>
          <NavLinks>
            {currentUser ? (
              <>
                <Link to="/cause/createpost" style={styleLinked}>
                  Create-New-Post
                </Link>
                <IconButton onClick={handleClick} sx={{ color: "white" }}>
                  <Avatar
                    src={
                      currentUser.profilepic &&
                      `/images/${currentUser.profilepic}`
                    }
                    alt="profile"
                  >
                    {!currentUser.profilepic &&
                      currentUser.firstname?.charAt(0).toUpperCase()}
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
        </ToolBar>
      </MainAppBar>
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
  flex: 1,
  marginLeft: "10px",
};
const NavLinks = styled("div")(({ theme }) => ({
  marginLeft: "10px",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const SearchBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MainAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  // backgroundColor: "teal", // Your primary color
  position: "sticky",
  top: 0,
  boxShadow: "none",
  zIndex: 1000,
}));

const ToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const styleLinked = {
  textDecoration: "none",
  color: "white",
};
