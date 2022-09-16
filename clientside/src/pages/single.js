import React from "react";
import SideCardMedia from "../components/sideCard/sideCard";
import SinglePostCard from "../components/singlepost/SinglePostCard";
import { Header } from "../components";
import { Footer } from "../components";
import { styled } from "@mui/system";

const SinglePageStyle = styled("div")({
  display: "flex",
  gap: "1rem",
  marginTop: "10px",
  marginBottom: "10px",
});
const Single = (props) => {
  console.log(props, "single props");
  return (
    <div>
      <Header />
      <SinglePageStyle>
        <SinglePostCard />
        <SideCardMedia />
      </SinglePageStyle>
      <Footer />
    </div>
  );
};

export default Single;
