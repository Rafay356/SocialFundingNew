import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { Box, Button, Container, Grid } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { causes } from "../mock-data/mock";
import "../css/card.css";
import { PATH_PAGE } from "../routes/path";

const Row = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const P = styled("p")({
  fontWeight: "500",
  fontSize: "18px",
});

const styleCardDisplay = {
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  flex: "0 1 calc(32% - 1em)",
  margin: "10px",
};

const Column = styled("div")({
  float: "left",
  //   width: "33.33%",
  //   padding: "10px 10px 0px 10px",
});

const CauseCard = (props) => {
  function iconButtonHandle() {
    console.log("Hit It");
  }
  // console.log(props);
  const { username, img, description, goal, raised, avatar, title } =
    props.item;
  return (
    <Box style={styleCardDisplay}>
      <CardHeader
        avatar={
          <Avatar src={`/images/${avatar}`} aria-label="recipe">
            {/* <img src={`/images/${avatar}`} width="40px" overflow="hidden" /> */}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            sx={{ marginTop: "12px", marginLeft: "8px" }}
            onClick={iconButtonHandle}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={<h3>{username}</h3>}
      />

      <CardMedia
        height="194"
        component="img"
        image={`/images/${img}`}
        alt="Card Image"
      />
      <CardContent>
        <div className="single_cause_content">
          <div className="single_cause">
            <h3>
              <Link to="/cause/singlepost">{title}</Link>
              {/* <span className="sub_title">{item.category}</span> */}
            </h3>
          </div>
          <Row>
            <Column>
              <span>
                <i>
                  <LanguageOutlinedIcon sx={{ fontSize: 15 }} />
                </i>
                Goal
              </span>
              <P sx={{ color: "#f15b43" }}>${goal}</P>
            </Column>

            <Column>
              <span>
                <i>
                  <GroupOutlinedIcon sx={{ fontSize: 15 }} />
                </i>
                Raised
              </span>
              <P sx={{ color: "#65c9bb" }}>${raised}</P>
            </Column>
            <Column>
              <span>
                <i>
                  <ReplyAllOutlinedIcon sx={{ fontSize: 15 }} />
                </i>
                To go
              </span>
              <P sx={{ color: "#ff9a39" }}>${goal - raised}</P>
            </Column>
          </Row>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Stack flexDirection="row">
          <Button
            className="donate-now"
            aria-label="Donate"
            component="label"
            sx={{
              bgcolor: "#65c9bb",
              color: "white",
              borderRadius: "20px",
              padding: "8px 16px",
            }}
            startIcon={
              <VolunteerActivismOutlinedIcon sx={{ fontSize: "24px" }} />
            }
          >
            {/* <input hidden accept="image/*" type="file" /> */}
            Make Donation
          </Button>
        </Stack>
      </CardActions>
    </Box>
  );
};

export default CauseCard;
