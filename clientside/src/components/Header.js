import React, { useEffect, useState } from "react";
// import SubHeader from "./SubHeader";
// import { Button } from "@mui/material";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import IconButton from "@mui/material/IconButton";
import "./css/card.css";
import { GetApi } from "../components/Api/axiosapi";
import axios from "axios";
import Model from "./Model";
// import { Routes, Route } from "react-router-dom";

import { styled } from "@mui/system";

const Component = styled("div")({
  backgroundColor: "white",
  boxShadow: "0 0 2px lightgrey",
  display: "flex",
  justifyContent: "space-between",
  //   flexDirection: "column",
  //   alignContent: "center",
  width: "100%",
  height: "100px",
  zIndex: 999,
});

const Box = styled("h2")({
  height: "100%",
  width: "fit-content",
  margin: "0 10px",
  display: "flex",
  alignItems: "center",
});

const Button = styled("button")({
  bgcolor: "#65c9bb",
  color: "white",
  borderRadius: "20px",
  padding: "8px 16px",
  border: "none",
  alignItems: "center",
  width: "fit-content",
  display: "block",
  fontSize: "16px",
});

// const ModelBox = styled("div")({
//   backgroundColor: "red",
// });

export const Header = () => {
  return (
    <>
      {/* <SubHeader /> */}
      <Component>
        <IconButton
          className="LogoIconButton"
          color="primary"
          aria-label="Donation"
          component="label"
          sx={{ marginLeft: "20px", height: "50px", marginTop: "30px" }}
        >
          <VolunteerActivismOutlinedIcon className="LogoIcon" />
        </IconButton>
        <Box>Social Cause Pakistan</Box>
        <Button className="donate-now" aria-label="Donate" component="label">
          Make Donation
        </Button>
      </Component>
      {/* <Routes>
        <Route path="/cause" element={<Model />} />
      </Routes> */}
    </>
  );
};
