import React from "react";
import SideCardMedia from "../components/sideCard/sideCard";
import SinglePostCard from "../components/singlepost/SinglePostCard";
import { styled } from "@mui/system";

const SinglePageStyle = styled("div")({
  display: "flex",
  gap: "1rem",
  padding: "100px",
});
export const Single = () => {
  return (
    <div>
      <SinglePageStyle>
        <SinglePostCard />
        <SideCardMedia />
      </SinglePageStyle>
    </div>
  );
};
