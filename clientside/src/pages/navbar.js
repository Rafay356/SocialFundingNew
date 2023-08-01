import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const Identifier = styled("h4")({
  cursor: "pointer",
  fontFamily: "Varela Round sans-serif",
  fontSize: "20px",
  fontWeight: "20px",
});
const NavLinks = styled("div")({
  marginLeft: "10px",
  display: "flex",
});

const styleLinked = {
  textDecoration: "none",
  color: "white",
  //   marginLeft: "20px",
};

export function Navbar() {
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Identifier variant="h4">Navbar</Identifier>
        <NavLinks>
          <Link to="/auth/signin" style={styleLinked}>
            Login
          </Link>
        </NavLinks>
      </Toolbar>
    </AppBar>
  );
}
