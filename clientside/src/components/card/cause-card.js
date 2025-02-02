import * as React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { styled } from "@mui/material/styles";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";

import { Box, Button, Typography } from "@mui/material";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
// import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { causes } from "../mock-data/mock";
import "../css/card.css";
// import { PATH_PAGE } from "../routes/path";

import EditModel from "../model/EditModel";

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
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
};

const Column = styled("div")({
  float: "left",
  //   width: "33.33%",
  //   padding: "10px 10px 0px 10px",
  
});

const CauseCard = ({ cause, onDelete }) => {
  // console.log(props, "props");
  // const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const open = Boolean(anchorEl);
  const { _id, img, goal, raised, title } = cause;
  const { username, profilepic, firstname } = cause.userId;

  React.useEffect(() => {
    if (cause && goal && raised) {
      // Convert string values to numbers and calculate percentage
      const goalAmount = parseFloat(goal);
      const raisedAmount = parseFloat(raised);
      const percentage = (raisedAmount / goalAmount) * 100;

      // Ensure the percentage is between 0 and 100
      const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

      setProgress(clampedPercentage);
    }
  }, [goal, cause, raised]);

  // Get current user's ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // console.log(currentUser, "currentUser");

  // Check if the post belongs to current user
  const isAuthorized = currentUser && username === currentUser.username;

  const handleClick = (event) => {
    event.stopPropagation();
    open ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={styleCardDisplay}>
      <div className="cardHeader">
        <div className="row">
          <Avatar src={`/images/${profilepic}`} />
          <h3 className="cardUser">{firstname}</h3>
        </div>
        {/* <Link to={`/cause/updatepost/${id}`}> */}
        {isAuthorized && (
          <IconButton
            onClick={handleClick}
            sx={{
              float: "right",
              color: "black",
              width: "2.7rem",
              "&:hover": {
                backgroundColor: "teal",
                color: "white",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        )}

        {/* </Link> */}
      </div>
      {isAuthorized && (
        <EditModel
          id={_id}
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          onDeleteSuccess={() => onDelete(_id)}
        />
      )}
      <CardMedia
        height="194"
        position="fixed"
        component="img"
        image={`/images/${encodeURIComponent(img)}`}
        alt="Card Image"
      />
      <CardContent sx={{ textDecoration: "none" }}>
        <div className="single_cause_content">
          <div className="single_cause">
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress
                  variant="determinate"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: "20px",
                    },
                  }}
                  value={progress || 0}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {`${Math.round(progress)}%`}
                </Typography>
              </Box>
            </Box>

            <h3>
              <Link
                to={`/cause/singlepost/${_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="sub_title">{title}</span>
              </Link>
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
